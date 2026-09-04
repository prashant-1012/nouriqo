"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, Send, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { buildWhatsAppEnquiryUrl } from "@/lib/whatsapp";

const inputWrapClass =
  "mt-2 flex h-11 items-center gap-2 rounded-full border border-ink/15 pl-4 transition-colors focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/20";
const inputClass =
  "h-full w-full bg-transparent pr-4 text-sm text-ink outline-none placeholder:text-ink-soft/60";

export function EnquiryForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = buildWhatsAppEnquiryUrl({ name, contact, email, message });
    window.open(url, "_blank", "noopener,noreferrer");
    setName("");
    setContact("");
    setEmail("");
    setMessage("");
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  }

  return (
    <section className="bg-ivory py-12 sm:py-16">
      <Container className="max-w-xl">
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="enquiry-name" className="text-sm font-medium text-ink">
                Full Name
              </label>
              <div className={inputWrapClass}>
                <User size={18} className="shrink-0 text-ink-soft" />
                <input
                  id="enquiry-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="enquiry-contact" className="text-sm font-medium text-ink">
                Contact Number
              </label>
              <div className={inputWrapClass}>
                <Phone size={18} className="shrink-0 text-ink-soft" />
                <input
                  id="enquiry-contact"
                  type="tel"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="Your phone number"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="enquiry-email" className="text-sm font-medium text-ink">
                Email Address
              </label>
              <div className={inputWrapClass}>
                <Mail size={18} className="shrink-0 text-ink-soft" />
                <input
                  id="enquiry-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="enquiry-message" className="text-sm font-medium text-ink">
                Message
              </label>
              <textarea
                id="enquiry-message"
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="How can we help?"
                required
                className="mt-2 w-full resize-none rounded-2xl border border-ink/15 p-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 py-3 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700"
            >
              {sent ? "Opened in WhatsApp" : "Send via WhatsApp"}
              <Send size={16} />
            </button>

            <p className="text-center text-xs text-ink-soft/70">
              Opens WhatsApp with your message pre-filled — just hit send
              there to reach us.
            </p>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
