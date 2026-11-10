import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Rule } from "@/components/animations/Rule";
import { TextReveal } from "@/components/animations/TextReveal";
import { site } from "@/lib/content";

export function ContactSection() {
  const details = [
    { label: "Phone", value: site.phone, href: site.phoneHref },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Office", value: site.office },
    { label: "Based in", value: `${site.location}, India` },
  ];
  return (
    <section className="tone-burgundy grain section relative overflow-hidden" aria-label="Get in touch">
      <div aria-hidden className="absolute -right-[20%] -top-1/3 h-[80vh] w-[60vw] rounded-full bg-espresso/40 blur-[160px]" />
      <div className="wrap relative grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">
              <span className="numeral tracking-normal">09</span>Get in touch
            </p>
          </Reveal>
          <TextReveal as="h2" text={"Building success,\n*inspiring growth.*"} className="display h-xl mt-8" />
          <Reveal as="p" className="lead mt-10 text-fg/80">
            Have a question or are looking to connect? Fill out the form, and I’ll get back to you as soon as possible.
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-solid">
              Contact Vishnu <ArrowUpRight size={14} aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <Rule />
          <Reveal stagger as="dl">
            {details.map((d) => (
              <div key={d.label} className="border-b border-line py-6">
                <dt className="label text-accent">{d.label}</dt>
                <dd className="mt-2 font-serif text-[1.45rem] leading-snug">
                  {d.href ? (
                    <a href={d.href} className="link-line break-all sm:break-normal">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
