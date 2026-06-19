import { CtaButton } from "./CtaButton";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.2em] text-accent ${className}`}>
      {children}
    </p>
  );
}

type PullQuoteProps = {
  text: string;
  author: string;
};

export function PullQuote({ text, author }: PullQuoteProps) {
  return (
    <blockquote className="border-l-2 border-accent pl-5">
      <p className="font-serif text-xl leading-relaxed text-text md:text-2xl">&ldquo;{text}&rdquo;</p>
      <cite className="mt-3 block text-sm font-semibold not-italic text-text-soft">— {author}</cite>
    </blockquote>
  );
}

export { CtaButton };
