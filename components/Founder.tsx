import { Reveal, Section } from "./ui";

/* All bracketed text is a placeholder to be replaced. */
export default function Founder() {
  return (
    <Section id="founder" space="md" className="bg-[#140e0a]">
      <Reveal>
        <span className="label inline-flex items-center gap-2.5 text-accent">
          <span className="h-px w-6 bg-accent/70" /> Built in Lucknow
        </span>
        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
          <div
            role="img"
            aria-label="Founder photo placeholder"
            className="grid h-40 w-40 shrink-0 place-items-center rounded-2xl bg-[#3a3a3a] text-[15px] lowercase text-[#9a9a9a]"
          >
            photo
          </div>
          <div>
            <h2 className="display text-[clamp(1.75rem,3.2vw,2.5rem)] text-text">[FOUNDER NAME]</h2>
            <p className="mt-3 max-w-[34rem] text-[16px] leading-[1.7] text-muted">[One line about your background — to be written]</p>
            <p className="mt-2 text-[17px] text-text">I personally set up every system.</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
