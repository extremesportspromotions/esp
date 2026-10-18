import Link from "next/link";

type Props = { href: string; title: string; step: number; stepCount: number };

/** Short "part of the hub" line shown near the top of every guide listed in a sport hub. */
export default function HubBanner({ href, title, step, stepCount }: Props) {
  return (
    <Link
      href={href}
      className="mb-8 flex max-w-[70ch] items-center justify-between gap-4 rounded-2xl border border-[#1C1917]/10 bg-surface px-5 py-4 transition hover:border-[#1C1917]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
          Step {step} of {stepCount}
        </span>
        <span className="mt-0.5 block font-semibold leading-snug text-[#1C1917]">Part of {title}</span>
      </span>
      <span className="shrink-0 text-sm font-semibold text-accent-soft">See every step →</span>
    </Link>
  );
}
