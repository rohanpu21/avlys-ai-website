import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { absoluteUrl, siteConfig } from "../lib/site";

const PRIVACY_UPDATED = siteConfig.privacyUpdated;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Avlys AI collects, uses, and protects personal data from its website, booking calendar, and enquiry forms, and how to exercise your rights.",
  alternates: {
    canonical: "/privacy",
  },
};

const privacyUrl = absoluteUrl("/privacy");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${privacyUrl}#webpage`,
  url: privacyUrl,
  name: "Avlys AI Privacy Policy",
  dateModified: PRIVACY_UPDATED,
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  inLanguage: "en-US",
};

const updatedLabel = new Date(PRIVACY_UPDATED).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// paragraphs render above the list, closing paragraphs below it.
type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  closing?: string[];
};

// Keep this list in step with what the site actually loads. If a tracking
// tool or processor is added or removed, update the matching section here.
const sections: Section[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    paragraphs: [
      `${siteConfig.name} ("Avlys", "we", "us") is a software product studio based in Kondapur, Hyderabad, Telangana, India. We decide how and why the personal data described here is processed, which makes us the Data Fiduciary under India's Digital Personal Data Protection Act, 2023.`,
      "This policy covers avlysai.com, our booking calendar, and the enquiry forms we run, including lead forms in our ads on Facebook and Instagram. It does not cover the software we build for clients. That work is governed by each client contract.",
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    paragraphs: ["Information you give us:"],
    items: [
      "Enquiry form: your name, email address, phone number (optional), company, the type of project, and the message you write.",
      "Booking a call: the name, email address, and any notes you enter in our Cal.com scheduling page.",
      "Ad lead forms: if you reply to one of our ads on Facebook or Instagram, the details you choose to submit, such as your name, phone number, work email, company, and your answers to our questions.",
      "Direct contact: anything you send us by email, phone, WhatsApp, or LinkedIn.",
    ],
  },
  {
    id: "collected-automatically",
    title: "What is collected automatically",
    paragraphs: [
      "When you browse the site, we record the pages you view, the links and buttons you click, your browser and device type, an approximate location derived from your IP address, the site that referred you, and campaign tags in the link you followed (for example utm_source).",
      "We do not record your screen. Our analytics is set up so that it does not capture the text you type into forms.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use it",
    items: [
      "To reply to your enquiry, schedule and hold calls, and prepare a proposal you asked for.",
      "To run and secure the website, including blocking spam submissions.",
      "To understand which pages and campaigns bring visitors, so we can improve the site and our advertising.",
      "To meet legal, tax, and accounting obligations once we work together.",
    ],
    closing: [
      "We process the details you submit on the basis of your consent, which you give by sending them to us. You can withdraw consent at any time (see Your rights). We do not sell personal data.",
    ],
  },
  {
    id: "service-providers",
    title: "Who we share it with",
    paragraphs: [
      "We use these service providers to run the site and our sales process. They process data on our behalf, and some of them store it outside India, including in the United States:",
    ],
    items: [
      "Vercel: website hosting.",
      "Supabase: storage of enquiry form submissions.",
      "Cal.com: meeting scheduling.",
      "PostHog: website analytics.",
      "Google (Tag Manager and related analytics tags): website measurement.",
      "Meta (Facebook, Instagram, WhatsApp): our ads, lead forms, and WhatsApp conversations when you choose to use them, and the Meta Pixel if you allow ad measurement.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    paragraphs: [
      "Our analytics tools set cookies or use your browser's local storage to recognise repeat visits. We also keep the campaign tags from your first page in session storage, which clears when you close the tab, so a booking can be credited to the right campaign.",
      "Ad measurement (Meta Pixel): we load it only if you choose Allow in the Ad measurement notice. It sets Meta cookies and tells Meta when a visitor views a page, books a call, or sends an enquiry, so we can see which Facebook and Instagram ads work. To match visits to Facebook and Instagram accounts, the pixel may also read contact details you type into forms on this site, such as your email address or phone number, and send them to Meta in hashed (scrambled) form. You can change your choice at any time with the Ad measurement settings link in the footer of every page.",
      "You can block or delete cookies in your browser settings. The site still works without them, but we will not be able to measure your visit.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    paragraphs: [
      "We keep enquiry and booking details for as long as we need them to discuss and deliver your project, and afterwards only where the law requires it, for example for tax records. If you ask us to delete your data and we have no legal reason to keep it, we will delete it.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: [
      "Under the Digital Personal Data Protection Act, 2023, you can ask us to:",
    ],
    items: [
      "Give you a summary of the personal data we hold about you and how we use it.",
      "Correct, complete, or update it.",
      "Erase it.",
      "Stop processing it, by withdrawing your consent.",
      "Nominate another person to exercise these rights for you if you die or become unable to act.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "Data is sent over HTTPS. Access to enquiry records is limited to the people at Avlys who handle sales and delivery. No system is perfectly secure. If a breach affects your data, we will notify you and the Data Protection Board of India as the law requires.",
    ],
  },
  {
    id: "children",
    title: "Children",
    paragraphs: [
      "Our services are for businesses. We do not knowingly collect personal data from anyone under 18.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "If we change how we handle personal data, we will update this page and the date at the top.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="bg-canvas px-6 pb-12 pt-20 sm:pt-24">
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="type-hero text-ink">Privacy Policy</h1>
            <p className="type-lead mt-6 text-ink-muted">
              What we collect when you visit our site, book a call, or send us
              an enquiry, and what you can ask us to do with it.
            </p>
            <p className="type-fine-print mt-6 text-ink-faint">
              Last updated <time dateTime={PRIVACY_UPDATED}>{updatedLabel}</time>
            </p>
          </div>
        </section>

        <section className="bg-parchment px-6 py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-3xl gap-12">
            {sections.map((section) => (
              <article key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2 id={`${section.id}-heading`} className="text-[24px] font-semibold tracking-tight text-ink">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-[17px] leading-[1.6] text-ink-muted">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-4 grid list-disc gap-2 pl-6 text-[17px] leading-[1.6] text-ink-muted">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.closing?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-[17px] leading-[1.6] text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}

            <article id="contact" aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-[24px] font-semibold tracking-tight text-ink">
                Contact and grievances
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-ink-muted">
                To exercise your rights, ask a question, or raise a complaint
                about how we handle your data, email{" "}
                <a href={`mailto:${siteConfig.email}?subject=Privacy%20request`} className="font-semibold text-primary underline">
                  {siteConfig.email}
                </a>{" "}
                with &ldquo;Privacy request&rdquo; in the subject, or call{" "}
                <a href={`tel:${siteConfig.phoneHref}`} className="font-semibold text-primary underline">
                  {siteConfig.phone}
                </a>
                . Postal address: Avlys AI, Kondapur, Hyderabad, Telangana,
                India.
              </p>
              <p className="mt-4 text-[17px] leading-[1.6] text-ink-muted">
                If we do not resolve your complaint, you can take it to the Data
                Protection Board of India.
              </p>
              <p className="mt-8 text-[17px] text-ink-muted">
                <Link href="/contact" className="text-primary">
                  Back to contact <span aria-hidden="true">&rarr;</span>
                </Link>
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
