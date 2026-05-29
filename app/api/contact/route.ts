import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

// Redis.fromEnv() THROWS on missing config, which would crash the whole route
// on import. Guard it so the in-memory fallback can take over.
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv();
  }
} catch {
  redis = null;
}

// Allow-list of interest values the form can submit. An empty value is also
// accepted (it falls back to "General"/"Not specified" below).
const ALLOWED_INTERESTS = [
  "marble",
  "handicrafts",
  "construction",
  "other",
];

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_PHONE = 50;
const MAX_INTEREST = 50;
const MAX_MESSAGE = 5000;

// Escape HTML entities and strip CR/LF. Used for the subject and the table
// cells so a newline can never be injected into the email Subject header.
function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

// Like sanitizeInput but preserves line breaks (as <br>) for the message body,
// which renders with white-space: pre-wrap. CR/LF never reach a header here.
function sanitizeMultiline(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\r\n|\r|\n/g, "<br>")
    .trim();
}

const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 1000;

const inMemoryRateLimit = new Map<string, { count: number; timestamp: number }>();

function checkRateLimitInMemory(ip: string): boolean {
  const now = Date.now();
  const record = inMemoryRateLimit.get(ip);
  if (!record || now - record.timestamp > RATE_WINDOW) {
    inMemoryRateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  record.count++;
  return true;
}

async function checkRateLimit(ip: string): Promise<boolean> {
  if (redis) {
    try {
      const key = `ratelimit:${ip}`;
      // Atomic increment; set TTL only on the first hit so the window is fixed.
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, RATE_WINDOW / 1000);
      }
      return count <= RATE_LIMIT;
    } catch (err) {
      // A Redis/Upstash outage must never 500 the form — fall back to the
      // in-memory limiter instead of letting the error propagate.
      console.error("Rate-limit Redis error, falling back to in-memory:", err);
      return checkRateLimitInMemory(ip);
    }
  }

  return checkRateLimitInMemory(ip);
}

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const resend = apiKey ? new Resend(apiKey) : null;

  // Use only the first hop of x-forwarded-for (the rest is client-spoofable),
  // falling back to x-real-ip, so the rate-limit key can't be trivially rotated.
  const fwd = request.headers.get("x-forwarded-for");
  const ip = (fwd ? fwd.split(",")[0].trim() : "") || request.headers.get("x-real-ip") || "unknown";
  if (!(await checkRateLimit(ip))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse the body defensively — malformed JSON must be a 400, not a 500.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, phone, interest, message } = body as Record<string, unknown>;

  // Guard field types: required fields must be non-empty strings; optional
  // fields, when present, must be strings. Non-string input is a 400, not a 500.
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }
  if (phone !== undefined && typeof phone !== "string") {
    return NextResponse.json(
      { error: "Invalid phone" },
      { status: 400 }
    );
  }
  if (interest !== undefined && typeof interest !== "string") {
    return NextResponse.json(
      { error: "Invalid interest" },
      { status: 400 }
    );
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  const trimmedPhone = (phone ?? "").trim();
  const trimmedInterest = (interest ?? "").trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  // Enforce sane max lengths on the raw input (before escaping expands it).
  if (
    trimmedName.length > MAX_NAME ||
    trimmedEmail.length > MAX_EMAIL ||
    trimmedPhone.length > MAX_PHONE ||
    trimmedInterest.length > MAX_INTEREST ||
    trimmedMessage.length > MAX_MESSAGE
  ) {
    return NextResponse.json(
      { error: "One or more fields exceed the maximum length" },
      { status: 400 }
    );
  }

  // Restrict interest to the form's allow-list (empty/unspecified is allowed).
  if (trimmedInterest && !ALLOWED_INTERESTS.includes(trimmedInterest)) {
    return NextResponse.json(
      { error: "Invalid interest" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  const toEmail = process.env.CONTACT_EMAIL;
  if (!toEmail) {
    return NextResponse.json(
      { error: "Contact email not configured" },
      { status: 500 }
    );
  }
  const fromEmail = process.env.FROM_EMAIL || "notifications@allwinmarbles.com";
  const fromName = process.env.FROM_NAME || "Allwin Marbles";
  const subject = `New Enquiry from ${sanitizeInput(trimmedName)} - ${sanitizeInput(trimmedInterest || "General")}`;

  const htmlContent = `
    <h2 style="color: #1a1a1a;">New Enquiry from Website</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 120px;">Name</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeInput(trimmedName)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeInput(trimmedEmail)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeInput(trimmedPhone || "Not provided")}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Interest</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeInput(trimmedInterest || "Not specified")}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message</td>
        <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${sanitizeMultiline(trimmedMessage)}</td>
      </tr>
    </table>
    <p style="margin-top: 16px; color: #666; font-size: 12px;">
      This enquiry was submitted through the Allwin Marbles website contact form.
    </p>
  `.trim();

  try {
    if (resend) {
      // Strip CR/LF from replyTo so it can't be used to inject headers.
      const replyTo = trimmedEmail.replace(/[\r\n]+/g, "");
      const { error } = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: [toEmail],
        subject: subject,
        html: htmlContent,
        replyTo,
      });

      if (error) {
        console.error("Resend send error:", error);
        return NextResponse.json(
          { error: "Failed to send email. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry sent successfully",
    });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
