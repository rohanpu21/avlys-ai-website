import { testimonials } from "../data/testimonials";
import Reveal from "./Reveal";

const Testimonials = () => {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-canvas px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="type-display-lg text-ink">What clients say.</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Reveal key={`${testimonial.name}-${testimonial.company}`}>
              <figure className="flex h-full flex-col rounded-[18px] border border-hairline p-6">
                <blockquote className="flex-1 text-[17px] leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <p className="type-caption-strong text-ink">{testimonial.name}</p>
                  <p className="type-caption text-ink-faint">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
