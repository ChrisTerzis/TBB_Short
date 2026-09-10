import { useState } from "react";
import { photos } from "../photos.js";

const programs = [
  {
    n: "01",
    title: "Effortless Extensions",
    tag: "Mobility + Control",
    copy: "Develop front extension strength, active hip flexor range, posterior chain loading, side body control, and upper body endurance to support the height and stability your extensions demand.",
    image: photos.effortlessExtensions,
    imageAlt: "Dancer in a high side extension en pointe",
  },
  {
    n: "02",
    title: "Turn Like an Athlete",
    tag: "Power + Stability",
    copy: "Build the upper body pulling strength, lower body power, core stability, and turnout control that gives every pirouette a stronger suspension and a cleaner finish.",
    image: photos.turnLikeAnAthlete,
    imageAlt: "Dancer in a turning pose en pointe",
  },
  {
    n: "03",
    title: "Jumper's Edge",
    tag: "Explosive Strength",
    copy: "Train explosive hip drive, deep core force transfer, petit allegro reactivity, upper body carriage, and tendon elasticity to add height and power to every jump combination.",
    image: photos.jumpersEdge,
    imageAlt: "Dancer in a grand jeté",
  },
  {
    n: "04",
    title: "Stage Ready",
    tag: "Performance Preparation",
    copy: "A performance preparation program built around deep core stability, full body push strength, posterior chain power, reactive jump mechanics, and joint resilience.",
    image: photos.stageReady,
    imageAlt: "Dancer in a contemporary port de bras with mirrored figures",
  },
  {
    n: "05",
    title: "Bulletproof Body",
    tag: "Full-Body Conditioning",
    copy: "A full-spectrum conditioning program targeting lower body strength, rotational core control, jump stamina, postural precision, and turnout stability.",
    image: photos.bulletproofBody,
    imageAlt: "Dancer standing en pointe with an overhead port de bras",
  },
];

export default function Programs() {
  const [active, setActive] = useState(null);

  return (
    <section id="programs" className="bg-white text-ink">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-6 lg:px-10">
        <div className="flex flex-col gap-6 border-t border-ink/10 pt-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="serif text-4xl leading-tight sm:text-5xl">
              Five programs. Built for ballet.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mute-light">
              Purpose-built programs for stronger technique, resilient movement,
              and confident performance.
            </p>
          </div>
          <p className="hidden text-[11px] font-medium uppercase tracking-[0.28em] text-mute sm:block">
            Hover to explore
          </p>
        </div>

        <ul className="mt-10">
          {programs.map((program) => {
            const open = active === program.n;

            return (
              <li
                key={program.n}
                className="border-t border-ink/10 last:border-b"
                onMouseEnter={() => setActive(program.n)}
                onMouseLeave={() => setActive(null)}
              >
                <button
                  type="button"
                  className="w-full cursor-pointer text-left"
                  onClick={() => setActive(open ? null : program.n)}
                >
                  <FeaturedProgram program={program} open={open} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function FeaturedProgram({ program, open }) {
  return (
    <div
      data-open={open}
      className={`program-featured ${open ? "py-8 lg:py-10" : "py-6"}`}
    >
      <div className="relative flex min-w-0 items-start gap-5 sm:gap-8">
        <span className="serif mt-1 w-8 shrink-0 text-lg text-gold">{program.n}</span>
        <div className="min-w-0 flex-1 pr-28 sm:pr-40">
          <div data-open={open} className="reveal">
            <div className="reveal-inner">
              <p className="pb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                {program.tag}
              </p>
            </div>
          </div>
          <span className="serif block text-2xl leading-none sm:text-[1.85rem]">
            {program.title}
          </span>
          <div data-open={open} className="reveal">
            <div className="reveal-inner">
              <p className="max-w-xl pt-4 text-[15px] leading-relaxed text-mute-light">
                {program.copy}
              </p>
            </div>
          </div>
        </div>
        <span
          className={`absolute right-0 top-1 text-[10px] font-medium uppercase tracking-[0.22em] text-mute-light transition-opacity duration-500 sm:top-1/2 sm:-translate-y-1/2 ${
            open ? "opacity-0" : "opacity-100 delay-75"
          }`}
        >
          {program.tag}
        </span>
      </div>

      <div data-open={open} className="program-image lg:pl-10">
        <div className="reveal-inner">
          <div
            className={`relative mt-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:mt-0 ${
              open
                ? "translate-x-0 opacity-100 delay-75"
                : "pointer-events-none translate-x-5 opacity-0"
            }`}
          >
            <img
              src={program.image}
              alt={program.imageAlt}
              className="aspect-[16/10] w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 border border-gold sm:inset-2.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
