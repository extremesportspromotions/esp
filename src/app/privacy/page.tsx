import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { ENQUIRY_EMAIL } from "@/lib/site";

const title = "Privacy notice";
const description =
  "How Extreme Sports Promotions (ESP) uses the details you send through our enquiry form, who sees them, how long we keep them and your rights.";

export const metadata: Metadata = {
  title: `${title} | Extreme Sports Promotions`,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: `${title} | Extreme Sports Promotions`, description, type: "website", url: "/privacy" },
};

function Mail() {
  return <a href={`mailto:${ENQUIRY_EMAIL}?subject=Privacy%20request`}>{ENQUIRY_EMAIL}</a>;
}

export default function PrivacyPage() {
  return (
    <>
      <TopBar />
      <main id="main" className="flex-1 bg-ink">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p
            role="note"
            className="mb-8 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white"
          >
            Draft — awaiting review by ESP
          </p>

          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Your privacy</p>
          <h1 className="font-display mt-2 text-3xl font-bold text-white sm:text-4xl">Privacy notice</h1>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            This notice explains what happens to the details you send us through the enquiry form on
            this website. We keep it simple: we only use your details to reply to you and help match
            you with a coach.
          </p>

          <div className="guide-prose prose prose-invert mt-10">
            <h2>Who we are</h2>
            <p>
              Extreme Sports Promotions (&ldquo;ESP&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) matches
              people in the UK with professional extreme-sports coaches. We are responsible for the
              personal details you send us. You can contact us about anything in this notice at{" "}
              <Mail />.
            </p>

            <h2>What the enquiry form collects</h2>
            <ul>
              <li>your name and email address;</li>
              <li>the sport you&apos;re interested in, your level and your goal;</li>
              <li>your age band;</li>
              <li>
                any injuries or health conditions you choose to tell us about (this is optional);
              </li>
              <li>your town or city and how far you&apos;ll travel;</li>
              <li>the type of booking (for example solo, group or party);</li>
              <li>that you&apos;ve confirmed you understand the risks of the sport;</li>
              <li>the web page the enquiry was sent from.</li>
            </ul>

            <h2>Why we use it</h2>
            <p>
              We use your details only to reply to your enquiry and to find and introduce you to a
              suitable coach, because you&apos;ve asked us to. If you tell us about an injury or health
              condition, we use it only to help find a coach who can teach you safely, and you can ask
              us to delete it at any time.
            </p>

            <h2>How your enquiry reaches us</h2>
            <p>
              When you press &ldquo;Send enquiry&rdquo;, your answers are passed to{" "}
              <a href="https://formsubmit.co" rel="noopener noreferrer">FormSubmit</a> (formsubmit.co),
              a form service that emails them to our inbox. FormSubmit acts as a processor on our
              behalf; it says it keeps a copy of form submissions for up to 30 days. Our email is
              provided by Google (Gmail). These services may store data outside the UK.
            </p>
            <p>
              <strong>We never sell your details</strong>, and we don&apos;t use them for marketing.
            </p>

            <h2>Who we share it with</h2>
            <p>
              Only a coach we&apos;re introducing you to, and only with your agreement. We&apos;ll check
              with you before passing on your details, and we&apos;ll share only what the coach needs
              to get in touch and plan your session. We don&apos;t share your details with anyone else
              unless the law requires us to.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep your enquiry for up to 12 months after your last contact with us, then delete
              it. You can ask us to delete it sooner at any time.
            </p>
            <p className="text-sm text-white/55">
              [For ESP to confirm: the 12-month retention period above is a suggestion.]
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask us for a copy of the details we hold about you, ask us to correct them, or
              ask us to delete them. Just email <Mail /> and tell us what you&apos;d like. We&apos;ll
              reply within one month.
            </p>

            <h2>Complaints</h2>
            <p>
              If you&apos;re unhappy with how we&apos;ve handled your details, please tell us first so
              we can put it right. You also have the right to complain to the Information
              Commissioner&apos;s Office (ICO), the UK&apos;s data protection regulator, at{" "}
              <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer">ico.org.uk</a>.
            </p>
          </div>

          <p className="mt-12 border-t border-white/10 pt-6 text-sm text-white/55">
            <Link href="/#enquire" className="font-semibold text-accent underline-offset-2 hover:underline">
              Back to the enquiry form
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
