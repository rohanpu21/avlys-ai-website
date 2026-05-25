import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StructuredData from "./components/StructuredData";
import "./globals.css";
import { absoluteUrl, siteConfig } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  manifest: "/site.webmanifest",
  title: {
    default: "Avlys AI | AI Automation Agency India",
    template: "%s | Avlys AI",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/avlys-icon.svg", type: "image/svg+xml" },
      { url: "/avlys-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/avlys-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Avlys AI | AI Automation Agency India",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: "Avlys AI | AI Automation Agency India",
    description: siteConfig.description,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/avlys-icon-512.png"),
      image: absoluteUrl("/avlys-logo.png"),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      sameAs: siteConfig.socialLinks,
      description: siteConfig.description,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#professional-service`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/avlys-icon-512.png"),
      image: absoluteUrl("/avlys-logo.png"),
      email: siteConfig.email,
      telephone: siteConfig.phone,
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Place", name: "Global remote delivery" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
      serviceType: [
        "AI automation agency",
        "AI calling agents",
        "WhatsApp AI chatbots",
        "AI customer support automation",
        "Lead qualification AI agents",
        "Custom software development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <StructuredData data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
