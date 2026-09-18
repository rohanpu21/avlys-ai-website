import Image from "next/image";
import { officePhotos } from "../data/office";

type OfficePhotoProps = {
  photo: keyof typeof officePhotos;
  caption?: string;
  className?: string;
  portrait?: boolean;
  preload?: boolean;
  sizes?: string;
};

export default function OfficePhoto({
  photo,
  caption,
  className = "",
  portrait = false,
  preload = false,
  sizes = "(min-width: 1200px) 560px, (min-width: 768px) 50vw, calc(100vw - 48px)",
}: OfficePhotoProps) {
  const image = officePhotos[photo];

  return (
    <figure className={`min-w-0 ${className}`}>
      <div className={`relative overflow-hidden bg-parchment ${portrait ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        <Image src={image.src} alt={image.alt} fill preload={preload} sizes={sizes} className="object-cover" style={{ objectPosition: image.position }} />
      </div>
      {caption && <figcaption className="mt-3 text-[12px] leading-relaxed text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}
