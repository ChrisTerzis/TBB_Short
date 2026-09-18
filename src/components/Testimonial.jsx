export default function Testimonial() {
  return (
    <section className="bg-white text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:items-start lg:px-10 lg:py-20">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-deep">
            Built in the gym
          </p>
          <h2 className="serif mt-3 text-3xl sm:text-4xl">Proven onstage.</h2>
        </div>
        <blockquote>
          <p className="serif text-2xl leading-snug italic text-ink/90 sm:text-[2rem]">
            “I have gained so much strength and noticed an extreme decrease in
            injury and pain. I even avoided hip replacement surgery.”
          </p>
          <footer className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-mute-light">
            Avalyn P., TBB Athlete
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
