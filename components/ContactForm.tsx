"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/config";
import { PinIcon, PhoneIcon, MailIcon, WaIcon, CheckIcon } from "./icons";

interface Errors { name?: boolean; email?: boolean; message?: boolean }

export function ContactForm() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const clearErr = (k: keyof Errors) => setErrors((e) => ({ ...e, [k]: false }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = true;
    if (!form.message.trim()) next.message = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        alert(data.error || t("contact.errorMessage"));
      }
    } catch {
      alert(`${t("contact.errorMessage")} — WhatsApp: ${siteConfig.phone}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="page-hero marble-bg">
        <div className="wrap center" style={{ maxWidth: 760 }}>
          <p className="eyebrow center">{t("contact.eyebrow")}</p>
          <h1 className="display" style={{ marginTop: 20 }}>{t("contact.title")}</h1>
          <p className="lead mx-auto" style={{ marginTop: 22, maxWidth: "56ch" }}>{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap contact-grid">
          <div>
            {submitted ? (
              <div className="success">
                <div className="ring"><CheckIcon /></div>
                <h3>{t("contact.successTitle")}</h3>
                <p>{t("contact.successMessage")}</p>
                <button onClick={() => setSubmitted(false)}>{t("contact.sendAnother")}</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="row2">
                  <div className={`field${errors.name ? " error" : ""}`}>
                    <label htmlFor="cf-name">{t("contact.yourName")}</label>
                    <input
                      id="cf-name" type="text" name="name" placeholder={t("contact.yourName")}
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); clearErr("name"); }}
                    />
                    <span className="err">{t("contact.nameRequired")}</span>
                  </div>
                  <div className={`field${errors.email ? " error" : ""}`}>
                    <label htmlFor="cf-email">{t("contact.emailAddress")}</label>
                    <input
                      id="cf-email" type="email" name="email" placeholder={t("contact.emailAddress")}
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); clearErr("email"); }}
                    />
                    <span className="err">{t("contact.emailRequired")}</span>
                  </div>
                </div>
                <div className="row2">
                  <div className="field">
                    <label htmlFor="cf-phone">{t("contact.phoneNumber")}</label>
                    <input
                      id="cf-phone" type="tel" name="phone" placeholder={t("contact.phoneNumber")}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-interest">{t("contact.productInterest")}</label>
                    <select id="cf-interest" name="interest" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                      <option value="">{t("contact.productInterest")}</option>
                      <option value="marble">{t("contact.marbleGranite")}</option>
                      <option value="handicrafts">{t("contact.handicrafts")}</option>
                      <option value="construction">{t("contact.construction")}</option>
                      <option value="other">{t("contact.other")}</option>
                    </select>
                  </div>
                </div>
                <div className={`field${errors.message ? " error" : ""}`}>
                  <label htmlFor="cf-message">{t("contact.yourMessage")}</label>
                  <textarea
                    id="cf-message" name="message" placeholder={t("contact.yourMessage")}
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); clearErr("message"); }}
                  />
                  <span className="err">{t("contact.messageRequired")}</span>
                </div>
                <button type="submit" className="btn btn-primary submit-btn" disabled={sending}>
                  <span>{sending ? t("contact.sending") : t("contact.sendEnquiry")}</span>
                </button>
              </form>
            )}
          </div>

          <div>
            <div className="info-card">
              <h3>{t("contact.companyName")}</h3>
              <p className="regs">IEC {siteConfig.company.iec} · GSTIN {siteConfig.company.gstin}</p>
              <div className="info-row">
                <PinIcon />
                <div>
                  <div className="k">{t("contact.visit")}</div>
                  <a className="v" href={siteConfig.social.mapsMakrana} target="_blank" rel="noopener noreferrer">
                    Near Bhati Petrol Pump, Bye Pass Road, Makrana, Rajasthan — 341505
                  </a>
                </div>
              </div>
              <div className="info-row">
                <PhoneIcon />
                <div>
                  <div className="k">{t("contact.call")}</div>
                  <a className="v" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone} · {siteConfig.phoneAlt}</a>
                </div>
              </div>
              <div className="info-row">
                <MailIcon />
                <div>
                  <div className="k">{t("contact.email")}</div>
                  <a className="v" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </div>
              </div>
            </div>
            <a className="wa-card" href={siteConfig.social.whatsappLink} target="_blank" rel="noopener noreferrer">
              <WaIcon />
              <div><div className="wt">{t("contact.whatsapp")}</div><div className="ws">{t("contact.reply")}</div></div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
