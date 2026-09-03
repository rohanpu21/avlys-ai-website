import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StructuredData from "./components/StructuredData";
import "./globals.css";
import { absoluteUrl, siteConfig } from "./lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  manifest: "/site.webmanifest",
  title: {
    default: "Enterprise AI Development & Custom Software Company | Avlys AI",
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
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Enterprise AI Development & Custom Software Company | Avlys AI",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Development & Custom Software Company | Avlys AI",
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
        { "@type": "Country", name: "United States" },
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
        "Enterprise AI development",
        "AI integration services",
        "Custom software development",
        "AI agent development",
        "AI automation services",
        "AI consulting",
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
      inLanguage: "en-US",
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-canvas text-ink" suppressHydrationWarning>
        <StructuredData data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
