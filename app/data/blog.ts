export type BlogSource = {
  name: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedDate: string;
  updatedDate?: string;
  // Markdown body rendered with react-markdown + remark-gfm.
  body: string;
  sources?: BlogSource[];
};

export const blogPosts: BlogPost[] = [];

export const getBlogPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
