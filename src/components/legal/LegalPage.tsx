import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import type { LegalDoc } from "@/data/legal";

const EMAIL = "enquiries@extremesportspromotions.com";
const LINKS: [RegExp, string][] = [
  [/Refund policy/, "/refunds"],
  [/enquiries@extremesportspromotions\.com/, `mailto:${EMAIL}`],
  [/ico\.org\.uk/, "https://ico.org.uk/make-a-complaint/"],
];

/** Turns known phrases into links and highlights [placeholders]. */
function Rich({ text }: { text: string }) {
  const re = /(Refund policy|enquiries@extremesportspromotions\.com|ico\.org\.uk|\[[^\]]+\])/g;
  return (
    <>
      {text.split(re).map((part, i) => {
        if (/^\[.+\]$/.test(part)) return <mark key={i} className="rounded bg-amber-100 px-1 text-[#1C1917]">{part}</mark>;
        const link = LINKS.find(([r]) => r.test(part) && part.match(r)?.[0] === part);
        if (link) return <a key={i} href={link[1]}>{part}</a>;
        return part;
      })}
    </>
  );
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <TopBar />
      <main id="main" className="flex-1 bg-[#F6EFE3]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{doc.eyebrow}</p>
          <h1 className="font-display mt-2 text-3xl font-bold text-[#1C1917] sm:text-4xl">{doc.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-[#1C1917]/75"><Rich text={doc.intro} /></p>
          <div className="guide-prose prose mt-10 [&>p:first-of-type]:!text-[1em]">
            {doc.sections.map((s) => (
              <section key={s.h}>
                <h2 id={s.id}>{s.h}</h2>
                {s.body.map((b, i) =>
                  Array.isArray(b) ? (
                    <ul key={i}>{b.map((li) => <li key={li}><Rich text={li} /></li>)}</ul>
                  ) : (
                    <p key={i} style={{ fontSize: "1em", lineHeight: "inherit", color: "inherit" }}><Rich text={b} /></p>
                  ),
                )}
              </section>
            ))}
          </div>
          <p className="mt-12 border-t border-[#1C1917]/10 pt-6 text-sm text-[#1C1917]/55">
            See also: <Link href="/terms" className="text-accent hover:underline">Terms</Link> ·{" "}
            <Link href="/privacy" className="text-accent hover:underline">Privacy</Link> ·{" "}
            <Link href="/refunds" className="text-accent hover:underline">Refund policy</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
