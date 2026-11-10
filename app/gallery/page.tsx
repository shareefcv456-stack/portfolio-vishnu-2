import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { gallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of Vishnu R G — on stage, at RG Group events and exhibitions, portraits and family.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery — Vishnu R G", images: ["/images/gallery/g4.webp"] },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow={`Gallery · ${gallery.length} photographs`} title="Moments on *stage* and beyond." tone="espresso" />
      <section className="tone-espresso pb-[var(--section)]" aria-label="Photographs">
        <div className="wrap">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
