import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  image?: { src: string; alt: string; position?: string };
  children?: React.ReactNode;
};

/** Hero header shared by /guides and the per-sport hub pages. */
export default function GuidesHeader({ eyebrow, title, tagline, intro, image, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" aria-hidden />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,16,46,0.18),_transparent_60%),radial-gradient(ellipse_at_top_right,_rgba(26,58,107,0.4),_transparent_50%)]"
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-soft">{eyebrow}</p>
        <h1 className="font-display mt-3 text-4xl font-black text-white sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="font-display mt-4 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl">
          {tagline}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{intro}</p>
        {children}
      </div>
    </section>
  );
}
