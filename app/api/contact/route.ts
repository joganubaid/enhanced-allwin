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

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\n/g, "<br>")
    .slice(0, 5000);
}

const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 1000;

const inMemoryRateLimit = new Map<string, { count: number; timestamp: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const now = Date.now();

  if (redis) {
    const key = `ratelimit:${ip}`;
    // Atomic increment; set TTL only on the first hit so the window is fixed.
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, RATE_WINDOW / 1000);
    }
    return count <= RATE_LIMIT;
  }

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
  
  try {
    const body = await request.json();
    const { name, email, phone, interest, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
    const subject = `New Enquiry from ${sanitizeInput(name)} - ${sanitizeInput(interest || "General")}`;

    const htmlContent = `
      <h2 style="color: #1a1a1a;">New Enquiry from Website</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 120px;">Name</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeInput(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeInput(email)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeInput(phone || "Not provided")}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Interest</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeInput(interest || "Not specified")}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message</td>
          <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${sanitizeInput(message)}</td>
        </tr>
      </table>
      <p style="margin-top: 16px; color: #666; font-size: 12px;">
        This enquiry was submitted through the Allwin Marbles website contact form.
      </p>
    `.trim();

    let emailId: string | undefined;

    if (resend) {
      const { data, error } = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: [toEmail],
        subject: subject,
        html: htmlContent,
        replyTo: email,
      });

      if (error) {
        return NextResponse.json(
          { error: "Failed to send email. Please try again." },
          { status: 500 }
        );
      }

      emailId = data?.id;
    }

    return NextResponse.json({ 
      success: true, 
      message: "Enquiry sent successfully",
      emailId 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}