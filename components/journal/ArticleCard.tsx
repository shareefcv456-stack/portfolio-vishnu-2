import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { cn, readingTime } from "@/lib/utils";
import type { Article } from "@/types";

type Props = { article: Article; index: number; variant?: "featured" | "card" | "row" };

const Meta = ({ article, index }: { article: Article; index: number }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-accent">
    <span className="numeral text-base">No. {String(index + 1).padStart(2, "0")}</span>
    <span className="h-px w-6 bg-current opacity-50" />
    <span className="label">{article.tag}</span>
    <span className="label text-muted">{readingTime(article.body)} min read</span>
  </div>
);

/** Journal entry in three editorial registers: cover story, column card, contents row. */
export function ArticleCard({ article, index, variant = "card" }: Props) {
  const href = `/journal/${article.slug}`;

  if (variant === "row")
    return (
      <article className="group border-b border-line">
        <Link href={href} className="grid grid-cols-[1fr_6.5rem] items-start gap-6 py-8 sm:grid-cols-[1fr_8rem]">
          <div>
            <Meta article={article} index={index} />
            <h3 className="mt-4 font-serif text-[1.65rem] font-medium leading-[1.15] transition-colors duration-500 group-hover:text-accent">{article.title}</h3>
          </div>
          <div className="grade frame relative aspect-[4/5]">
            <Image src={article.photo.src} alt={article.photo.alt} fill sizes="8rem" placeholder="blur" className="object-cover" />
          </div>
        </Link>
      </article>
    );

  const featured = variant === "featured";
  return (
    <article className="group">
      <Link href={href} className="block">
        <ImageReveal className={cn("grade frame", featured ? "aspect-[16/10]" : "aspect-[4/5]")}>
          <Image
            src={article.photo.src}
            alt={article.photo.alt}
            fill
            sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
            placeholder="blur"
            className="object-cover"
          />
          <span className="absolute right-4 top-4 grid size-11 scale-75 place-items-center rounded-full bg-ivory text-espresso opacity-0 transition-all duration-700 ease-[var(--ease-lux)] group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight size={16} aria-hidden />
          </span>
        </ImageReveal>
        <div className="mt-7">
          <Meta article={article} index={index} />
        </div>
        <h3 className={featured ? "display h-m mt-5" : "mt-5 font-serif text-[1.85rem] font-medium leading-[1.15]"}>
          <span className="link-line">{article.title}</span>
        </h3>
        {featured && <p className="mt-5 max-w-2xl leading-[1.85] text-fg/70">{article.excerpt}</p>}
      </Link>
    </article>
  );
}
