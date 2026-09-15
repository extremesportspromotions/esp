import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "./SocialIcons";

const socials = [
  { name: "X", href: "https://x.com/", Icon: XIcon },
  { name: "Facebook", href: "https://facebook.com/", Icon: FacebookIcon },
  { name: "Instagram", href: "https://instagram.com/", Icon: InstagramIcon },
  { name: "TikTok", href: "https://tiktok.com/", Icon: TikTokIcon },
  { name: "YouTube", href: "https://youtube.com/", Icon: YouTubeIcon },
] as const;

const pageLinks = [
  { label: "Sports", href: "#sports" },
  { label: "Find a club", href: "#find-a-club" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Enquire", href: "#enquire" },
] as const;

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-display shrink-0 text-sm font-extrabold tracking-[0.12em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base"
        >
          EXTREME SPORTS PROMOTIONS
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex lg:gap-2"
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
    </header>
  );
}
