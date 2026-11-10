"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, socials } from "@/lib/content";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
/** Routes whose masthead is ivory: the bar inverts until it turns solid on scroll. */
const LIGHT_MASTHEADS = ["/journal", "/business"];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 400 && y > prev);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const lightTop = LIGHT_MASTHEADS.some((p) => pathname.startsWith(p)) && !solid && !open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: hidden && !open ? -90 : 0 }}
        transition={{ duration: 0.9, ease }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-fg transition-[background-color,backdrop-filter,border-color] duration-700",
          solid && !open ? "border-b border-ivory/[0.07] bg-espresso/85 backdrop-blur-xl" : "border-b border-transparent",
          lightTop && "nav-light"
        )}
      >
        <nav aria-label="Primary" className="wrap flex h-[4.5rem] items-center justify-between md:h-20">
          <Link href="/" className="group flex items-center gap-4" aria-label={`${site.name} — home`}>
            <span className="font-serif text-[1.7rem] font-medium leading-none tracking-[0.06em]">
              V<span className="italic text-accent">R</span>G
            </span>
            <span aria-hidden className="hidden h-6 w-px bg-current opacity-20 lg:block" />
            <span className="label hidden text-muted transition-colors duration-500 group-hover:text-fg lg:inline">Vishnu R G · RG Group</span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex xl:gap-11">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "label group relative block py-2 transition-colors duration-500 hover:text-fg",
                    isActive(item.href) ? "text-fg" : "text-muted"
                  )}
                >
                  {item.label}
                  {/* Hover rule grows from the centre; the active rule glides between links. */}
                  <span aria-hidden className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-current opacity-40 transition-all duration-500 group-hover:w-full" />
                  {isActive(item.href) && (
                    <motion.span layoutId="nav-active" transition={{ duration: 0.8, ease }} aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full bg-accent" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu"
            className="label -mr-3 flex h-12 items-center gap-3 px-3 lg:hidden"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden className="relative block h-3 w-7">
              <span className={cn("absolute right-0 top-0 h-px w-full bg-current transition-all duration-500", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute bottom-0 right-0 h-px bg-current transition-all duration-500", open ? "w-full -translate-y-1.5 -rotate-45" : "w-4")} />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 1, ease }}
            className="tone-burgundy grain fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overscroll-contain px-[var(--gutter)] pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-24 lg:hidden"
          >
            <ul className="relative space-y-1">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-line">
                  <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.06 }}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn("flex min-h-14 items-baseline justify-between py-2.5 font-serif text-[clamp(2.1rem,10vw,2.8rem)] leading-tight", isActive(item.href) ? "italic text-accent" : "text-fg")}
                    >
                      {item.label}
                      <span className="numeral text-sm not-italic text-muted">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="relative mt-10 space-y-4 text-sm">
              <p className="label text-accent">{site.tagline}</p>
              <a href={`mailto:${site.email}`} className="block font-serif text-2xl">
                {site.email}
              </a>
              <div className="flex flex-wrap gap-6">
                {socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1 text-muted">
                    {s.label} <ArrowUpRight size={12} aria-hidden />
                  </a>
                ))}
              </div>
            </motion.div>
            <button type="button" onClick={() => setOpen(false)} className="sr-only">
              <X /> Close menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
