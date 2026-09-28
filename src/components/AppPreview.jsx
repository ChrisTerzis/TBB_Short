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
              Hannah A., TBB Athlete
            </footer>
          </blockquote>
        </div>

        <div className="relative flex min-h-[480px] items-center justify-center bg-ink px-6 py-16 lg:min-h-[640px]">
          <img
            src={photos.workout}
            alt="The Barbell Ballerina workout in the training app"
            className="w-[420px] sm:w-[480px] lg:w-[540px]"
          />
        </div>
      </div>
    </section>
  );
}
