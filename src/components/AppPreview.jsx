import { photos } from "../photos.js";

export default function AppPreview() {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 lg:px-10 lg:py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
            The method
          </p>
          <h2 className="serif mt-4 max-w-md text-4xl leading-tight sm:text-5xl">
            The new standard for ballet training.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/70">
            Programs built for ballet. Guided workouts. A weekly structure you can
            follow.
          </p>
          <blockquote className="mt-10 max-w-md">
            <p className="serif text-xl italic leading-snug text-cream/90 sm:text-[1.45rem]">
              “My footwork, jump height, power and stamina have all improved
              dramatically.”
            </p>
            <footer className="mt-4 text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              Hannah A., TBB dancer
            </footer>
          </blockquote>
        </div>

        <div className="relative min-h-[540px] overflow-hidden bg-ink lg:min-h-[680px]">
          <img
            src={photos.podiumBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[70%_80%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />
          <div className="absolute inset-0 flex items-end justify-center pb-[19%] sm:pb-[17%]">
            <div className="relative">
              <img
                src={photos.appHome}
                alt="The Barbell Ballerina training app home screen"
                className="relative z-10 w-[210px] sm:w-[240px] lg:w-[258px]"
              />
              <div className="absolute -bottom-3 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/50 blur-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
