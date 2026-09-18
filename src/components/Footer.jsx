import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <Logo />
        <nav className="flex gap-6 text-sm text-mute">
          <a
            href="https://thebarbellballerina.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream"
          >
            Privacy
          </a>
          <a
            href="https://thebarbellballerina.com/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream"
          >
            Terms
          </a>
          <a href="mailto:support@thebarbellballerina.com" className="hover:text-cream">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
