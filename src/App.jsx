import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Steps from "./components/Steps.jsx";
import AppPreview from "./components/AppPreview.jsx";
import Testimonial from "./components/Testimonial.jsx";
import Programs from "./components/Programs.jsx";
import Pricing from "./components/Pricing.jsx";
import CtaBand from "./components/CtaBand.jsx";
import Footer from "./components/Footer.jsx";
import TrialModal from "./components/TrialModal.jsx";
import PromoModal from "./components/PromoModal.jsx";

export default function App() {
  const [trialOpen, setTrialOpen] = useState(false);

  const openTrial = () => setTrialOpen(true);

  const exploreMembership = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-ink text-cream overflow-x-hidden">
      <Navbar onStart={exploreMembership} />
      <main>
        <Hero onStart={exploreMembership} />
        <Steps />
        <AppPreview />
        <Testimonial />
        <Programs />
        <Pricing onStart={openTrial} />
        <CtaBand onStart={exploreMembership} />
      </main>
      <Footer />
      <TrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />
      <PromoModal onStart={exploreMembership} onExplore={exploreMembership} />
    </div>
  );
}
