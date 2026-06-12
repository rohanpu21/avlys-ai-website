export type BlogFAQ = {
  question: string;
  answer: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogCategory =
  | "Web Development"
  | "E-Commerce Development"
  | "Agentic AI"
  | "Deep Tech AI"
  | "Landing Page Design"
  | "Enterprise AI Agents";

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: BlogCategory;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  takeaways: string[];
  intro: string[];
  sections: BlogSection[];
  faqs: BlogFAQ[];
  relatedServiceSlugs: string[];
};
