export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} Extreme Sports Promotions. All rights
          reserved.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          <a
            href="#about"
            className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            About
          </a>
          <a
            href="#find-a-club"
            className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Find a club
          </a>
          <a
            href="#how-it-works"
            className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            How it works
          </a>
          <a
            href="#enquire"
            className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Enquire
          </a>
        </nav>
      </div>
    </footer>
  );
}
