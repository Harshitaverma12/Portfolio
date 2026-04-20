import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./Contact.css";

// ─────────────────────────────────────────────────────────────
//  CHOOSE YOUR METHOD:  'emailjs'  |  'formspree'
// ─────────────────────────────────────────────────────────────
const SEND_METHOD = "emailjs";

// ── EmailJS config ────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_alhlobq";
const EMAILJS_TEMPLATE_ID = "template_jr7mk97";
const EMAILJS_PUBLIC_KEY = "OEFmUqWQ89VIZkv2Z";

// ── Formspree config ──────────────────────────────────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

// ─────────────────────────────────────────────────────────────

async function sendViaEmailJS(form) {
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject || "New message from portfolio",
      message: form.message,
      to_email: "harshitaverma0526@gmail.com",
      reply_to: form.email,
    },
    EMAILJS_PUBLIC_KEY,
  );
}

async function sendViaFormspree(form) {
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      subject: form.subject || "New message from portfolio",
      message: form.message,
    }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.errors?.[0]?.message || "Formspree error");
  }
}

export default function Contact() {
  const heroRef = useScrollAnimation();
  const formRef = useScrollAnimation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setErrMsg("");
    try {
      if (SEND_METHOD === "emailjs") {
        await sendViaEmailJS(form);
      } else {
        await sendViaFormspree(form);
      }
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Send failed:", err);
      setErrMsg(err?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const socials = [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/harshita-verma-335b671b5/",
      handle: "harshita-verma-335b671b5",
    },
    { label: "GitHub", url: "https://github.com", handle: "@harshitaverma" },
    {
      label: "Email",
      url: "mailto:harshitaverma0526@gmail.com",
      handle: "harshitaverma0526@gmail.com",
    },
    { label: "Phone", url: "tel:+917268003334", handle: "+91-7268003334" },
  ];

  return (
    <main className="contact-page">
      <div className="contact-hero section-container fade-up" ref={heroRef}>
        <div className="section-tag">Get in touch</div>
        <h1 className="section-title contact-h1">
          Let's build something
          <br />
          <span className="grad-text">remarkable</span>
        </h1>
        <p className="section-sub">
          Open to full-time roles, freelance projects, and interesting
          conversations. I typically reply within 24 hours.
        </p>
      </div>

      <div className="contact-body section-container fade-up" ref={formRef}>
        <div className="contact-info">
          <div className="info-block">
            <div className="info-label">Email</div>
            <a href="mailto:harshitaverma0526@gmail.com" className="info-value">
              harshitaverma0526@gmail.com
            </a>
          </div>
          <div className="info-block">
            <div className="info-label">Phone</div>
            <a href="tel:+917268003334" className="info-value">
              +91-7268003334
            </a>
          </div>
          <div className="info-block">
            <div className="info-label">Availability</div>
            <div className="info-value avail">
              <span className="avail-dot" />
              Open to opportunities
            </div>
          </div>
          <div className="socials-block">
            <div className="info-label" style={{ marginBottom: "1rem" }}>
              Connect
            </div>
            <div className="social-links">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="social-name">{s.label}</span>
                  <span className="social-handle">{s.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {status === "sent" ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Message sent!</h3>
              <p>
                Thanks for reaching out. Harshita will reply within 24 hours.
              </p>
              <button
                type="button"
                className="btn-glow"
                onClick={() => setStatus(null)}
                style={{ marginTop: "1.5rem" }}
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Your name *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Email address *</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Subject</label>
                <input
                  className="form-input"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-input form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and what you're looking for..."
                  required
                />
              </div>

              {status === "error" && (
                <div className="form-error-banner">
                  <span className="err-icon">!</span>
                  <span>{errMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className={`form-submit ${status === "sending" ? "sending" : ""}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <span className="sending-dots">
                    Sending<span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                ) : (
                  "Send message →"
                )}
              </button>

              <p className="form-note">
                * Required. Your message goes directly to Harshita's inbox.
              </p>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
