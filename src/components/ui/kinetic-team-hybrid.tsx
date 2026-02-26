import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ---------- Data ---------- */

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  colSpan: string;
  rowSpan: string;
}

const FOUNDERS = {
  pavithra: {
    name: 'Pavithra Saravanan',
    role: 'Co-founder',
    bio: 'The emotional intelligence behind the brand. With a deep eye for aesthetics and storytelling, she ensures every strategy carries clarity, warmth, and identity.',
  },
  aravind: {
    name: 'Aravind Sunil',
    role: 'Co-founder',
    bio: 'Driven by growth — not just numbers, but meaningful expansion. From sports ecosystems to enterprise collaborations, his focus has been on building systems that last.',
  },
  // Shared couple image for the founders card
  image: 'https://media.istockphoto.com/id/1470845982/photo/love-diversity-and-couple-hug-on-vacation-holiday-or-summer-trip-romantic-relax-smile-and.jpg?s=1024x1024&w=is&k=20&c=xEemo8jTCeJSTZ78XpvluGn46rC4jsM9_719bBV7-ls=',
};

const TEAM: TeamMember[] = [
  {
    id: 'SW-003',
    name: 'Sivakumar SN',
    role: 'UI/UX Designer',
    bio: 'Translating complex ideas into intuitive interfaces. Every pixel is intentional, and every interaction is crafted to feel effortless.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 'SW-004',
    name: 'Nandakumaran Sathyan',
    role: 'AI Automation',
    bio: 'Building intelligent systems that make brands operate smarter. Specialising in automation pipelines that eliminate friction and multiply impact.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 'SW-005',
    name: 'Riley Davis',
    role: 'Creative Director',
    bio: 'Shaping the visual and conceptual direction of every campaign. Bringing cohesion to creativity so every piece of content feels unmistakably on-brand.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
];

/* ---------- Founders Card (full-width row) ---------- */

function FoundersCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl col-span-1 md:col-span-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Shared couple image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={FOUNDERS.image}
          alt="Founders"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />
        {/* Bottom gradient for text */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        {/* Left fade for Pavithra's side */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/30 to-transparent" />
        {/* Right fade for Aravind's side */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/30 to-transparent" />
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? 'inset 0 0 0 1px rgba(131,80,232,0.5), 0 0 40px rgba(131,80,232,0.12)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content: Pavithra left, Aravind right */}
      <div className="absolute inset-0 flex items-end justify-between p-7 z-10">
        {/* Pavithra — left aligned */}
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex flex-col items-start"
        >
          <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1">
            {FOUNDERS.pavithra.role}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {FOUNDERS.pavithra.name}
          </h3>
          <AnimatePresence>
            {hovered && (
              <motion.p
                className="text-sm text-white/65 leading-relaxed mt-2 max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {FOUNDERS.pavithra.bio}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Aravind — right aligned */}
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex flex-col items-end text-right"
        >
          <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1">
            {FOUNDERS.aravind.role}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {FOUNDERS.aravind.name}
          </h3>
          <AnimatePresence>
            {hovered && (
              <motion.p
                className="text-sm text-white/65 leading-relaxed mt-2 max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {FOUNDERS.aravind.bio}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Regular Team Card ---------- */

function TeamCard({ member }: { member: TeamMember; key?: React.Key }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl col-span-1',
        member.colSpan,
        member.rowSpan,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Portrait */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? 'inset 0 0 0 1px rgba(131,80,232,0.5), 0 0 40px rgba(131,80,232,0.15)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <motion.div
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-widest text-white/50 mb-1">{member.role}</p>
          <h3 className="text-xl font-semibold tracking-tight text-white leading-snug">
            {member.name}
          </h3>
        </motion.div>

        <AnimatePresence>
          {hovered && (
            <motion.p
              className="text-sm text-white/70 leading-relaxed mt-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {member.bio}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ---------- Main Component ---------- */

export default function KineticTeamHybrid() {
  return (
    <div className="relative w-full bg-neutral-100 dark:bg-neutral-950 px-4 py-20 md:px-8 lg:px-12 overflow-hidden transition-colors duration-300">
      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-40
          bg-[linear-gradient(to_right,#d4d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)]
          bg-[size:6rem_5rem]
          [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_120%)]"
      />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              className="text-4xl font-semibold tracking-tighter
                bg-gradient-to-br from-black from-30% to-black/40
                dark:from-white dark:to-white/40
                bg-clip-text text-transparent
                sm:text-5xl md:text-7xl"
            >
              Meet the team
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent mx-8 hidden md:block" />
            <p className="text-sm text-black/40 dark:text-white/40 tracking-widest uppercase">
              The people behind Stellar Wave
            </p>
          </div>
        </motion.header>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ gridTemplateRows: '420px 360px' }}
        >
          {/* Row 1 — founders full-width */}
          <FoundersCard />

          {/* Row 2 — rest of the team */}
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
