export interface Service {
    id: string;
    imageUrl: string;
    name: string;
    tagline: string;
    fullDescription: string;
    features: string[];
    technologies: string[];
}

/* The Stellar Wave disciplines — full copy. The Services page presents these
   through the five lifecycle stages (lifecycleData.ts) and shows the complete
   detail in ServiceDetailDrawer. */
export const servicesData: Service[] = [
    {
        id: "service-strategy",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
        name: "Strategy",
        tagline: "Clarity before scale.",
        fullDescription:
            "Before campaigns. Before content. Before ads. We define direction. Because when direction is clear, every decision becomes sharper.",
        features: [
            "Your market positioning",
            "Your competitive advantage",
            "Your audience behaviour",
            "Your communication framework",
            "Your short and long-term growth roadmap",
        ],
        technologies: ["Brand Strategy", "Go-to-Market Planning", "Growth Modeling", "Competitive Analysis", "Audience Research"],
    },
    {
        id: "service-creative",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
        name: "Creative",
        tagline: "Your brand's personality, brought to life.",
        fullDescription:
            "A brand is not just seen — it is experienced. We shape that experience through considered design, purposeful storytelling, and creative systems that reflect who you are. Creativity, for us, carries intent.",
        features: [
            "Brand identity systems",
            "Campaign concepts",
            "Content creation & storytelling",
            "Short-form videos & brand films",
            "Retail & experiential creatives",
            "Presentation & sponsorship decks",
        ],
        technologies: [
            "Adobe Creative Suite",
            "Figma",
            "After Effects",
            "Premiere Pro",
            "Brand Identity Architecture",
        ],
    },
    {
        id: "service-growth",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        name: "Growth",
        tagline: "Momentum that moves.",
        fullDescription:
            "Growth is not static. It's engineered. We build digital systems that turn visibility into measurable progress. We focus on outcomes — leads, conversions, authority, and long-term brand strength. Because visibility is temporary. Momentum is sustainable.",
        features: [
            "Performance marketing (Meta, Google & digital platforms)",
            "Conversion-driven funnels",
            "Website & UI/UX development",
            "SEO & authority building",
            "Influencer collaborations",
            "Marketing automation & CRM systems",
        ],
        technologies: [
            "React / Next.js",
            "Performance Marketing",
            "Google Analytics",
            "Meta Business Suite",
            "SEO & Analytics Tools",
        ],
    },
    {
        id: "service-sports",
        imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80",
        name: "Competitive Sporting Ecosystems",
        tagline: "When the environment demands adrenaline and precision — we deliver both.",
        fullDescription:
            "Beyond strategy, creativity, and growth systems — we operate inside competitive sporting ecosystems. We build and amplify properties where moments win attention, but structure builds legacy.",
        features: [
            "League & championship branding",
            "Institutional sports communication systems",
            "Sponsorship & investment decks",
            "Athlete and academy positioning",
            "Event amplification & digital reach",
        ],
        technologies: [
            "Sports Branding",
            "Event Management",
            "Sponsorship Strategy",
            "Digital Amplification",
            "Athlete Communication",
        ],
    },
];
