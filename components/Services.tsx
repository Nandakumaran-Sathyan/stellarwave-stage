import {
  Target,
  Megaphone,
  Rocket,
  Shield,
  Trophy,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: Target,
    name: "Strategic Architecture",
    description: "Strategic foundation that governs execution — positioning, audience modeling, competitive mapping, and structured growth roadmaps.",
    href: "/services#service-marketing-strategy",
    cta: "View Details",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
        alt="Marketing Strategy"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Megaphone,
    name: "Communication & Influence Systems",
    description: "Communication ecosystems that reinforce authority across digital, retail, institutional, and event environments.",
    href: "/services#service-brand-design",
    cta: "View Details",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop"
        alt="Brand Design"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Rocket,
    name: "Performance & Digital Infrastructure",
    description: "Digital performance systems that convert visibility into revenue, participation, and long-term market leverage.",
    href: "/services#service-web-development",
    cta: "View Details",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop"
        alt="Web Development"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Shield,
    name: "Authority & Market Control",
    description: "Authority ecosystems that strengthen search visibility, influence conversation, and protect brand credibility.",
    href: "/services#service-digital-marketing",
    cta: "View Details",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop"
        alt="Digital Marketing"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Trophy,
    name: "Sporting & Institutional Growth",
    description: "Building leagues, federations, championships, and sporting properties with scalable digital and commercial systems.",
    href: "/services#service-content-creation",
    cta: "View Details",
    background: (
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&auto=format&fit=crop"
        alt="Content Creation"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function Services() {
  return (
    <div id="services" className="w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Comprehensive solutions to elevate your brand and drive digital success
          </p>
        </div>
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}