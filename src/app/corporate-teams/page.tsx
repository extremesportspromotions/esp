import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Corporate and Teams Programmes | Extreme Sports Promotions",
  description:
    "Team days and weekends in UK extreme sports with qualified, insured clubs and coaches. £99 match fee per group of up to 5 people.",
  alternates: { canonical: "/corporate-teams" },
};

const ENQUIRE = "/?type=corporate#enquire";

export default function CorporateTeamsPage() {
  return (
    <>
      <TopBar />
      <main id="main" className="flex-1 bg-[#F6EFE3]">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Corporate and Teams</p>
          <h1 className="font-display mt-2 text-3xl font-bold text-[#1C1917] sm:text-4xl">Corporate and Teams Programmes</h1>
          <p className="mt-4 text-lg font-semibold text-[#1C1917]">We organise. The club delivers.</p>
          <div className="guide-prose prose mt-8">
            <p>Take your team off the spreadsheet and onto the water, the mountain or the trail. Extreme Sports Promotions sets up single weekdays, team away days and weekends in UK extreme sports with qualified, insured clubs and coaches. You turn up, the club gets you going, and everyone goes home with a story.</p>

            <h2>Who it&apos;s for</h2>
            <ul>
              <li><strong>Companies:</strong> team building, away days, rewards and client days</li>
              <li><strong>Sports teams:</strong> pre-season bonding and something different from the usual training</li>
              <li><strong>Stag and hen groups:</strong> a weekend people will actually talk about</li>
              <li><strong>Charities:</strong> challenge events and supporter days</li>
            </ul>

            <h2>Why it works</h2>
            <p>There&apos;s nothing like watching your finance lead drop into a wave for the first time, or cheering your goalkeeper down a fast descent. Shared nerves, shared laughs, shared wins. Teams come back closer, braver and full of stories for months. We handle the organising, so all you have to do is show up and go for it.</p>

            <h2>How it works</h2>
            <ol>
              <li><strong>Tell us about your group.</strong> Numbers, whether you want a weekday, an away day or a weekend, dates, location, the sport you fancy and how adventurous you&apos;re feeling.</li>
              <li><strong>We match you with a club.</strong> We find a qualified UK club ready for your group, confirm coaches and ratios, and prepare the venue and timings.</li>
              <li><strong>You book the club.</strong> You book and pay the club directly, so you know exactly what you&apos;re paying for.</li>
              <li><strong>The club delivers.</strong> You arrive, kit up and get stuck in. We&apos;re your one point of contact from start to finish.</li>
            </ol>

            <h2>What our match fee covers</h2>
          </div>
          <div className="mt-4 rounded-2xl border border-accent/30 bg-white p-5 shadow-sm sm:p-6">
            <p className="font-display text-2xl font-bold text-[#1C1917]">£99 <span className="text-base font-semibold text-[#1C1917]/70">per group of up to 5 people</span></p>
            <p className="mt-2 text-[#1C1917]/80">Bigger team? It&apos;s £99 for each group of up to 5, so a team of 10 is £198 and a team of 12 is £297.</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-[#1C1917]/80">
              <li>Finding and checking the right club for your group and sport</li>
              <li>Checking the club&apos;s and coaches&apos; qualifications, insurance and references before we introduce you, and confirming the right coach-to-participant ratios</li>
              <li>Agreeing dates and timings</li>
              <li>Preparing the venue and the plan for the day</li>
              <li>One point of contact from first enquiry to the day itself</li>
            </ul>
            <p className="mt-4 text-sm text-[#1C1917]/70">We do these checks for you. That checking is part of what the match fee pays for.</p>
          </div>

          <div className="guide-prose prose mt-10">
            <h2>Example: a weekend for a team of 5</h2>
            <p><em>This is an illustrative example only. Real prices depend on the sport, the club, the location and the dates.</em></p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[340px] border-collapse text-left text-sm text-[#1C1917]">
              <thead>
                <tr className="border-b border-[#1C1917]/20">
                  <th className="py-2 pr-3">Item</th><th className="py-2 pr-3">Who you pay</th><th className="py-2">Example cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#1C1917]/10"><td className="py-2 pr-3">ESP match fee (1 group of up to 5)</td><td className="py-2 pr-3">ESP</td><td className="py-2">£99</td></tr>
                <tr className="border-b border-[#1C1917]/10"><td className="py-2 pr-3">Club activity, two days</td><td className="py-2 pr-3">The club, directly</td><td className="py-2">£1,000</td></tr>
                <tr className="border-b border-[#1C1917]/10"><td className="py-2 pr-3">Hotel, 5 rooms x 2 nights at £80–£110 per room per night</td><td className="py-2 pr-3">The hotel or booking site, directly</td><td className="py-2">£800–£1,100</td></tr>
                <tr><td className="py-2 pr-3 font-bold">Example total</td><td /><td className="py-2 font-bold">£1,899–£2,199</td></tr>
              </tbody>
            </table>
          </div>
          <div className="guide-prose prose mt-4">
            <p>Your hotel is booked separately by you, at the hotel&apos;s normal price. We don&apos;t sell activities and accommodation together as one package.</p>

            <h2>Optional extras</h2>
            <h3>Your team film</h3>
            <p>Make the weekend last. A professional videographer films your day and edits it into a short film of your team in action, ready for your website, social channels or the next all-hands. We help with ideas, a simple script and sharing the finished film. Prices are quoted for each project; a short film is typically from £2,000.</p>
          </div>
          <section aria-label="Places to stay" className="mt-6 rounded-2xl border border-[#1C1917]/15 bg-[#EDE4D3] p-5 sm:p-6">
            <h3 className="font-display text-xl font-bold text-[#1C1917]">Places to stay</h3>
            <p className="mt-1 text-sm font-semibold text-[#1C1917]/70">Not included in the £99 match fee.</p>
            <p className="mt-3 text-[#1C1917]/80">We can point you to hotels near the venue through Holiday Inn (IHG) and Booking.com. You book and pay the hotel directly at its normal price.</p>
            <p className="mt-3 text-sm text-[#1C1917]/70">Once your club and dates are confirmed, we can send a short list of nearby hotels. We may earn a small commission if you book through those links.</p>
          </section>
          <div className="guide-prose prose mt-6">
            <h3>Insurance</h3>
            <p>The clubs we work with carry their own insurance. Participants may want to check their own personal accident or travel cover before the day. We don&apos;t give insurance advice. If you&apos;d like to look into cover, please go to the insurer&apos;s own website.</p>

            <h2>Safety</h2>
            <p>Every activity is delivered by the club, under its own insurance and qualifications, with qualified coaches at the right ratios for your group.</p>

            <h2>Ready to get your team out there?</h2>
            <p>Tell us about your group and we&apos;ll come back to you with a club, dates and a plan.</p>
          </div>
          <Link href={ENQUIRE} className="mt-6 inline-block w-full rounded-full bg-accent px-6 py-3 text-center font-semibold text-white shadow-md shadow-accent/20 hover:opacity-90 sm:w-auto">
            Send us an enquiry
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
