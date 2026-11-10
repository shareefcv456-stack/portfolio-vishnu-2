import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { site, socials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the office of Vishnu R G, CEO & Executive Director of RG Group, Calicut, Kerala.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact — Vishnu R G", images: ["/images/gallery/g15.webp"] },
};

const offices = [
  { title: "Direct", lines: [site.email, site.phone], hrefs: [`mailto:${site.email}`, site.phoneHref] },
  { title: "Office", lines: [site.office] },
  { title: "RG Group — official", lines: [site.officialAddress, `Ph: ${site.officialPhone}`] },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact · We’re here to connect"
        title="Building success, *inspiring growth.*"
        intro="Have a question or are looking to connect? Fill out the form, and I’ll get back to you as soon as possible!"
        tone="burgundy"
      />
      <section className="tone-burgundy pb-[var(--section)]" aria-label="Contact details and form">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <Reveal stagger className="space-y-10 border-t border-line pt-10 lg:col-span-4">
            {offices.map((o) => (
              <address key={o.title} className="not-italic">
                <p className="label text-accent">{o.title}</p>
                {o.lines.map((l, i) =>
                  o.hrefs?.[i] ? (
                    <a key={l} href={o.hrefs[i]} className="link-line mt-3 block w-fit font-serif text-2xl">
                      {l}
                    </a>
                  ) : (
                    <p key={l} className="mt-3 font-serif text-2xl leading-snug">
                      {l}
                    </p>
                  )
                )}
              </address>
            ))}
            <div>
              <p className="label text-accent">Follow</p>
              <ul className="mt-4 flex flex-wrap gap-6">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1">
                      {s.label} <ArrowUpRight size={12} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal className="tone-espresso border border-accent/25 p-6 shadow-2xl shadow-espresso/40 md:p-14 lg:col-span-7 lg:col-start-6">
            <p className="font-serif text-[2.6rem] leading-none">Send a <em className="text-accent">message</em></p>
            <p className="mt-2 text-sm text-muted">Addressed to {site.email}</p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="tone-espresso" aria-label="Location map">
        <iframe
          src={site.mapEmbed}
          title="RG Group on Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[55vh] w-full border-0 grayscale-[0.85] invert-[0.92] hue-rotate-180 contrast-[0.9]"
        />
      </section>
    </>
  );
}
