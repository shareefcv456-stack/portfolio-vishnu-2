export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

export const readingTime = (text: string) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 220));
