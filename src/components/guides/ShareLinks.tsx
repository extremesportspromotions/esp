"use client";

import { useState } from "react";
import { FacebookIcon, XIcon } from "@/components/SocialIcons";

const btn =
  "inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white/85 transition hover:border-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Share</span>
      <a
        className={btn}
        href={`https://x.com/intent/post?text=${enc(title)}&url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (opens in a new tab)"
      >
        <XIcon width={16} height={16} />X
      </a>
      <a
        className={btn}
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook (opens in a new tab)"
      >
        <FacebookIcon width={16} height={16} />
        Facebook
      </a>
      <button type="button" onClick={copy} className={btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
