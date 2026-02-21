import {
  Target,
  Palette,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: Target,
    name: "Strategy",
    description: "Before campaigns, before content, before ads — we define direction. We bring structure to ambition.",
    href: "/services#service-strategy",
    cta: "Explore Strategy",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
        alt="Strategy"
      />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Palette,
    name: "Creative",
    description: "Creativity is not decoration. It’s how your brand is experienced. Ideas that carry intent.",
    href: "/services#service-creative",
    cta: "Explore Creative",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop"
        alt="Creative"
      />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: TrendingUp,
    name: "Growth",
    description: "Measured. Scalable. Sustainable. We focus on outcomes — leads, conversions, authority, and long-term brand strength.",
    href: "/services#service-growth",
    cta: "Explore Growth",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop"
        alt="Growth"
      />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Trophy,
    name: "Competitive Sporting Ecosystems",
    description: "And One More Thing. Beyond strategy, creativity, and growth systems — we operate inside competitive sporting ecosystems. We build and amplify leagues, championships, athlete positioning, sponsorship decks, and event amplification systems. When the environment demands adrenaline and precision — we deliver both.",
    href: "/services#service-sports",
    cta: "Explore Sporting Ecosystems",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop"
        alt="Competitive Sporting Ecosystems"
      />
    ),
    className: "lg:col-span-3 lg:row-span-1",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-white text-black dark:bg-black dark:text-white overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Strategy. Creative. Growth. And one more — four disciplines working as one integrated system.
          </p>
        </div>
        <BentoGrid>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}