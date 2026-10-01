import { useEffect, useState } from "react";
import { photos } from "../photos.js";

const promos = {
  welcome: {
    id: "welcome",
    theme: "dark",
    kicker: "Black Friday",
    title: "Your next chapter starts stronger.",
    body: "Build strength for ballet with a clear plan and guided training.",
    image: photos.heroDancer,
    imageAlt: "Ballet dancer en pointe with a barbell",
    layout: "cover",
  },
  "nov-27": {
    id: "nov-27",
    theme: "light",
    kicker: "Black Friday",
    title: "Your next chapter starts stronger.",
    body: "Build strength for ballet with a clear plan and guided training.",
    image: photos.appHome,
    imageAlt: "The Barbell Ballerina training app home screen",
    layout: "phone",
  },
  "jan-1": {
    id: "jan-1",
    theme: "light",
    kicker: "New Year",
    title: "New year.\nStronger you.",
    body: "Build strength for ballet with a clear plan and guided training.",
    image: photos.founderPortrait,
    imageAlt: "The Barbell Ballerina founder",
    layout: "portrait",
  },
};

function activePromoId(date = new Date()) {
  const month = date.getMonth();
  const day = date.getDate();
  if (month === 0 && day === 1) return "jan-1";
  if (month === 10 && day === 27) return "nov-27";
  return "welcome";
}

function storageKey(id) {
  const year = new Date().getFullYear();
  return id === "welcome" ? "tbb-promo-welcome" : `tbb-promo-${id}-${year}`;
}

export default function PromoModal({ onStart, onExplore }) {
  const [promoId, setPromoId] = useState(null);

  useEffect(() => {
    const id = activePromoId();
    try {
      if (localStorage.getItem(storageKey(id))) return;
    } catch {
      // Show anyway if storage is blocked.
    }
    const timer = window.setTimeout(() => setPromoId(id), 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!promoId) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [promoId]);

  const dismiss = () => {
    if (promoId) {
      try {
        localStorage.setItem(storageKey(promoId), "dismissed");
      } catch {
        // Ignore storage failures.
      }
    }
    setPromoId(null);
  };

  if (!promoId) return null;

  const promo = promos[promoId];
  const dark = promo.theme === "dark";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#ddd3c6]/80 p-4 sm:p-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={dismiss}
      />
      <div
        className={`relative z-10 grid w-full max-w-[860px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:h-[460px] md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] ${
          dark ? "bg-ink text-cream" : "bg-[#f7f3ee] text-ink"
        }`}
      >
        <div
          className={`relative min-h-[280px] md:min-h-0 md:h-full ${
            promo.layout === "phone"
              ? "flex items-center justify-center overflow-hidden bg-[#f7f3ee] px-6 py-6"
              : "overflow-hidden bg-ink"
          }`}
        >
          {promo.layout === "phone" && (
            <>
              <span className="absolute left-[12%] top-[6%] h-32 w-32 rounded-full border border-gold/40" />
              <span className="absolute bottom-[-18%] left-[-10%] h-40 w-40 rounded-full bg-[#efe6da]" />
            </>
          )}
          <img
            src={promo.image}
            alt={promo.imageAlt}
            className={
              promo.layout === "phone"
                ? "relative z-10 w-[155px] drop-shadow-[0_18px_28px_rgba(0,0,0,0.28)] sm:w-[175px]"
                : promo.layout === "portrait"
                  ? "h-[280px] w-full object-cover object-center md:h-full"
                  : "h-[280px] w-full object-cover object-[center_18%] md:h-full"
            }
          />
        </div>

        <div className="relative flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
          <button
            type="button"
            onClick={dismiss}
            className={`absolute right-4 top-3 text-2xl leading-none ${
              dark ? "text-cream/50 hover:text-cream" : "text-mute hover:text-ink"
            }`}
            aria-label="Close modal"
          >
            ×
          </button>
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.32em] ${
              dark ? "text-gold" : "text-gold-deep"
            }`}
          >
            {promo.kicker}
          </p>
          <h2 className="serif mt-2.5 whitespace-pre-line text-[1.75rem] leading-[1.08] sm:text-[2.05rem]">
            {promo.title}
          </h2>
          <p
            className={`mt-3 max-w-md text-[14px] leading-relaxed ${
              dark ? "text-cream/70" : "text-mute-light"
            }`}
          >
            {promo.body}
          </p>
          <button
            type="button"
            onClick={() => {
              dismiss();
              onStart();
            }}
            className="mt-5 w-fit cursor-pointer rounded-[10px] bg-gold px-5 py-2.5 text-[13px] font-medium text-ink transition hover:opacity-90"
          >
            Start your free week
          </button>
          <button
            type="button"
            onClick={() => {
              dismiss();
              onExplore();
            }}
            className={`mt-3 w-fit cursor-pointer text-sm ${
              dark ? "text-cream/80 hover:text-cream" : "text-ink/80 hover:text-ink"
            }`}
          >
            Explore membership
          </button>
        </div>
      </div>
    </div>
  );
}
