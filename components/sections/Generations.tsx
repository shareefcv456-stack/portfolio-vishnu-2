import { Reveal } from "@/components/animations/Reveal";
import { generations } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Founder → second generation → Vishnu R G, as a three-column ledger with oversized numerals. */
export function Generations({ className }: { className?: string }) {
  return (
    <Reveal stagger as="ol" className={cn("grid border-t border-line lg:grid-cols-3", className)} aria-label="Three generations of RG Group">
      {generations.map((gen, i) => (
        <li key={gen.name} className="relative border-b border-line py-9 lg:border-b-0 lg:py-10 lg:pr-10 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-10">
          <span aria-hidden className="outline-type absolute right-2 top-6 font-serif text-[clamp(4.5rem,18vw,6rem)] leading-none lg:right-8">
            {i + 1}
          </span>
          <p className="label text-accent">{gen.label}</p>
          <h3 className={cn("mt-6 font-serif text-[2.1rem] font-medium leading-tight", i === 2 && "italic")}>{gen.name}</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{gen.text}</p>
        </li>
      ))}
    </Reveal>
  );
}
