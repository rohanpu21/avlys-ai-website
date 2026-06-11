// Real client testimonials only - name, role, and company are required so
// every quote is verifiable. The section does not render while this is empty.
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  link?: string;
};

export const testimonials: Testimonial[] = [];
