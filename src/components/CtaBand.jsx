export default function CtaBand({ onStart }) {
  return (
    <section className="bg-gold-deep">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center lg:px-10">
        <h2 className="serif text-3xl text-ink sm:text-4xl">
          Build a body and career that last.
        </h2>
        <button
          type="button"
          onClick={onStart}
          className="cursor-pointer rounded-[10px] bg-cream px-6 py-3 text-[13px] font-medium text-ink transition hover:bg-white"
        >
          Start your free week
        </button>
      </div>
    </section>
  );
}
