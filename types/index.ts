import type { StaticImageData } from "next/image";

export type Photo = { src: StaticImageData; alt: string };
export type NavItem = { href: string; label: string };
export type Milestone = { year: string; text: string; photo: Photo; current?: boolean };
export type Venture = { name: string; description: string; category: string; url?: string; photo?: Photo };
export type Stat = { value: number; decimals?: number; suffix: string; label: string };
export type Award = { year: string; name: string; by: string; description: string };
export type Faq = { question: string; answer: string };
export type GalleryCategory = "stage" | "portraits" | "events" | "family";
export type GalleryItem = Photo & { category: GalleryCategory; caption: string };
export type Article = {
  slug: string;
  legacySlug: string;
  tag: string;
  title: string;
  excerpt: string;
  photo: Photo;
  /** Paragraphs separated by newlines; "## " = heading, "- " = list item, **bold** supported. */
  body: string;
};
