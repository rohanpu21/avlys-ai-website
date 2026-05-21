import Image from "next/image";

type CaseStudyImageProps = {
  slug: string;
  title: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  variant?: "cover" | "system";
};

const CaseStudyImage = ({
  slug,
  title,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  variant = "cover",
}: CaseStudyImageProps) => {
  const query = variant === "cover" ? "" : `?variant=${variant}`;

  return (
    <div
      className={`relative aspect-[1200/630] overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-subtle)] ${className}`}
    >
      <Image
        src={`/case-studies/${slug}/opengraph-image${query}`}
        alt={`${title} case study visual`}
        width={1200}
        height={630}
        sizes={sizes}
        priority={priority}
        unoptimized
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
      />
    </div>
  );
};

export default CaseStudyImage;
