import { photos } from "../photos.js";

export default function Hero({ onStart }) {
  return (
    <section id="top" className="relative bg-ink pt-28 pb-16 lg:pt-32 lg:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10 lg:px-10">
        <div className="max-w-xl">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
            Ballet-specific strength training
          </p>
          <h1 className="serif text-[3.35rem] leading-[0.95] text-cream sm:text-6xl lg:text-[4.6rem]">
            Ballet is
            <br />
            Athletic.
            <span className="mt-2 block italic text-gold">Train for it.</span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-cream/70">
            Build strength that carries into your jumps, turns, extensions, and a
            longer career on stage.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStart}
              className="cursor-pointer rounded-[10px] bg-gold px-6 py-3 text-[13px] font-medium text-ink transition hover:bg-gold-soft"
            >
              Start your free week
            </button>
            <p className="text-sm text-mute">One week. Your first step.</p>
          </div>
        </div>

        <div className="relative">
          <div className="relative bg-[#1a1a1a]">
            <img
              src={photos.heroDancer}
              alt="Ballet dancer en pointe standing behind a barbell"
              className="h-auto w-full rounded-none object-contain object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 border border-gold sm:inset-5 lg:inset-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
