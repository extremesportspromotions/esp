import Image from "next/image";
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
  // "Enquire" opens How it works, which sits just above the enquiry form on the homepage.
  { label: "Enquire", href: "/#how-it-works", key: "enquire" },
  { label: "Guides", href: "/guides", key: "guides" },
  { label: "Shop", href: "/shop", key: "shop" },
  { label: "Promotions", href: "/promotions", key: "promotions" },
  { label: "Find a club", href: "/#find-a-club", key: "find-a-club" },
  { label: "Health", href: "/health", key: "health" },
] as const;

type TopBarProps = {
  /** Highlights the current section in the nav */
  active?: (typeof pageLinks)[number]["key"];
};

const linkBase =
  "shrink-0 whitespace-nowrap rounded-full py-1.5 text-sm transition tracking-wide hover:bg-white/10 hover:text-[#E3CD98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A]";

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
              isActive ? "bg-white/10 font-semibold text-[#E3CD98]" : "text-[#F6EFE3]/85"
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
 * Solid navy top bar with the stag ESP mark (public/brand/stag-navy.jpg, cut from the navy logo so its background matches #0E2141).
 */
export default function TopBar({ active }: TopBarProps = {}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#C9A96A]/25 bg-[#0E2141] text-[#F6EFE3]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-6">
          <Link href="/" aria-label="Extreme Sports Promotions home" className="flex shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A96A]">
            <Image src="/brand/stag-navy.jpg" alt="" width={34} height={45} priority className="h-11 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[1.7rem] font-semibold tracking-[0.08em] text-[#C9A96A]">ESP</span>
              <span className="mt-1 border-t border-[#C9A96A]/40 pt-1 text-[10px] font-medium leading-[1.2] tracking-[0.14em] text-[#E6E1D6] sm:text-[11px] sm:tracking-[0.16em]">
                EXTREME SPORTS<br className="sm:hidden" /> PROMOTIONS
              </span>
            </span>
          </Link>
          <span className="hidden h-8 w-px bg-[#C9A96A]/40 lg:block" aria-hidden />
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#F6EFE3]/80 transition hover:bg-white/10 hover:text-[#E3CD98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A]"
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
