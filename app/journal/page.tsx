import type { Metadata } from "next";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles on RG Group’s rebranding, RG Foods’ product lines, its global journey and Kerala’s gingelly oil heritage.",
  alternates: { canonical: "/journal" },
  openGraph: { title: "Journal — Vishnu R G", images: ["/images/journal-1.webp"] },
};

export default function JournalPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHeader eyebrow="Journal · Latest blogs" title="Notes on *brand, growth* and heritage." tone="ivory" />
      <section className="tone-ivory pb-[var(--section)]" aria-label="Articles">
        <div className="wrap">
          
          <ArticleCard article={lead} variant="featured" index={0} />
          <div className="mt-24 grid gap-16 border-t border-line pt-16 md:grid-cols-3 md:gap-8 md:[&>*:nth-child(2)]:mt-20">
            {rest.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
