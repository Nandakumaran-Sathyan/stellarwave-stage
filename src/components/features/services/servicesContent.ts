/* ── Services page content ──
   All copy and imagery for /services lives here; the section components only
   lay it out. */

/* Imagery — one art direction: dark, high-contrast, slightly desaturated.
   EditorialImage applies the shared grade, so swapping an id here is all that
   is needed to replace a photo. */
const photo = (id: string, width = 1600) =>
    `https://images.unsplash.com/photo-${id}?w=${width}&auto=format&fit=crop&q=75`;

export const images = {
    hero: photo("1492684223066-81342ee5ff30", 2000),
    heroDetail: photo("1524253482453-3fed8d2fe12b", 700),
    strategy: photo("1493397212122-2b85dda8106b", 1400),
    creativeMain: photo("1516035069371-29a1b244cc32", 2000),
    creativeDetail: photo("1485846234645-a62644f84728", 1100),
    growth: photo("1551288049-bebda4e38f71", 1400),
    sportingHero: photo("1522778119026-d647f0596c20", 2000),
};

/* The five lifecycle stages — the thread that runs through the whole page. */
export interface LifecycleStage {
    index: string;
    name: string;
    /** Shorter label used in the 001 progression */
    signal: string;
    tagline: string;
    statement: [string, string];
    outcome: string;
}

export const lifecycleStages: LifecycleStage[] = [
    {
        index: "01",
        name: "Foundation",
        signal: "Clarity",
        tagline: "Build the base.",
        statement: ["Your business has value.", "Does your brand communicate it properly?"],
        outcome: "Clarity + Consistency",
    },
    {
        index: "02",
        name: "Presence",
        signal: "Presence",
        tagline: "Build visibility.",
        statement: ["You are in the market.", "Does the market notice you?"],
        outcome: "Visibility + Recognition",
    },
    {
        index: "03",
        name: "Demand",
        signal: "Demand",
        tagline: "Build enquiries.",
        statement: ["Attention is not enough.", "Build action."],
        outcome: "Attention + Action",
    },
    {
        index: "04",
        name: "Scale",
        signal: "Scale",
        tagline: "Build predictability.",
        statement: ["Now marketing is working.", "Can it become predictable?"],
        outcome: "System + Predictability",
    },
    {
        index: "05",
        name: "Authority",
        signal: "Authority",
        tagline: "Build market position.",
        statement: ["Your business is established.", "Now build recognition and influence."],
        outcome: "Recognition + Influence",
    },
];

/* The disciplines. Section ids keep the existing /services#service-* links working. */
export interface Discipline {
    id: string;
    number: string;
    label: string;
    headline: string[];
    copy: string[];
    pillars: string[];
    outcome: [string, string];
    services: string[];
}

export const strategy: Discipline = {
    id: "service-strategy",
    number: "002",
    label: "Strategy",
    headline: ["Clarity", "before scale."],
    copy: ["Before campaigns, content or growth, we define where the brand should go — and why."],
    pillars: ["Brand", "Digital", "Expression"],
    outcome: ["Foundation", "Clarity + Consistency"],
    services: [
        "Market Positioning",
        "Competitive Advantage",
        "Audience Behaviour",
        "Communication Framework",
        "Short-Term & Long-Term Growth Roadmap",
        "Brand Strategy",
        "Go-To-Market Planning",
        "Growth Modelling",
        "Competitive Analysis",
        "Audience Research",
    ],
};

export const creative: Discipline = {
    id: "service-creative",
    number: "003",
    label: "Creative",
    headline: ["Make the brand", "impossible to ignore."],
    copy: ["Strategy gives the brand direction.", "Creative gives it personality."],
    pillars: ["Production", "Content", "Communication"],
    outcome: ["Presence", "Visibility + Recognition"],
    services: [
        "Brand Identity Systems",
        "Campaign Concepts",
        "Content Creation",
        "Storytelling",
        "Short-Form Videos",
        "Brand Films",
        "Retail Creatives",
        "Experiential Creatives",
        "Presentation Decks",
        "Sponsorship Decks",
    ],
};

export const growth: Discipline = {
    id: "service-growth",
    number: "004",
    label: "Growth",
    headline: ["Turn attention", "into momentum."],
    copy: ["Growth is where strategy and creative become measurable."],
    pillars: ["Discovery", "Conversion", "Measurement"],
    outcome: ["Demand", "Attention + Action"],
    services: [
        "Performance Marketing",
        "Conversion Funnels",
        "Website Design & Development",
        "UI / UX",
        "SEO",
        "Authority Building",
        "Influencer Collaborations",
        "Marketing Automation",
        "CRM",
        "Analytics",
        "Conversion Optimisation",
        "Customer Journey",
        "Business Process Automation",
        "Growth Consulting",
    ],
};

export const growthJourney = [
    { name: "Audience", note: "Who the brand needs to reach" },
    { name: "Content", note: "What earns their attention" },
    { name: "Traffic", note: "Where discovery happens" },
    { name: "Leads", note: "Interest, captured" },
    { name: "Conversion", note: "Action, made easy" },
    { name: "Retention", note: "Value, repeated" },
];

export const sporting = {
    id: "service-sports",
    number: "005",
    label: "Sporting Ecosystems",
    headline: ["When the environment demands", "adrenaline and precision —", "we deliver both."],
    copy: "We build brands and communication systems for the sporting ecosystem.",
    marquee: "Adrenaline × Precision",
    services: [
        "League & Championship Branding",
        "Institutional Sports Communication",
        "Sponsorship & Investment Decks",
        "Athlete Positioning",
        "Academy Positioning",
        "Event Amplification",
        "Digital Reach",
        "Sports Branding",
        "Event Management",
        "Sponsorship Strategy",
        "Athlete Communication",
    ],
    panels: [
        { src: photo("1552674605-db6ffd4facb5", 1200), alt: "Runners in silhouette at dusk", caption: "Athlete Positioning" },
        { src: photo("1471295253337-3ceaaedca402", 1400), alt: "A floodlit stadium seen from above", caption: "League & Championship Branding" },
        { src: photo("1541534741688-6078c6bfb5c5", 1200), alt: "An athlete lifting a barbell in training", caption: "Academy Positioning" },
        { src: photo("1574629810360-7efbbe195018", 1400), alt: "A football struck on a floodlit pitch", caption: "Event Amplification" },
    ],
};

export const processSteps = [
    { index: "01", name: "Discover", note: "Understand the business, audience and opportunity." },
    { index: "02", name: "Define", note: "Build the strategic direction." },
    { index: "03", name: "Create", note: "Turn strategy into compelling brand and content." },
    { index: "04", name: "Activate", note: "Launch campaigns, digital experiences and growth systems." },
    { index: "05", name: "Optimise", note: "Measure, learn and continuously improve." },
];

/* Selected work — real engagements; descriptions follow the Clients page. */
export interface Project {
    category: string;
    title: string;
    description: string;
    scope: string;
    image: string;
    alt: string;
}

export const projects: Project[] = [
    {
        category: "Championship / International",
        title: "Track Asia Cup 2026 — Chennai",
        description: "A landmark international event bringing ten Asian nations to Chennai.",
        scope: "Event positioning · Digital amplification · Stakeholder communication",
        image: photo("1461896836934-ffe607ba8211", 2000),
        alt: "A sprinter set in the starting blocks on a running track",
    },
    {
        category: "League / Sport",
        title: "Tamil Nadu Cycling League",
        description: "A franchise league of eight district teams, built to be sponsorship-ready.",
        scope: "League identity · Sponsorship positioning · Digital amplification",
        image: photo("1517649763962-0c623066013b", 1400),
        alt: "A peloton of road cyclists racing",
    },
    {
        category: "National League / Sport",
        title: "Khelo India Women's Kickboxing League",
        description: "Branding and communication that elevated a national women's league.",
        scope: "Visual identity · Content · Audience engagement",
        image: photo("1549719386-74dfcbf7dbed", 1400),
        alt: "A pair of boxing gloves resting in a gym",
    },
    {
        category: "Enterprise / B2B",
        title: "Snowforce",
        description: "Knowledge-led positioning for an ERP brand in infrastructure and construction.",
        scope: "Positioning · Authority communication · Digital visibility",
        image: photo("1486406146926-c627a92ad1ab", 1800),
        alt: "Glass towers seen from street level",
    },
];

export const faqs = [
    {
        question: "What kind of brands do you work with?",
        answer: "Ambitious brands, institutions and sporting properties — from enterprise and engineering companies to consumer and retail labels, academies, associations and championships. What they share is a need for direction and a system, not one-off tactics.",
    },
    {
        question: "Do you offer individual services or complete marketing systems?",
        answer: "Both. You can engage us for a single discipline — strategy, creative or growth — but each is designed to connect with the others, and the work compounds when they run as one system.",
    },
    {
        question: "Can you work with an existing internal marketing team?",
        answer: "Yes. We regularly work alongside in-house teams — setting direction, adding capability where it is missing, or building the systems your team then runs.",
    },
    {
        question: "Do you handle both strategy and execution?",
        answer: "Yes. We define the direction and then build it: identity, content, campaigns, websites, automation and measurement.",
    },
    {
        question: "Can you work with sports organisations and sporting brands?",
        answer: "Yes — it is one of our core practices. We work with leagues, championships, federations, academies and athletes on branding, communication, sponsorship and event amplification.",
    },
    {
        question: "How do projects typically begin?",
        answer: "With a conversation. We start by understanding the business, the audience and where the brand is today, then recommend the right stage to begin from and the scope to match.",
    },
];
