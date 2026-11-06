"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
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
  { label: "Corporate & Teams", href: "/corporate-teams", key: "corporate-teams" },
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
  "shrink-0 whitespace-nowrap rounded-full py-1.5 transition tracking-wide hover:bg-white/10 hover:text-[#E3CD98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A]";

function NavLinks({
  active,
  onNavigate,
  stacked,
}: TopBarProps & { onNavigate?: () => void; stacked?: boolean }) {
  return (
    <>
      {pageLinks.map(({ label, href, key }) => {
        const isActive = active === key;
        return (
          <Link
            key={key}
            href={href}
            aria-current={isActive ? "page" : undefined}
            onClick={onNavigate}
            className={
              stacked
                ? `${linkBase} block w-full px-4 py-3 text-base ${
                    isActive
                      ? "bg-white/10 font-semibold text-[#E3CD98]"
                      : "text-[#F6EFE3]/90"
                  }`
                : `${linkBase} px-2 text-xs xl:px-2.5 xl:text-sm ${
                    isActive
                      ? "bg-white/10 font-semibold text-[#E3CD98]"
                      : "text-[#F6EFE3]/85"
                  }`
            }
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

function SocialLinks({ compact }: { compact?: boolean }) {
  return (
    <nav aria-label="Social media" className="flex items-center gap-0.5 sm:gap-1">
      {socials.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`inline-flex items-center justify-center rounded-full text-[#F6EFE3]/80 transition hover:bg-white/10 hover:text-[#E3CD98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A] ${
            compact ? "h-8 w-8" : "h-9 w-9"
          }`}
        >
          <Icon />
        </a>
      ))}
    </nav>
  );
}

/**
 * Solid navy top bar with the stag ESP mark (public/brand/stag-navy.jpg).
 * Phone: hamburger opens a stacked panel of every primary link.
 * Desktop (lg+): text links stay visible; socials sit on their own row so they never overlap the labels.
 */
export default function TopBar({ active }: TopBarProps = {}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Defer so the opening click does not immediately close the panel.
    const timer = window.setTimeout(() => {
      document.addEventListener("mousedown", onPointer);
      document.addEventListener("touchstart", onPointer);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#C9A96A]/25 bg-[#0E2141] text-[#F6EFE3]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label="Extreme Sports Promotions home"
          className="flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A96A]"
        >
          <Image
            src="/brand/stag-navy.jpg"
            alt=""
            width={34}
            height={45}
            priority
            className="h-11 w-auto"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[1.7rem] font-semibold tracking-[0.08em] text-[#C9A96A]">
              ESP
            </span>
            <span className="mt-1 border-t border-[#C9A96A]/40 pt-1 text-[10px] font-medium leading-[1.2] tracking-[0.14em] text-[#E6E1D6] sm:text-[11px] sm:tracking-[0.16em]">
              EXTREME SPORTS
              <br className="sm:hidden" /> PROMOTIONS
            </span>
          </span>
        </Link>

        {/* Desktop primary links — own flex region so socials never sit on top */}
        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 px-2 lg:flex xl:gap-1"
        >
          <NavLinks active={active} />
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Socials stay in the top row on phone; on desktop they move to the row below */}
          <div className="lg:hidden">
            <SocialLinks compact />
          </div>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#F6EFE3] transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Desktop social row — keeps icons clear of the text links at 1024 and 1280 */}
      <div className="mx-auto hidden max-w-7xl items-center justify-end px-4 pb-2 sm:px-6 lg:flex">
        <SocialLinks compact />
      </div>

      {/* Phone menu panel */}
      {open && (
        <nav
          ref={panelRef}
          id={panelId}
          aria-label="Primary (mobile)"
          className="border-t border-[#C9A96A]/25 bg-[#0E2141] lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col px-2 py-2">
            <NavLinks active={active} stacked onNavigate={close} />
          </div>
        </nav>
      )}
    </header>
  );
}
