import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

type Props = { index?: string; eyebrow: string; title: string; className?: string; titleClass?: string; as?: "h1" | "h2" };

/** Numbered eyebrow + masked serif title — the house heading for every section. */
export function SectionHeading({ index, eyebrow, title, className, titleClass = "h-l", as = "h2" }: Props) {
  return (
    <div className={className}>
      <Reveal>
        <p className="eyebrow">
          {index && <span className="numeral tracking-normal">{index}</span>}
          {eyebrow}
        </p>
      </Reveal>
      <TextReveal as={as} text={title} onLoad={as === "h1"} className={cn("display mt-6", titleClass)} />
    </div>
  );
}
