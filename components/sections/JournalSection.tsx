import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/lib/articles";

/** Magazine spread: the cover story left, the issue's contents right. */
export function JournalSection() {
  const [lead, ...rest] = articles;
  return (
    <section className="tone-ivory section" aria-label="Journal">
      <div className="wrap">
        <div className="flex flex-col gap-8 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="08" eyebrow="Journal" title="Notes on *brand, growth* and heritage." />
          <Reveal>
            <Link href="/journal" className="btn shrink-0">
              All articles <ArrowUpRight size={14} aria-hidden />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-16 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ArticleCard article={lead} variant="featured" index={0} />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label border-b border-line pb-4 text-muted">Also in the journal</p>
            <Reveal stagger>
              {rest.map((a, i) => (
                <ArticleCard key={a.slug} article={a} variant="row" index={i + 1} />
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
