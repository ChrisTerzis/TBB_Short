import { useState } from "react";

const plans = [
  {
    id: "strength",
    kicker: "Strength Athlete",
    title: "Build your foundation.",
    dark: false,
    monthly: 24.99,
    annual: 20.75,
    annualTotal: 249,
    features: [
      "Core programs",
      "Basic logging and progress",
      "Read-only community access",
      "Select feature updates",
    ],
    checkout: {
      monthly:
        "https://checkout.stripe.com/f/pay/cs_live_b1vM0hyaflX0uAxIClkEmwlOcrxhP49yRYP0moqNKSpRvvZ4QzxsNxBDoO#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSd2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2JzJz8wKSdkdWxOYHwnPyd1blppbHNgWjA0THdyQ0hOU25XYjJENHM8SUBCSEQ8Vz1GZ0xCbHRRf0lSRn9gQ0RTSWowNUBQRmRWUV1TVTdxZG1wYGxycjZDamJ0ZEsya1IzSHVER3FVfH1DUGAzYHRGNTU3TENfVmxGdycpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyY1NTU1NTUnKSdpZHxqcHFRfHVgJz8naHBpcWxabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
      annual:
        "https://checkout.stripe.com/c/pay/cs_live_b1UQx86rscOESMZG8hdrVyNIOsW3wrMqxB11mRjnMP2VtatoUV4cifINNG#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSd2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2JzJz81KSdkdWxOYHwnPyd1blppbHNgWjA0THdyQ0hOU25XYjJENHM8SUBCSEQ8Vz1GZ0xCbHRRf0lSRn9gQ0RTSWowNUBQRmRWUV1TVTdxZG1wYGxycjZDamJ0ZEsya1IzSHVER3FVfH1DUGAzYHRGNTU3TENfVmxGdycpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyY1NTU1NTUnKSdpZHxqcHFRfHVgJz8naHBpcWxabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
    },
  },
  {
    id: "performance",
    kicker: "Performance Athlete",
    title: "Go further with your training.",
    dark: true,
    monthly: 39.99,
    annual: 33.25,
    annualTotal: 399,
    features: [
      "All programs",
      "Personalized logging & dashboard",
      "Full community access",
      "All new features",
      "Full workout history",
      "Ballet-specific coaching insights*",
    ],
    checkout: {
      monthly:
        "https://checkout.stripe.com/c/pay/cs_live_b1b6gWZbD4jiznus75JM0DTf5iM30U725PncPwxrbiDLT7gbW04MzQg7pN#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSd2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2JzJz81KSdkdWxOYHwnPyd1blppbHNgWjA0THdyQ0hOU25XYjJENHM8SUBCSEQ8Vz1GZ0xCbHRRf0lSRn9gQ0RTSWowNUBQRmRWUV1TVTdxZG1wYGxycjZDamJ0ZEsya1IzSHVER3FVfH1DUGAzYHRGNTU3TENfVmxGdycpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyY1NTU1NTUnKSdpZHxqcHFRfHVgJz8naHBpcWxabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
      annual:
        "https://checkout.stripe.com/f/pay/cs_live_b1U6tCJBmpfFWOB82E9rxuVXumFYiVD7qza7FXBR827TMNqAdJstnKmBVX#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSd2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2JzJz8wKSdkdWxOYHwnPyd1blppbHNgWjA0THdyQ0hOU25XYjJENHM8SUBCSEQ8Vz1GZ0xCbHRRf0lSRn9gQ0RTSWowNUBQRmRWUV1TVTdxZG1wYGxycjZDamJ0ZEsya1IzSHVER3FVfH1DUGAzYHRGNTU3TENfVmxGdycpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyY1NTU1NTUnKSdpZHxqcHFRfHVgJz8naHBpcWxabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
    },
  },
];

function formatPrice(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export default function Pricing() {
  const [billing, setBilling] = useState("annual");

  return (
    <section id="pricing" className="bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="serif text-4xl leading-tight sm:text-5xl">
            Choose your training path.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-mute-light">
            Structured strength training for ballet athletes. Seasonal
            programming. Performance tracking.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {plans.map((plan) => {
            const price = billing === "annual" ? plan.annual : plan.monthly;
            const checkoutUrl = plan.checkout[billing];
            const ctaClass = `mt-7 inline-block w-full cursor-pointer rounded-[10px] px-6 py-3 text-center text-[13px] font-medium transition sm:w-auto ${
              plan.dark
                ? "bg-gold text-ink hover:bg-gold-soft"
                : "bg-ink text-cream hover:bg-ink-soft"
            }`;
            return (
              <article
                key={plan.id}
                className={`flex flex-col rounded-lg p-8 sm:p-10 ${
                  plan.dark
                    ? "bg-ink text-cream"
                    : "bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                }`}
              >
                <p
                  className={`text-[11px] font-medium uppercase tracking-[0.28em] ${
                    plan.dark ? "text-gold" : "text-gold-deep"
                  }`}
                >
                  {plan.kicker}
                </p>
                <h3 className="serif mt-4 text-3xl sm:text-[2.1rem]">{plan.title}</h3>
                <ul
                  className={`mt-8 ${
                    plan.id === "performance"
                      ? "grid grid-cols-1 gap-x-3 gap-y-3 text-[12px] leading-snug sm:grid-cols-2 sm:text-[13px]"
                      : "space-y-3 text-[13px]"
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex min-w-0 gap-2">
                      <span className={plan.dark ? "text-gold" : "text-gold-deep"}>•</span>
                      <span
                        className={`${
                          plan.dark ? "text-cream/80" : "text-mute-light"
                        } ${plan.id === "performance" ? "sm:whitespace-nowrap" : ""}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {plan.id === "performance" && (
                  <p className="mt-4 text-[11px] leading-relaxed text-mute">
                    *AI-powered coaching insights, trained by Lili to optimize your
                    ballet performance
                  </p>
                )}
                <div className="mt-auto pt-10">
                  <p
                    className={`text-[11px] font-medium uppercase tracking-[0.24em] ${
                      plan.dark ? "text-gold" : "text-gold-deep"
                    }`}
                  >
                    {billing === "annual" ? "Annual" : "Monthly"}
                  </p>
                  <p className="serif mt-2 text-4xl">
                    {formatPrice(price)}
                    <span className="ml-1 text-lg opacity-60">/mo</span>
                  </p>
                  {billing === "annual" ? (
                    <p className="mt-1 text-sm text-mute">
                      ${plan.annualTotal} billed annually
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-mute">Billed monthly</p>
                  )}
                  <a href={checkoutUrl} className={ctaClass}>
                    Start your free week
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-mute-light">
          Change plans or cancel anytime • 100% Lili’s method • 0% generic fitness
        </p>
      </div>
    </section>
  );
}

function BillingToggle({ billing, onChange }) {
  return (
    <div className="relative inline-grid grid-cols-2 rounded-full bg-cream-deep p-1">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-gold shadow-[0_1px_8px_rgba(187,137,108,0.35)] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          billing === "annual" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`relative z-10 cursor-pointer rounded-full px-6 py-2.5 text-[13px] transition-colors duration-300 ${
          billing === "monthly" ? "text-ink" : "text-mute-light"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        className={`relative z-10 flex cursor-pointer flex-col items-center rounded-full px-6 py-2.5 text-[13px] leading-tight transition-colors duration-300 ${
          billing === "annual" ? "text-ink" : "text-mute-light"
        }`}
      >
        Annual
        <span
          className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] transition-opacity duration-300 ${
            billing === "annual" ? "opacity-80" : "opacity-60"
          }`}
        >
          Best value
        </span>
      </button>
    </div>
  );
}
