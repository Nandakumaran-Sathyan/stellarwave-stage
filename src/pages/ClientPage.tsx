import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ShoppingBag, Dumbbell, Shield, Trophy, ChevronRight, X } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Aurora from "@/components/features/common/Aurora";
import { BackgroundCircles } from "@/components/ui/background-circles";
import { cn } from "@/lib/utils";

interface Client {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  logoDark?: string;       // explicit white-variant file for dark mode
  invertInDark?: boolean;  // CSS invert for logos that are dark-coloured by default
  logoPadding?: string;
}

interface ClientCategory {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  clients: Client[];
  gradient: string;
}

const clientData: ClientCategory[] = [
  {
    icon: Building2,
    title: "Enterprise & Engineering",
    subtitle: "Technology and engineering-led companies operating in high-trust environments where authority, clarity, and performance systems determine growth.",
    gradient: "from-purple-500/20 to-blue-500/20",
    clients: [
      {
        name: "Snowforce",
        tagline: "ERP Solutions for Infrastructure & Construction Enterprises",
        description: "Snowforce delivers enterprise resource planning solutions tailored for infrastructure and construction companies. Operating in a complex B2B ecosystem, the brand requires knowledge-led positioning, authority-driven communication, and structured digital visibility to align with long sales cycles and technical decision-making processes.",
        logo: "/assets/Logo_s/snowforce.png",
        logoPadding: "p-0"
      },
      {
        name: "TAV",
        tagline: "Australian Mid-Drive Motor Technology Manufacturer",
        description: "TAV is an Australian-based engineering company specializing in advanced mid-drive motor systems. Positioned within the evolving electric mobility ecosystem, the brand demands market education, technical credibility, and performance-focused communication frameworks to strengthen its global positioning.",
        logo: "/assets/Logo_s/tav.png",
        logoPadding: "p-0"
      }
    ]
  },
  {
    icon: ShoppingBag,
    title: "Consumer & Retail Brands",
    subtitle: "High-engagement markets requiring precision in visibility, brand perception, and revenue-driven communication systems.",
    gradient: "from-pink-500/20 to-purple-500/20",
    clients: [
      {
        name: "Humming Bird",
        tagline: "Children's Magazines, Activity & Stress-Free Colouring Books",
        description: "Humming Bird creates educational and stress-relief content for children through thoughtfully designed magazines and activity books. The brand operates in a trust-driven parent-focused market, requiring engaging communication, product visibility, and consistent digital storytelling to strengthen brand recall and purchase intent.",
        logo: "/assets/Logo_s/The-hummingbird.png",
        logoPadding: "p-0"
      },
      {
        name: "Cycle Studio LLP",
        tagline: "Premium Bicycle Retail & Service Brand",
        description: "Cycle Studio LLP is a high-end bicycle retail and service outlet catering to enthusiasts and performance riders. Positioned in a niche lifestyle segment, the brand requires strong product positioning, retail branding clarity, and conversion-focused digital strategies to drive both store visits and service engagement.",
        logo: "/assets/Logo_s/cycle-studio.png",
        logoPadding: "p-0"
      },
      {
        name: "Annanagar Auto Service",
        tagline: "Authorised HP Automotive Dealer",
        description: "Annanagar Auto Service is an authorised HP dealer operating in a competitive automotive service market. The brand requires structured local visibility, trust-building communication, and consistent customer engagement systems to strengthen regional market positioning.",
        logo: "/assets/Logo_s/annanagarautoservice.png",
        invertInDark: true,
        logoPadding: "p-2"
      }
    ]
  },
  {
    icon: Dumbbell,
    title: "Performance & Training Ecosystems",
    subtitle: "Competitive training institutions demanding high-impact digital presence supported by structured consistency and community-driven growth.",
    gradient: "from-orange-500/20 to-red-500/20",
    clients: [
      {
        name: "Spitfire Boxing Club",
        tagline: "Professional Martial Arts \u0026 Competitive Training Institution",
        description: "Spitfire Kickboxing Academy trains athletes across multiple competitive levels. Operating in a performance-driven environment, the academy requires energetic digital positioning, disciplined communication cadence, and structured growth systems to strengthen athlete participation and brand authority.",
        logo: "/assets/Logo_s/spitfire.JPG",
        logoPadding: "p-0"
      }
    ]
  },
  {
    icon: Shield,
    title: "Associations & Federations",
    subtitle: "Institutional sporting bodies requiring governance-aligned communication, credibility management, and scalable participation frameworks.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    clients: [
      {
        name: "TNCA",
        tagline: "Tamil Nadu Cycling Association | 60+ Years Legacy",
        description: "TNCA is a long-standing state-level cycling association (Under SDAT & CFI) responsible for athlete development and event governance. The institution requires structured digital communication systems, event visibility amplification, and stakeholder-aligned positioning to strengthen participation and institutional credibility.",
        logo: "/assets/Logo_s/tn-cycling-assosciation.png",
        logoPadding: "p-0"
      },
      {
        name: "TNSKA",
        tagline: "Tamil Nadu Kickboxing Association | 1000+ Athletes",
        description: "TNSKA (Under WAKO India) oversees kickboxing development across Tamil Nadu, supporting athletes competing at state, national, and international levels. The association requires disciplined event communication, athlete engagement systems, and structured digital amplification to support large-scale participation.",
        logo: "/assets/Logo_s/tn-state-kickbozing.png",
        logoDark: "/assets/Logo_s/tn-state-kickbozing-white.jpeg",
        logoPadding: "p-0"
      },
      {
        name: "TNAA",
        tagline: "Tamil Nadu Athletic Association",
        description: "TNAA governs athletics development within the state framework. Institutional positioning, event communication clarity, and consistent stakeholder visibility are critical to strengthening athlete outreach and ecosystem growth.",
        logo: "/assets/Logo_s/TAA.png",
        logoPadding: "p-0"
      }
    ]
  },
  {
    icon: Trophy,
    title: "Championships & Competitive Properties",
    subtitle: "Large-scale sporting properties requiring precise execution, brand architecture discipline, and high-intensity digital amplification systems.",
    gradient: "from-yellow-500/20 to-orange-500/20",
    clients: [
      {
        name: "TCL – Tamil Nadu Cycling League",
        tagline: "State-Level Franchise Cycling League",
        description: "TCL operates as a competitive league format featuring eight district-based teams across Tamil Nadu. The property demands league identity architecture, sponsorship-ready positioning, and structured digital amplification to build audience engagement and competitive visibility.",
        logo: "/assets/Logo_s/tcl.png",
        logoPadding: "p-0"
      },
      {
        name: "National Kickboxing Championship 2025",
        tagline: "1,000+ Athletes | Pan-India Participation",
        description: "A large-scale national-level championship bringing together athletes from across India. The event requires structured communication governance, participation growth strategy, and high-volume digital deployment to ensure operational visibility and competitive credibility.",
        logo: "/assets/Logo_s/national-kick-boxing.png",
        logoDark: "/assets/Logo_s/national-kick-boxing-white.jpeg",
        logoPadding: "p-0"
      },
      {
        name: "Track Asia Cup 2026 – Chennai",
        tagline: "International Athletic Event | 10 Asian Nations Participating",
        description: "A landmark international event hosted in Chennai featuring participation from ten Asian countries. The property demands international-standard event positioning, multi-layered digital amplification, and structured stakeholder communication systems.",
        logo: "/assets/Logo_s/track-asia.png",
        logoDark: "/assets/Logo_s/track-asia-white.JPG",
        logoPadding: "p-0"
      }
    ]
  }
];


const ClientCard: React.FC<{
  client: Client;
  index: number;
  gradient: string;
  onClick: () => void;
}> = ({ client, index, gradient, onClick }) => {
  const [isDark, setIsDark] = React.useState(
    () => document.documentElement.classList.contains('dark')
  );
  React.useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  const activeLogo = (isDark && client.logoDark) ? client.logoDark : client.logo;
  const logoFilter = client.invertInDark && isDark ? 'invert(1)' : undefined;
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className={cn(
        "relative overflow-hidden rounded-xl p-6 h-full",
        "bg-gray-100 dark:bg-black",
        "border border-black/10 dark:border-white/10",
        "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        "transition-all duration-500 ease-out",
        "hover:scale-105 transform-gpu"
      )}>
        {/* Gradient overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          gradient
        )} />

        {/* Border glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl" style={{
            boxShadow: '0 0 30px rgba(131, 80, 232, 0.3)'
          }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className={cn("flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10", client.logoPadding ?? "p-0")}>
              <img
                src={activeLogo}
                alt={`${client.name} logo`}
                className="w-full h-full object-contain"
                style={logoFilter ? { filter: logoFilter } : undefined}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                  {client.name}
                </h3>
                <ChevronRight className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium tracking-tight leading-relaxed">
            {client.tagline}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ClientModal: React.FC<{
  client: Client | null;
  onClose: () => void;
  gradient: string;
}> = ({ client, onClose, gradient }) => {
  const [isDark, setIsDark] = React.useState(
    () => document.documentElement.classList.contains('dark')
  );
  React.useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  if (!client) return null;
  const activeLogo = (isDark && client.logoDark) ? client.logoDark : client.logo;
  const logoFilter = client.invertInDark && isDark ? 'invert(1)' : undefined;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl"
        >
          <div className={cn(
            "relative overflow-hidden rounded-2xl p-8",
            "bg-white dark:bg-black",
            "border border-black/10 dark:border-white/10",
            "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
          )}>
            {/* Gradient overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-20",
              gradient
            )} />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300"
            >
              <X className="w-5 h-5 text-black dark:text-white" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={cn("flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10", client.logoPadding ?? "p-0")}>
                  <img
                    src={activeLogo}
                    alt={`${client.name} logo`}
                    className="w-full h-full object-contain"
                    style={logoFilter ? { filter: logoFilter } : undefined}
                  />
                </div>
                <h2 className="text-3xl font-semibold tracking-tighter text-black dark:text-white">
                  {client.name}
                </h2>
              </div>
              <p className="text-sm tracking-[0.3em] uppercase font-medium text-black/70 dark:text-white/70 mb-6">
                {client.tagline}
              </p>
              <p className="text-base text-black/60 dark:text-white/60 font-medium tracking-tight leading-relaxed">
                {client.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ClientCategory: React.FC<{ category: ClientCategory; index: number }> = ({
  category,
  index
}) => {
  const Icon = category.icon;
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  return (
    <>
      <section className="mb-24">
        <motion.div
          initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6 justify-start">
            <div className={cn(
              "p-3 rounded-xl bg-gradient-to-br backdrop-blur-sm",
              "border border-black/10 dark:border-white/10",
              category.gradient
            )}>
              <Icon className="w-6 h-6 text-black dark:text-white" />
            </div>
            <h2 className="text-3xl font-medium tracking-tighter text-black dark:text-white sm:text-4xl md:text-5xl">
              {category.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/60 font-medium tracking-tight max-w-4xl leading-relaxed">
            {category.subtitle}
          </p>
        </motion.div>

        <div className="grid w-full gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {category.clients.map((client, idx) => (
            <ClientCard
              key={client.name}
              client={client}
              index={idx}
              gradient={category.gradient}
              onClick={() => setSelectedClient(client)}
            />
          ))}
        </div>
      </section>

      {selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          gradient={category.gradient}
        />
      )}
    </>
  );
};

const ClientPage: React.FC = () => {
  return (
    <>
      <main className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-300">
        {/* Background kept clean so global particles show through */}

        {/* Content */}
        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="relative mb-24 md:mb-32">
              {/* Aurora background — full viewport width */}
              <div className="pointer-events-none absolute -top-32 -bottom-8 left-1/2 -translate-x-1/2 w-screen opacity-70">
                <Aurora
                  colorStops={["#7c3aed", "#a855f7", "#4f46e5"]}
                  amplitude={0.9}
                  blend={0.5}
                  speed={0.5}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center"
              >
                <p className="text-sm tracking-[0.3em] uppercase font-medium text-black/70 dark:text-white/70 mb-6">
                  Trusted Across Diverse Growth Ecosystems
                </p>

                <h1 className="text-3xl sm:text-5xl md:text-[6rem] font-semibold tracking-tighter mb-8">
                  <span className="bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                    Our Client Constellation
                  </span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/60 font-medium tracking-tight max-w-4xl mx-auto leading-relaxed">
                  Stellar Wave partners with enterprises, consumer brands, performance institutions, and large-scale sporting properties that demand structured strategy and measurable execution. Our portfolio reflects cross-sector intelligence, disciplined deployment, and long-term partnership mindset.
                </p>
              </motion.div>
            </div>

            {/* Client Categories */}
            <div className="mt-16">
              {clientData.map((category, index) => (
                <ClientCategory key={category.title} category={category} index={index} />
              ))}
            </div>

            {/* Closing Statement */}
            <motion.div
              initial={{ filter: 'blur(4px)', opacity: 0 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-32 text-center"
            >
              <div className={cn(
                "inline-block px-8 py-8 rounded-2xl",
                "bg-gray-100 dark:bg-black",
                "border border-black/10 dark:border-white/10",
                "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                "backdrop-blur-sm"
              )}>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-black dark:text-white mb-3">
                  <span className="bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                    Structured Systems. Measurable Impact.
                  </span>
                </h2>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tighter text-black dark:text-white">
                  <span className="bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                    Scalable Ecosystems.
                  </span>
                </h2>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ClientPage;
