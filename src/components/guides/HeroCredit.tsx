import type { HeroCredit as HeroCreditData } from "@/data/guides-meta";

/** Visible credit line for a hero photo, e.g. for CC BY-SA photos from Wikimedia Commons. */
export default function HeroCredit({ credit, className = "" }: { credit: HeroCreditData; className?: string }) {
  const link =
    "relative z-10 underline underline-offset-2 hover:text-[#1C1917] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  return (
    <p className={`text-xs leading-snug text-[#1C1917]/70 ${className}`}>
      Photo: &ldquo;{credit.title}&rdquo; by {credit.author}
      {credit.cropped ? ", cropped" : ""},{" "}
      <a href={credit.licenceUrl} target="_blank" rel="noopener noreferrer license" className={link}>
        {credit.licence}
      </a>
      , via{" "}
      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className={link}>
        {credit.source}
      </a>
    </p>
  );
}
