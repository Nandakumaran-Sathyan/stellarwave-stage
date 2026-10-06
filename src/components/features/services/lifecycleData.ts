/* ── The Marketing Lifecycle ──
   Five stages that present the Stellar Wave disciplines (servicesData.ts) as
   one evolving system. Section ids keep the existing /services#service-* links
   working. */

export interface LifecycleStage {
    /** Section anchor */
    id: string;
    index: string;
    name: string;
    tagline: string;
    statement: [string, string];
    outcome: string;
    /** The discipline whose full detail opens from this stage */
    serviceId: string;
}

export const lifecycleStages: LifecycleStage[] = [
    {
        id: "service-strategy",
        index: "01",
        name: "Foundation",
        tagline: "Build the base.",
        statement: ["Your business has value.", "Does your brand communicate it properly?"],
        outcome: "Clarity + Consistency",
        serviceId: "service-strategy",
    },
    {
        id: "service-creative",
        index: "02",
        name: "Presence",
        tagline: "Build visibility.",
        statement: ["You are in the market.", "Does the market notice you?"],
        outcome: "Visibility + Recognition",
        serviceId: "service-creative",
    },
    {
        id: "service-growth",
        index: "03",
        name: "Demand",
        tagline: "Build enquiries.",
        statement: ["Attention is not enough.", "Build action."],
        outcome: "Attention + Action",
        serviceId: "service-growth",
    },
    {
        id: "service-scale",
        index: "04",
        name: "Scale",
        tagline: "Build predictability.",
        statement: ["Now marketing is working.", "Can it become predictable?"],
        outcome: "System + Predictability",
        serviceId: "service-growth",
    },
    {
        id: "service-sports",
        index: "05",
        name: "Authority",
        tagline: "Build market position.",
        statement: ["Your business is established.", "Now build recognition and influence."],
        outcome: "Recognition + Influence",
        serviceId: "service-sports",
    },
];

/* Imagery — one art direction: dark, high-contrast, cool/violet light.
   ImageParallax applies the shared grade, so swapping a URL here is all that
   is needed to replace a photo. */
const photo = (id: string, width = 1400) =>
    `https://images.unsplash.com/photo-${id}?w=${width}&auto=format&fit=crop&q=80`;

export const stageImages = {
    foundation: photo("1558655146-9f40138edfeb"),
    presenceMain: photo("1516035069371-29a1b244cc32"),
    presenceContent: photo("1574717024653-61fd2cf4d44d", 900),
    presenceCommunication: photo("1505373877841-8d25f7d46678", 900),
    demandAnalytics: photo("1551288049-bebda4e38f71", 1000),
    demandReach: photo("1451187580459-43490279c0fa", 900),
    scale: photo("1639322537228-f710d846310a", 900),
    authority: photo("1492684223066-81342ee5ff30", 1600),
};
