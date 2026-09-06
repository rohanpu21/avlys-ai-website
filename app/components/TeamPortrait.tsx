import Image from "next/image";
import type { TeamMember } from "../data/team";

export default function TeamPortrait({ person }: { person: TeamMember }) {
  return (
    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-parchment">
      {person.image ? (
        <Image src={person.image} alt={`Portrait of ${person.name}`} width={384} height={384} sizes="384px" className={`absolute inset-0 h-full w-full object-cover ${person.imageClass ?? ""}`} />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[28px] font-semibold text-ink" aria-label={`${person.name}, portrait not yet available`}>
          {person.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
        </div>
      )}
    </div>
  );
}
