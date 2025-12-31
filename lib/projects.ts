export interface Project {
  slug: string
  title: string
  medium: string
  description: string
  span: string
  image?: string
  github?: string
  behance?: string
  website?: string
}

export const projects: Project[] = [
  {
    slug: "project-lattice",
    title: "Project Lattice",
    medium: "Interface Study",
    description: "Structural framework for adaptive layouts in dynamic content systems.",
    span: "col-span-2 row-span-2",
    image: "/abstract-minimal-interface.jpg",
    github: "https://github.com/example/project-lattice",
    behance: "https://www.behance.net/gallery/project-lattice",
    website: "https://project-lattice.example.com",
  },
  {
    slug: "signal-field",
    title: "Signal Field",
    medium: "Agent Orchestration",
    description: "Autonomous coordination layer for multi-agent environments.",
    span: "col-span-1 row-span-1",
    image: "/tech-platform-interface.jpg",
    github: "https://github.com/example/signal-field",
    behance: "https://www.behance.net/gallery/signal-field",
    website: "https://signal-field.example.com",
  },
  {
    slug: "silent-agent",
    title: "Silent Agent",
    medium: "Visual System",
    description: "Non-intrusive interface patterns for ambient computing.",
    span: "col-span-1 row-span-2",
    image: "/product-design-interface.jpg",
    github: "https://github.com/example/silent-agent",
    behance: "https://www.behance.net/gallery/silent-agent",
    website: "https://silent-agent.example.com",
  },
  {
    slug: "noir-grid",
    title: "Noir Grid",
    medium: "Typography",
    description: "High-contrast typographic system for editorial interfaces.",
    span: "col-span-1 row-span-1",
    image: "/modern-urban-design-project.jpg",
    github: "https://github.com/example/noir-grid",
    behance: "https://www.behance.net/gallery/noir-grid",
    website: "https://noir-grid.example.com",
  },
  {
    slug: "echo-chamber",
    title: "Echo Chamber",
    medium: "Audio-Visual",
    description: "Generative soundscapes mapped to interface interactions.",
    span: "col-span-2 row-span-1",
    image: "/abstract-minimal-interface.jpg",
    github: "https://github.com/example/echo-chamber",
    behance: "https://www.behance.net/gallery/echo-chamber",
    website: "https://echo-chamber.example.com",
  },
  {
    slug: "void-protocol",
    title: "Void Protocol",
    medium: "Experimental",
    description: "Negative space as primary interaction medium.",
    span: "col-span-1 row-span-1",
    image: "/tech-platform-interface.jpg",
    github: "https://github.com/example/void-protocol",
    behance: "https://www.behance.net/gallery/void-protocol",
    website: "https://void-protocol.example.com",
  },
]

