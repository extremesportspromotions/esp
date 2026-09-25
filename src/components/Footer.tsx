import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/50 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Extreme Sports Promotions. All rights
            reserved.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-4">
            <Link
              href="/#about"
              className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              About
            </Link>
            <Link
              href="/guides"
              className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Guides
            </Link>
            <Link
              href="/#find-a-club"
              className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Find a club
            </Link>
            <Link
              href="/#how-it-works"
              className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              How it works
            </Link>
            <Link
              href="/#enquire"
              className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Enquire
            </Link>
            <Link
              href="/privacy"
              className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Privacy
            </Link>
          </nav>
        </div>
        <p className="text-xs leading-relaxed text-white/40">
          Hosted on Vercel. A custom domain can be pointed here later when one
          is purchased — no domain is required to use the live site.
        </p>
      </div>
    </footer>
  );
}
