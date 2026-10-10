import type { Metadata } from "next";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

const title = "Promotions";
const description = "For club owners and coaches: how we'll put your club in front of more people, together.";

export const metadata: Metadata = {
  title: `${title} | Extreme Sports Promotions`,
  description,
  alternates: { canonical: "/promotions" },
  openGraph: { title: `${title} | Extreme Sports Promotions`, description, type: "website", url: "/promotions" },
};

const card = "rounded-[14px] border border-[#2a2a3a] bg-[#14141c] p-6";
const section = "border-b border-[#2a2a3a] py-12";
const wrap = "mx-auto max-w-[1000px] px-6";
const h2 = "mb-5 text-[1.75rem] font-bold leading-tight text-white sm:text-[2rem]";
const p = "mb-3.5 text-white";
const grid = "mt-6 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]";

function Card({ heading, body }: { heading: string; body: string }) {
  return (
    <div className={card}>
      <h3 className="mb-1.5 font-semibold text-white">{heading}</h3>
      <p className="text-white">{body}</p>
    </div>
  );
}

export default function PromotionsPage() {
  return (
    <>
      <TopBar active="promotions" />
      <main id="main" className="flex-1 bg-[#0a0a0f] leading-relaxed text-white">
        <header className="border-b border-[#2a2a3a] pt-12 pb-10 text-center">
          <div className={wrap}>
            <Image
              src="/promotions/esp-logo-silver.png"
              alt="ESP Extreme Sports Promotions logo"
              width={682}
              height={542}
              priority
              sizes="300px"
              className="mx-auto mb-6 block h-auto w-4/5 max-w-[300px]"
            />
            <p className="mb-4 inline-block rounded-full bg-[#c0c0c0] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[1.5px] text-black">
              For club owners and coaches
            </p>
            <h1 className="mb-3 text-[2.5rem] font-extrabold leading-tight text-white sm:text-5xl">Promotions</h1>
            <p className="mx-auto max-w-[650px] text-lg text-white sm:text-[1.2rem]">
              How we&apos;ll put your club in front of more people, together.
            </p>
          </div>
        </header>

        <section className={section}>
          <div className={wrap}>
            <h2 className={h2}>Our vision</h2>
            <p className={p}>
              We want to turn the UK extreme sports scene into a connected, highly visible community. Not just clubs
              posting now and then, but a living network of clubs, coaches and students in short, high-quality episodes
              people actually want to watch.
            </p>
            <p className={p}>
              The goal is simple: more people discovering your club, more students through your door, and a stronger
              presence online for all of us.
            </p>
          </div>
        </section>

        <section className={section}>
          <div className={wrap}>
            <h2 className={h2}>What your club gets now</h2>
            <div className={grid}>
              <Card
                heading="Your club on YouTube"
                body="I visit your club, train with your coaches and film a short review episode for the ESP series. We tag you, so viewers can find you."
              />
              <Card
                heading="Students sent your way"
                body="People come to ESP looking for training. When your club is the right fit, we send them to you."
              />
            </div>
          </div>
        </section>

        <section className={section}>
          <div className={wrap}>
            <h2 className={h2}>Next: club vs club challenges</h2>
            <p className={p}>
              Friendly competition makes great videos. We organise episodes with several clubs, built around real
              challenges, light rivalry and fun.
            </p>
            <div className={grid}>
              <Card heading="Real rivalry" body="Clubs compete on camera. Viewers pick sides." />
              <Card heading="Entertainment first" body="Short, punchy episodes people finish and share." />
              <Card heading="Everyone wins" body="Every club gets exposure and content." />
            </div>
            <p className="mt-6 font-semibold text-white">
              Safety first. Every challenge runs within your club&apos;s own safety rules, with your qualified coaches.
            </p>
          </div>
        </section>

        <section className={section}>
          <div className={wrap}>
            <h2 className={h2}>Videographers and splitting the bill</h2>
            <p className={p}>
              We organise professional videographers. Several clubs share one shoot, so each pays a share. We&apos;ll
              quote each shoot up front.
            </p>
            <p className="mt-6 mb-3.5 font-semibold text-white">Typical UK videographer rates (2026):</p>
            <div className="overflow-x-auto rounded-[14px] border border-[#2a2a3a] bg-[#14141c]">
              <table className="w-full border-collapse text-left text-white">
                <thead>
                  <tr className="border-b border-[#2a2a3a]">
                    <th scope="col" className="px-5 py-3 font-semibold">Filming day rate</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Typical UK range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#2a2a3a]">
                    <td className="px-5 py-3">Mid-level</td>
                    <td className="px-5 py-3">£400 to £750</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">Experienced</td>
                    <td className="px-5 py-3">£750 to £1,400</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 mb-3.5 text-white">Editing a short episode: £250 to £700.</p>
            <p className={p}>
              Rates usually cover labour only. Kit and travel can be extra.
            </p>
          </div>
        </section>

        <section className={section}>
          <div className={wrap}>
            <h2 className={h2}>Building the network together</h2>
            <ul className="my-4 ml-5 list-disc space-y-1 text-white">
              <li>Tagging each other sends viewers between clubs.</li>
              <li>Shared episodes get more views.</li>
              <li>We get to know you and your coaches personally.</li>
            </ul>
          </div>
        </section>

        <section className={section}>
          <div className={wrap}>
            <h2 className={h2}>The 2028 season plan</h2>
            <p className={p}>From 2028 we&apos;ll make at least 15 episodes a year across our sports.</p>
            <div className={grid}>
              <Card
                heading="2027 is our groundwork year."
                body="I'll visit and review clubs across the UK, meet coaches and learn how each venue runs. That way the 2028 episodes are properly planned, not rushed. Clubs can still make short videos with us now."
              />
              <Card
                heading="One headquarters per sport."
                body="Each sport gets one club or venue as its base. Coaches and owners meet there to plan episodes, agree challenges and set the calendar. One base keeps it simple and builds a stronger local network."
              />
              <Card
                heading="Filmed in season."
                body="Episodes are timed to each sport's natural season, when conditions and energy are at their best. That gives clubs and viewers a steady stream of content all year."
              />
            </div>
          </div>
        </section>

        <div className="px-6 py-16 text-center sm:py-[70px]">
          <h2 className={h2}>Ready to be in the next episode?</h2>
          <a
            href="mailto:enquiries@extremesportspromotions.com"
            className="mt-3 inline-block rounded-full bg-[#c0c0c0] px-8 py-3.5 font-bold text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get in touch
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
