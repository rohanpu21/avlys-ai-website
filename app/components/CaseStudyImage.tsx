import Image from "next/image";

type CaseStudyImageProps = {
  slug: string;
  title: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  variant?: "cover" | "system";
  coverImage?: string;
};

const CaseStudyImage = ({
  slug,
  title,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  variant = "cover",
  coverImage,
}: CaseStudyImageProps) => {
  const query = variant === "cover" ? "" : `?variant=${variant}`;
  const src = coverImage ?? `/case-studies/${slug}/opengraph-image${query}`;

  return (
    <div
      className={`relative aspect-[1200/630] overflow-hidden bg-parchment ${className}`}
    >
      <Image
        src={src}
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
