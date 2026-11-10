"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/content";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

/**
 * Composes the message in the visitor's own mail client, addressed to the office.
 * ponytail: mailto, no backend — swap for an API route if the office wants server-side delivery.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(String(d.get("subject")))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {FIELDS.map((f) => (
        <div key={f.name} className="group relative">
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required
            maxLength={200}
            placeholder=" "
            className="peer w-full border-0 border-b border-line bg-transparent pb-3 pt-6 font-serif text-2xl text-fg outline-none transition-colors focus:border-accent"
          />
          <label
            htmlFor={f.name}
            className="label pointer-events-none absolute left-0 top-7 text-muted transition-all duration-500 peer-focus:top-0 peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0"
          >
            {f.label}
          </label>
        </div>
      ))}
      <div className="relative">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder=" "
          className="peer w-full resize-none border-0 border-b border-line bg-transparent pb-3 pt-6 font-serif text-2xl text-fg outline-none transition-colors focus:border-accent"
        />
        <label
          htmlFor="message"
          className="label pointer-events-none absolute left-0 top-7 text-muted transition-all duration-500 peer-focus:top-0 peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0"
        >
          Your message
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button type="submit" className="btn btn-solid">
          Submit message <ArrowUpRight size={14} aria-hidden />
        </button>
        {sent && (
          <p role="status" className="flex items-center gap-2 text-sm text-muted">
            <Check size={16} className="text-accent" aria-hidden /> Your mail app should open with the message ready to send.
          </p>
        )}
      </div>
    </form>
  );
}
