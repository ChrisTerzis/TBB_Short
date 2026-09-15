import { useEffect, useState } from "react";

export default function TrialModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-3xl bg-cream p-8 text-ink shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl text-mute hover:text-ink"
          aria-label="Close modal"
        >
          ×
        </button>
        {submitted ? (
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-deep">
              You’re in
            </p>
            <h2 className="serif mt-3 text-3xl">Your free week starts now.</h2>
            <p className="mt-3 text-sm leading-relaxed text-mute-light">
              Check your inbox for your login and first training week. One week.
              Your first step.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-none bg-ink px-6 py-3 text-[13px] font-medium text-cream"
            >
              Back to the page
            </button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-deep">
              Free week
            </p>
            <h2 className="serif mt-3 text-3xl">Start training like an athlete.</h2>
            <p className="mt-3 text-sm leading-relaxed text-mute-light">
              One week inside the app. No commitment until you’re ready.
            </p>
            <label className="mt-6 block text-sm">
              Name
              <input
                required
                name="name"
                className="mt-1.5 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-gold"
              />
            </label>
            <label className="mt-4 block text-sm">
              Email
              <input
                required
                type="email"
                name="email"
                className="mt-1.5 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-gold"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-none bg-gold px-6 py-3 text-[13px] font-medium text-ink hover:bg-gold-soft"
            >
              Start your free week
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
