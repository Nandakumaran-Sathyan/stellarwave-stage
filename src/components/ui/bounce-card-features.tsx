import React from "react";
import { motion } from "framer-motion";
import { Target, Megaphone, Rocket, Shield, Trophy } from "lucide-react";

interface BounceCardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-slate-800 dark:text-slate-200">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          Grow faster with our
          <span className="text-slate-400 dark:text-slate-500"> all-in-one solution</span>
        </h2>
        <motion.a
          href="/services"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="whitespace-nowrap rounded-lg bg-slate-900 dark:bg-slate-100 px-4 py-2 font-medium text-white dark:text-slate-900 shadow-xl transition-colors hover:bg-slate-700 dark:hover:bg-slate-300"
        >
          Learn more
        </motion.a>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle icon={<Target className="w-8 h-8" />}>
            Strategic Architecture
          </CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              className="w-full h-full object-cover rounded-lg opacity-90"
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
              alt="Strategic Architecture"
            />
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle icon={<Megaphone className="w-8 h-8" />}>
            Communication & Influence
          </CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-400 to-orange-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              className="w-full h-full object-cover rounded-lg opacity-90"
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop"
              alt="Communication & Influence"
            />
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle icon={<Rocket className="w-8 h-8" />}>
            Performance & Digital Infrastructure
          </CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              className="w-full h-full object-cover rounded-lg opacity-90"
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop"
              alt="Performance & Digital Infrastructure"
            />
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle icon={<Trophy className="w-8 h-8" />}>
            Sporting & Institutional Growth
          </CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-400 to-red-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              className="w-full h-full object-cover rounded-lg opacity-90"
              src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&auto=format&fit=crop"
              alt="Sporting & Institutional Growth"
            />
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard: React.FC<BounceCardProps> = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle: React.FC<CardTitleProps> = ({ children, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {icon && <div className="text-slate-600 dark:text-slate-300">{icon}</div>}
      <h3 className="text-center text-3xl font-semibold text-slate-800 dark:text-slate-100">{children}</h3>
    </div>
  );
};
