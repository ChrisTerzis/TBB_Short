import Logo from "./Logo.jsx";

export default function Navbar({ onStart }) {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Logo />
        <button
          type="button"
          onClick={onStart}
          className="cursor-pointer rounded-[10px] bg-gold px-5 py-2.5 text-[13px] font-medium text-ink transition hover:opacity-90"
        >
          Start your free week
        </button>
      </div>
    </header>
  );
}
