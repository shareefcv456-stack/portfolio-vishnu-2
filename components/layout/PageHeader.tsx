import { Reveal } from "@/components/animations/Reveal";
import { Rule } from "@/components/animations/Rule";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

export type Tone = "espresso" | "charcoal" | "burgundy" | "ivory" | "cream";
type Props = { eyebrow: string; title: string; intro?: string; tone?: Tone; children?: React.ReactNode };

/** Inner-page masthead: oversized serif title, an animated rule, intro set against the right column. */
export function PageHeader({ eyebrow, title, intro, tone = "espresso", children }: Props) {
  return (
    <header className={cn(`tone-${tone}`, "relative overflow-hidden pb-14 pt-28 md:pb-24 md:pt-48")}>
      <div className="wrap relative">
        <Reveal onLoad>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <TextReveal as="h1" onLoad delay={0.05} text={title} className="display h-xl mt-6 max-w-6xl md:mt-8" />
        <Rule onLoad delay={0.5} className="mt-10 md:mt-20" />
        {intro && (
          <div className="grid lg:grid-cols-12">
            <Reveal onLoad delay={0.6} as="p" className="lead mt-8 text-fg/75 lg:col-span-6 lg:col-start-7">
              {intro}
            </Reveal>
          </div>
        )}
        {children}
      </div>
    </header>
  );
}
