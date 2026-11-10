"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery, galleryFilters } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

/** Filterable masonry with a keyboard-accessible lightbox. Images stay inside their own tiles. */
export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]["value"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter photographs" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line">
        {galleryFilters.map((f) => {
          const count = f.value === "all" ? gallery.length : gallery.filter((g) => g.category === f.value).length;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "label relative pb-4 pt-2 transition-colors duration-500",
                filter === f.value ? "text-fg" : "text-muted hover:text-fg"
              )}
            >
              {filter === f.value && (
                <motion.span layoutId="filter-pill" transition={{ duration: 0.6, ease }} className="absolute inset-x-0 -bottom-px h-px bg-accent" />
              )}
              <span className="relative">
                {f.label} <sup className="numeral ml-0.5 text-[0.8rem] tracking-normal text-accent">{count}</sup>
              </span>
            </button>
          );
        })}
      </div>

      {/* Keyed by filter: the set re-composes with a staggered rise when the filter changes. */}
      <ul key={filter} className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
            {items.map((item, i) => (
              <motion.li
                key={item.src.src}
                initial={{ opacity: 0, clipPath: "inset(18% 0% 0% 0%)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 1.1, ease, delay: (i % 3) * 0.1 }}
                className="break-inside-avoid"
              >
                <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left" aria-label={`Open photograph: ${item.caption}`}>
                  <div className="grade frame">
                    <Image src={item.src} alt={item.alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" placeholder="blur" className="h-auto w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <span className="label absolute bottom-4 left-4 translate-y-2 text-ivory opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">View</span>
                  </div>
                  <p className="mt-3 flex items-baseline gap-3 text-xs text-muted">
                    <span className="numeral text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {item.caption}
                  </p>
                </button>
              </motion.li>
            ))}
      </ul>

      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} onChange={setOpen} />}</AnimatePresence>
    </>
  );
}

function Lightbox({ items, index, onChange }: { items: GalleryItem[]; index: number; onChange: (i: number | null) => void }) {
  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback((d: number) => onChange((index + d + items.length) % items.length), [index, items.length, onChange]);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(1);
  const item = items[index];

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) {
        setDir(d);
        step(d);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, step]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${items.length}: ${item.caption}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[70] flex flex-col bg-espresso/97 backdrop-blur-sm"
      onClick={close}
    >
      <div className="wrap flex h-20 shrink-0 items-center justify-between" onClick={(e) => e.stopPropagation()}>
        <p className="numeral text-sm text-muted">
          <span className="text-ivory">{String(index + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
        </p>
        <button ref={closeBtn} type="button" onClick={close} className="label flex items-center gap-2 text-ivory">
          Close <X size={18} aria-hidden />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={item.src.src}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60, clipPath: dir > 0 ? "inset(0 0 0 30%)" : "inset(0 30% 0 0)" }}
            animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0%)" }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-4 md:inset-x-24 md:inset-y-6"
          >
            <Image src={item.src} alt={item.alt} fill sizes="100vw" placeholder="blur" className="object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        </AnimatePresence>
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            aria-label={d < 0 ? "Previous photograph" : "Next photograph"}
            onClick={(e) => {
              e.stopPropagation();
              setDir(d);
              step(d);
            }}
            className={cn(
              "absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-espresso/60 text-ivory transition-colors hover:border-accent hover:text-accent md:size-14",
              d < 0 ? "left-3 md:left-6" : "right-3 md:right-6"
            )}
          >
            {d < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        ))}
      </div>

      <p className="wrap shrink-0 py-6 text-center font-serif text-lg text-fg/90">{item.caption}</p>
    </motion.div>
  );
}
