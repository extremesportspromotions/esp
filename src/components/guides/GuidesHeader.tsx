import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  image?: { src: string; alt: string; position?: string };
  children?: React.ReactNode;
  /** Smaller title, for hub pages with long titles. */
  compact?: boolean;
};

/**
 * Hero header shared by /guides and the per-sport hub pages.
 * With a photo: the photo shows at full strength (no pale wash). On phones it sits
 * above the text; from sm up the text sits on a dark bottom gradient. Text is white.
 */
export default function GuidesHeader({ eyebrow, title, tagline, intro, image, children, compact }: Props) {
  const titleSize = compact
    ? "max-w-4xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
    : "text-4xl sm:text-6xl lg:text-7xl";

  if (!image) {
    return (
      <section className="relative overflow-hidden border-b border-[#1C1917]/10 bg-[#F6EFE3]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(143,163,130,0.22),_transparent_60%),radial-gradient(ellipse_at_top_right,_rgba(201,169,106,0.18),_transparent_50%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-soft">{eyebrow}</p>
          <h1 className={`font-display mt-3 font-black text-[#1C1917] ${titleSize}`}>{title}</h1>
          {tagline ? (
            <p className="font-display mt-4 max-w-3xl text-2xl font-bold leading-tight text-[#1C1917] sm:text-3xl">{tagline}</p>
          ) : null}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#1C1917]/75 sm:text-lg">{intro}</p>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="guides-header-dark relative overflow-hidden bg-ink text-white sm:flex sm:min-h-[60vh] sm:items-end lg:min-h-[66vh]">
      <div className="relative aspect-[4/3] w-full sm:absolute sm:inset-0 sm:aspect-auto">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: image.position ?? "50% 50%" }}
        />
        {/* Phones: short fade into the dark text panel. sm+: dark bottom gradient under the text. */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink to-transparent sm:hidden" aria-hidden />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/60 to-transparent sm:block" aria-hidden />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-2 sm:px-6 sm:pb-14 sm:pt-40 lg:px-8 lg:pb-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">{eyebrow}</p>
        <h1 className={`font-display mt-3 font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] ${titleSize}`}>{title}</h1>
        {tagline ? (
          <p className="font-display mt-4 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl">{tagline}</p>
        ) : null}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white sm:text-lg">{intro}</p>
        {children}
      </div>
    </section>
  );
}
