import Link from "next/link";
import { FacebookIcon, TikTokIcon, XIcon, YouTubeIcon } from "./SocialIcons";
// When Matthew sends a real Instagram link, add it from SocialIcons.
// Do not invent handles.

const socials = [
  {
    name: "X",
    href: "https://x.com/ExtremeSpowke",
    Icon: XIcon,
  },
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
  {
    name: "YouTube",
    href: "https://youtube.com/@extremesportspromotions",
    Icon: YouTubeIcon,
  },
] as const;

// Absolute paths (/#…) so the links also work from sub-pages such as /guides.
const pageLinks = [
  { label: "Sports", href: "/#sports", key: "sports" },
  { label: "Guides", href: "/guides", key: "guides" },
  { label: "Find a club", href: "/#find-a-club", key: "find-a-club" },
  { label: "How it works", href: "/#how-it-works", key: "how-it-works" },
  { label: "Enquire", href: "/#enquire", key: "enquire" },
] as const;

type TopBarProps = {
  /** Highlights the current section in the nav */
  active?: (typeof pageLinks)[number]["key"];
};

const linkBase =
  "shrink-0 whitespace-nowrap rounded-full py-1.5 text-sm transition hover:bg-[#1C1917]/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function NavLinks({ active, compact }: TopBarProps & { compact?: boolean }) {
  return (
    <>
      {pageLinks.map(({ label, href, key }) => {
        const isActive = active === key;
        return (
          <Link
            key={key}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`${linkBase} ${compact ? "px-2.5" : "px-3"} ${
              isActive ? "bg-[#1C1917]/10 font-semibold text-[#1C1917]" : "text-[#1C1917]/75"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

/**
 * No small header mark — homepage wordmark is /public/logo.png in BrandTitle.
 */
export default function TopBar({ active }: TopBarProps = {}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1C1917]/10 bg-[#EEF4FA]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex lg:gap-2">
            <NavLinks active={active} />
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <nav aria-label="Social media" className="flex items-center gap-1 sm:gap-2">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1C1917]/80 transition hover:bg-[#1C1917]/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon />
              </a>
            ))}
          </nav>
        </div>
      </div>
      <nav
        aria-label="Primary (mobile)"
        className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:px-5 lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        <NavLinks active={active} compact />
      </nav>
    </header>
  );
}
