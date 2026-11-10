import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { ArticleBody } from "@/components/journal/ArticleBody";
import { articles, getArticle } from "@/lib/articles";
import { site } from "@/lib/content";
import { media } from "@/lib/media";
import { readingTime } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.excerpt, images: [article.photo.src.src] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const i = articles.indexOf(article);
  const next = articles[(i + 1) % articles.length];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    image: `${site.url}${article.photo.src.src}`,
    author: { "@type": "Person", name: site.name },
    mainEntityOfPage: `${site.url}/journal/${article.slug}`,
  };

  return (
    <article className="tone-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="wrap pt-28 md:pt-44">
        <Reveal onLoad className="flex flex-wrap items-center gap-5 text-accent">
          <Link href="/journal" className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
            <ArrowLeft size={14} aria-hidden /> Journal
          </Link>
          <span className="h-px w-8 bg-current opacity-50" />
          <span className="label">{article.tag}</span>
          <span className="label text-muted">{readingTime(article.body)} min read</span>
        </Reveal>
        <TextReveal as="h1" onLoad stagger={0.03} text={article.title} className="display h-xl mt-8 max-w-6xl" />
        <Reveal onLoad delay={0.3} as="p" className="lead mt-8 text-fg/70">
          {article.excerpt}
        </Reveal>
      </header>

      <div className="mt-10 px-[var(--gutter)] md:mt-20 xl:px-[calc(var(--gutter)/2)]">
        <ImageReveal onLoad delay={0.2} className="grade aspect-[4/3] w-full md:aspect-[21/9]">
          <ParallaxImage photo={article.photo} sizes="100vw" priority amount={10} />
        </ImageReveal>
      </div>

      <div className="wrap grid gap-10 py-12 md:gap-12 md:py-24 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="label text-muted">Written by</p>
            <div className="mt-5 flex items-center gap-4 border-t border-line pt-5">
              <div className="grade relative size-14 shrink-0 overflow-hidden rounded-full">
                <Image src={media.g11} alt="" fill sizes="56px" className="object-cover object-top" />
              </div>
              <div>
                <p className="font-serif text-2xl leading-none">{site.name}</p>
                <p className="mt-1.5 text-xs text-muted">{site.role}</p>
              </div>
            </div>
          </div>
        </aside>
        <div className="max-w-[44rem] lg:col-span-7 lg:col-start-5">
          <ArticleBody body={article.body} />
        </div>
      </div>

      <Link href={`/journal/${next.slug}`} className="group tone-burgundy grain relative block">
        <div className="wrap grid gap-8 py-20 md:grid-cols-12 md:items-center md:py-28">
          <div className="md:col-span-8">
            <p className="label text-accent">Next article</p>
            <p className="display h-l mt-5">
              <span className="link-line">{next.title}</span>
            </p>
          </div>
          <div className="grade frame relative aspect-[3/2] md:col-span-4">
            <Image src={next.photo.src} alt={next.photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" placeholder="blur" className="object-cover" />
            <span className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-accent text-espresso transition-transform duration-700 group-hover:rotate-45">
              <ArrowUpRight size={18} aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
