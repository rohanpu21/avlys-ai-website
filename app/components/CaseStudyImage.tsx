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
  const isArchitecture = coverImage?.includes("/architecture/");

  return (
    <div
      className={`relative ${isArchitecture ? "aspect-[3/2] bg-white" : "aspect-[1200/630] bg-parchment"} overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={`${title} ${isArchitecture ? "layered architecture diagram" : "case study visual"}`}
        fill
        sizes={sizes}
        preload={priority}
        unoptimized={!coverImage}
        className={isArchitecture ? "object-contain" : "object-cover transition-transform duration-500 group-hover:scale-[1.015]"}
      />
    </div>
  );
};

export default CaseStudyImage;
