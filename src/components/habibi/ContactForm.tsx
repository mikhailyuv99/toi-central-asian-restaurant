"use client";

import { useState, type FormEvent } from "react";
import { client, phoneHref } from "@/lib/client";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ScrollReveal } from "./ScrollReveal";

export function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const digits = phoneHref.replace(/\D/g, "");
    const body = encodeURIComponent(
      `Hello TOI,\n\nName: ${name || "—"}\nPhone: ${phone || "—"}\n\n${message || "I'd like to get in touch."}`
    );
    window.open(`https://wa.me/${digits}?text=${body}`, "_blank", "noopener,noreferrer");
  }

  return (
    <ScrollReveal variant="right">
      <div className="habibi-maps__col habibi-maps__col--form">
        <form className="habibi-maps__card habibi-contact" onSubmit={onSubmit}>
      <h3 className="habibi-maps__heading">{t.maps.formTitle}</h3>
      <label className="habibi-contact__field">
        <span>{t.maps.name}</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="habibi-contact__field">
        <span>{t.maps.phone}</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label className="habibi-contact__field habibi-contact__field--message">
        <span>{t.maps.message}</span>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={client.headline ?? ""}
        />
      </label>
      <button type="submit" className="habibi-hero__btn habibi-hero__btn--primary habibi-maps__action">
        {t.maps.send}
      </button>
        </form>
      </div>
    </ScrollReveal>
  );
}
