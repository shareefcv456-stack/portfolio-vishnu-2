import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { nav, site, socials } from "@/lib/content";

export function Footer() {
  return (
    <footer className="tone-espresso grain relative overflow-hidden pt-20 md:pt-32">
      <div className="wrap relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">{site.tagline}</p>
            <p className="display h-l mt-8 max-w-lg">
              Rooted in 1940. <em>Built for what comes next.</em>
            </p>
            <Link href="/contact" className="btn mt-12">
              Work with Vishnu <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:pt-3">
            <nav aria-label="Footer">
              <h2 className="label text-accent">Index</h2>
              <ul className="mt-7 space-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="link-line font-serif text-xl text-fg/90">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="label text-accent">Follow</h2>
              <ul className="mt-7 space-y-3">
                {[...socials, { label: "RG Foods", href: site.rgFoods }].map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1 font-serif text-xl text-fg/90">
                      {s.label} <ArrowUpRight size={12} aria-hidden className="opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <address className="col-span-2 not-italic sm:col-span-1">
              <h2 className="label text-accent">Office</h2>
              <p className="mt-7 text-sm leading-relaxed text-muted">{site.office}</p>
              <a href={site.phoneHref} className="link-line mt-5 block w-fit text-sm text-fg/90">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="link-line mt-1 block w-fit text-sm text-fg/90">
                {site.email}
              </a>
            </address>
          </div>
        </div>

        <p
          aria-hidden
          className="outline-type pointer-events-none mt-16 select-none whitespace-nowrap text-center font-serif leading-[0.8] tracking-[-0.02em] md:mt-32"
          style={{ fontSize: "clamp(3rem, 19vw, 19rem)" }}
        >
          Vishnu R G
        </p>

        <div className="flex flex-col gap-4 border-t border-line pb-10 pt-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} RG Vishnu. All rights reserved.</p>
          <p className="label">
            {site.role} · {site.location}
          </p>
          <a href="#main" className="label group inline-flex items-center gap-3 text-fg">
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
              <ArrowUp size={14} aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
