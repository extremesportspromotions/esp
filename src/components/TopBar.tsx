import { FacebookIcon, TikTokIcon } from "./SocialIcons";
// When Matthew sends real links, add X / Instagram / YouTube back
// from SocialIcons and append to socials below. Do not invent handles.

const socials = [
  {
    name: "Facebook",
    // Resolved from share link https://www.facebook.com/share/1HNKKCfu5x/
    href: "https://www.facebook.com/people/Extreme-Sports-Promotions/61594253231487/",
    Icon: FacebookIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@esp8852",
    Icon: TikTokIcon,
  },
] as const;

const pageLinks = [
  { label: "Sports", href: "#sports" },
  { label: "Find a club", href: "#find-a-club" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Enquire", href: "#enquire" },
] as const;

/**
 * Optional logo: drop /public/logo.svg and set showLogo = true.
 * Wordmark text remains as fallback.
 */
const showLogo = false;

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Extreme Sports Promotions — home"
          >
            {showLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/logo.svg" alt="" className="h-8 w-auto" />
            ) : (
              <span className="hidden font-display text-sm font-bold uppercase tracking-wide text-white sm:inline">
                ESP
              </span>
            )}
          </a>
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-1 lg:gap-2"
          >
            {pageLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-1.5 text-sm text-white/75 transition hover:bg-white/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#enquire"
            className="hidden rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
          >
            Get matched · £30
          </a>
          <nav aria-label="Social media" className="flex items-center gap-1 sm:gap-2">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
