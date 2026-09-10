const steps = [
  {
    n: "01",
    title: "Choose your program",
    copy: "Match your level, goals, and training needs.",
  },
  {
    n: "02",
    title: "Train inside the app",
    copy: "Follow your guided weekly workouts.",
  },
  {
    n: "03",
    title: "Bring it to the stage",
    copy: "Build strength that supports your technique.",
  },
];

export default function Steps() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-3 lg:px-10 lg:py-16">
        {steps.map((step) => (
          <div key={step.n} className="flex gap-4">
            <span className="serif text-5xl leading-none text-gold sm:text-6xl">{step.n}</span>
            <div>
              <h2 className="text-[15px] font-medium text-ink">{step.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{step.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
