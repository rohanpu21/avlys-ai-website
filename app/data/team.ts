export type TeamMember = {
  name: string;
  role: string;
  experience?: string;
  experienceNote?: string;
  detail?: string;
  bio: string;
  image?: string;
  imageClass?: string;
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    name: "Govind Jain",
    role: "Senior Software Engineer",
    experience: "B.Tech in Computer Science",
    detail: "IIT Roorkee alumnus · Class of 2023",
    experienceNote: "Senior Software Engineer at Baya Systems · 3+ years with the company",
    bio: "Govind builds backend tooling for chip-design workflows. His experience includes Python, C++, API design, CI/CD, and test automation.",
    image: "/team/govind-jain.png",
    imageClass: "!w-[171%] !h-[119%] !max-w-none !left-[-37%] !top-[-9%]",
    linkedin: "https://www.linkedin.com/in/govind-jain/",
  },
  {
    name: "Gopal Jain",
    role: "Tech Lead",
    experience: "B.Tech in Electrical Engineering",
    detail: "IIT Roorkee alumnus · Former Microsoft",
    bio: "Gopal advises on system architecture and technical decisions, connecting business strategy with reliable engineering.",
    image: "/team/gopal-jain.jpeg",
  },
  {
    name: "Gaurav Purohit",
    role: "Co-founder & Head of Sales, Avlys",
    experience: "BBA LLB",
    detail: "KIIT School of Law alumnus",
    bio: "Gaurav leads sales and partnerships, helping enterprise teams define the problem and shape a focused software engagement.",
    image: "/team/gaurav-purohit-outdoor.jpeg",
    imageClass: "!w-[300%] !h-auto !max-w-none !left-[-106%] !top-[-175%]",
    linkedin: "https://www.linkedin.com/in/gaurav-purohit-230463285",
  },
  {
    name: "Rohan Purohit",
    role: "Co-founder & Head of Product, Avlys",
    experience: "M.B.A.",
    detail: "KIIT School of Management alumnus",
    bio: "Rohan leads product strategy and design, turning operational needs into intuitive AI-native applications.",
    image: "/team/rohan-purohit.jpeg",
    linkedin: "https://www.linkedin.com/in/rohan-purohit-04860517b",
  },
  {
    name: "Aadil Ahmed Khan",
    role: "Co-founder & Product Designer, Avlys",
    experience: "B.Tech in Design",
    detail: "UI/UX & Product Design",
    bio: "Aadil designs and tests user experiences, making complex business workflows clear and practical to use.",
    image: "/team/aadil-ahmed-khan.jpeg",
    imageClass: "!w-[300%] !h-auto !max-w-none !left-[-181%] !top-[-62%]",
    linkedin: "https://www.linkedin.com/in/aadil-ahmad-khan-681272254",
  },
  {
    name: "Roshan Dharua",
    role: "Co-founder, Avlys",
    experience: "Master's in Psychology",
    detail: "Ravenshaw University alumnus",
    bio: "Roshan brings a behavioral perspective to product decisions, helping the team build systems people can readily adopt.",
    image: "/team/roshan-dharua-portrait.jpeg",
    linkedin: "https://www.linkedin.com/in/roshan-dharua-27b540234",
  },
  {
    name: "Deepak Sahu",
    role: "Co-founder & Full Stack AI Engineer, Avlys",
    experience: "B.Tech in Electronics & Communication",
    detail: "NIT Rourkela alumnus",
    bio: "Deepak builds full-stack AI systems, connecting application architecture, integrations, and reliable delivery.",
    image: "/team/deepak-sahu.png",
    imageClass: "!w-[130%] !h-auto !max-w-none !left-[-16.5%] !top-[-9.8%]",
    linkedin: "https://www.linkedin.com/in/deepak-sahu-9ab150214",
  },
];
