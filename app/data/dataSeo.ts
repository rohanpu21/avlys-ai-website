import { absoluteUrl, siteConfig } from "../lib/site";
import { dataUpdatedAt } from "./dataContent";

type DataSchemaInput = {
  path: string;
  title: string;
  description: string;
  faqs: readonly { question: string; answer: string }[];
  categoryLabel?: string;
};

// Describe the service, not an owned/in-stock Dataset or a priced Product.
// FAQs come from the same records rendered visibly on each page.
export function buildDataSchema({ path, title, description, faqs, categoryLabel }: DataSchemaInput) {
  const url = absoluteUrl(path);
  const organization = { "@id": absoluteUrl("/#organization") };
  const breadcrumbs = [
    { name: "Home", item: absoluteUrl("/") },
    { name: "Avlys Data", item: absoluteUrl("/data") },
    ...(categoryLabel ? [{ name: categoryLabel, item: url }] : []),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": categoryLabel ? "CollectionPage" : "WebPage",
        "@id": `${url}#webpage`, url, name: title, description,
        inLanguage: "en", dateModified: dataUpdatedAt,
        isPartOf: { "@id": absoluteUrl("/#website") },
        publisher: organization,
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumbs` },
        hasPart: { "@id": `${url}#data-faq` },
      },
      {
        "@type": "Service", "@id": `${url}#service`, url,
        name: categoryLabel ? `Avlys ${categoryLabel.toLowerCase()} sourcing and preparation` : "Avlys Data — AI training data, collection and annotation",
        description,
        serviceType: categoryLabel ? `${categoryLabel} sourcing, preparation and annotation` : "AI training data sourcing, custom collection and annotation",
        provider: organization,
        areaServed: { "@type": "Place", name: "India and global remote delivery" },
        availableChannel: {
          "@type": "ServiceChannel", serviceUrl: absoluteUrl("/data#data-brief"),
          servicePhone: { "@type": "ContactPoint", telephone: siteConfig.phoneHref, email: siteConfig.email, contactType: "sales" },
        },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`,
        itemListElement: breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
      },
      {
        "@type": "FAQPage", "@id": `${url}#data-faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question", name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}
