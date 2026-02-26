import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------- Types ---------- */

interface TeamMember {
  id: string;
  name: string;
  role: string;
  codename: string;
  image: string;
  status: string;
}

/* ---------- Data ---------- */

const TEAM: TeamMember[] = [
  {
    id: 'SW-001',
    name: 'Pavithra Saravanan',
    role: 'Co-founder',
    codename: 'NOVA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    status: 'COMMANDING',
  },
  {
    id: 'SW-002',
    name: 'Aravind Sunil',
    role: 'Co-founder',
    codename: 'ORION',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    status: 'COMMANDING',
  },
  {
    id: 'SW-003',
    name: 'Sivakumar SN',
    role: 'UI/UX',
    codename: 'PRISM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    status: 'ACTIVE',
  },
  {
    id: 'SW-004',
    name: 'Nandakumaran Sathyan',
    role: 'AI Automation',
    codename: 'CIPHER',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    status: 'ACTIVE',
  },
  {
    id: 'SW-005',
    name: 'Riley Davis',
    role: 'Creative Director',
    codename: 'AURORA',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    status: 'ACTIVE',
  },
];

/* Accent colors per member */
const ACCENT = ['#fbbf24', '#818cf8', '#a78bfa', '#34d399', '#f472b6'];

/* ---------- Radar Grid Background ---------- */

function RadarGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 20%, rgba(99,102,241,0.6) 50%, rgba(139,92,246,0.4) 80%, transparent 100%)',
          boxShadow: '0 0 20px 4px rgba(139,92,246,0.15)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Corner decorations */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <div
          key={corner}
          className={`absolute w-16 h-16 ${corner === 'top-left' ? 'top-4 left-4 border-t border-l' :
            corner === 'top-right' ? 'top-4 right-4 border-t border-r' :
              corner === 'bottom-left' ? 'bottom-4 left-4 border-b border-l' :
                'bottom-4 right-4 border-b border-r'
            } border-white/10`}
        />
      ))}

      {/* Top status bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono">
          STELLAR WAVE — CREW MANIFEST — LIVE
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    </div>
  );
}

/* ---------- Crew List (Left Panel) ---------- */

interface CrewListProps {
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
  key?: React.Key;
}

function CrewList({ activeIndex, setActiveIndex }: CrewListProps) {
  return (
    <div className="flex flex-col gap-[1px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-mono">
          CREW ROSTER
        </span>
      </div>

      {TEAM.map((member, i) => {
        const isActive = activeIndex === i;
        const accent = ACCENT[i];

        return (
          <motion.button
            key={member.id}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            className="relative text-left px-4 py-4 cursor-pointer transition-colors duration-300 border-b border-white/[0.03] group outline-none"
            style={{
              background: isActive ? `${accent}10` : 'transparent',
            }}
            whileHover={{ backgroundColor: `${accent}08` }}
          >
            {/* Active indicator bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              animate={{
                backgroundColor: isActive ? accent : 'transparent',
                boxShadow: isActive ? `0 0 8px ${accent}60` : 'none',
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Row content */}
            <div className="flex items-center gap-4">
              {/* Blip indicator */}
              <div className="relative flex-shrink-0">
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: accent }}
                  animate={{
                    scale: isActive ? [1, 1.5, 1] : 1,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    duration: isActive ? 1.5 : 0.3,
                    repeat: isActive ? Infinity : 0,
                  }}
                />
                {isActive && (
                  <motion.div
                    className="absolute -inset-1 rounded-full"
                    style={{ border: `1px solid ${accent}40` }}
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[10px] font-mono tracking-wider"
                    style={{ color: `${accent}90` }}
                  >
                    {member.id}
                  </span>
                  <span className="text-[10px] font-mono text-white/20">
                    {member.codename}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white/90 truncate mt-0.5 group-hover:text-white transition-colors">
                  {member.name}
                </p>
                <p className="text-[11px] text-white/30 uppercase tracking-widest mt-0.5">
                  {member.role}
                </p>
              </div>

              {/* Status badge */}
              <span
                className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded font-mono flex-shrink-0"
                style={{
                  color: accent,
                  backgroundColor: `${accent}10`,
                  border: `1px solid ${accent}20`,
                }}
              >
                {member.status}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ---------- HUD Profile Card (Right Panel) ---------- */

interface HUDCardProps {
  member: TeamMember;
  index: number;
  onClose: () => void;
  key?: React.Key; // Allow key prop if passed directly (though React handles it)
}

function HUDCard({ member, index, onClose }: HUDCardProps) {
  const accent = ACCENT[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative h-full flex flex-col"
    >
      {/* HUD top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: accent }} />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono">
            CREW PROFILE — {member.codename}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white/20 hover:text-white/60 transition-colors text-xs font-mono cursor-pointer"
        >
          [CLOSE]
        </button>
      </div>

      {/* Profile content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6">
        {/* Photo with HUD frame */}
        <div className="relative">
          {/* Scanning ring */}
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ border: `1px solid ${accent}30` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-5 rounded-full"
            style={{ border: `1px dashed ${accent}15` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          {/* Photo */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-36 h-36 rounded-full overflow-hidden"
            style={{
              border: `2px solid ${accent}50`,
              boxShadow: `0 0 30px ${accent}20, inset 0 0 30px rgba(0,0,0,0.3)`,
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
              }}
            />
          </motion.div>

          {/* Corner brackets */}
          {['-top-1 -left-1 border-t border-l', '-top-1 -right-1 border-t border-r', '-bottom-1 -left-1 border-b border-l', '-bottom-1 -right-1 border-b border-r'].map((cls, i) => (
            <div
              key={i}
              className={`absolute ${cls} w-4 h-4`}
              style={{ borderColor: `${accent}40` }}
            />
          ))}
        </div>

        {/* Name and info */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{member.name}</h3>
          <p className="text-xs uppercase tracking-[0.3em] font-mono" style={{ color: accent }}>
            {member.role}
          </p>
        </motion.div>

        {/* Data readouts */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="w-full max-w-xs space-y-3"
        >
          {/* Stats */}
          {[
            { label: 'DESIGNATION', value: member.id },
            { label: 'CALLSIGN', value: member.codename },
            { label: 'STATUS', value: member.status },
            { label: 'DIVISION', value: member.role.toUpperCase() },
          ].map((stat) => (
            <div key={stat.label} className="flex justify-between items-center px-3 py-1.5 rounded border border-white/[0.04]"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/25">
                {stat.label}
              </span>
              <span className="text-[11px] font-mono text-white/60">
                {stat.value}
              </span>
            </div>
          ))}

          {/* Signal strength bar */}
          <div className="pt-2">
            <div className="flex justify-between mb-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/20">SIGNAL</span>
              <span className="text-[9px] font-mono text-white/30">100%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom status */}
      <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[9px] font-mono text-white/15 uppercase tracking-widest">
          STELLAR WAVE COMMAND
        </span>
        <motion.span
          className="text-[9px] font-mono uppercase tracking-widest"
          style={{ color: `${accent}60` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ● LINKED
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ---------- Mobile Card ---------- */

interface MobileCrewCardProps {
  member: TeamMember;
  index: number;
  isActive: boolean;
  onClick: () => void;
  key?: React.Key;
}

function MobileCrewCard({
  member,
  index,
  isActive,
  onClick,
}: MobileCrewCardProps) {
  const accent = ACCENT[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={onClick}
        className="w-full text-left p-4 rounded-lg border transition-all duration-300 cursor-pointer"
        style={{
          borderColor: isActive ? `${accent}40` : 'rgba(255,255,255,0.05)',
          background: isActive ? `${accent}08` : 'rgba(255,255,255,0.02)',
        }}
      >
        <div className="flex items-center gap-4">
          {/* Photo */}
          <div
            className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border"
            style={{
              borderColor: `${accent}40`,
              boxShadow: isActive ? `0 0 15px ${accent}20` : 'none',
            }}
          >
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono tracking-wider" style={{ color: `${accent}80` }}>
                {member.id}
              </span>
              <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            </div>
            <p className="text-sm font-semibold text-white truncate">{member.name}</p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest">{member.role}</p>
          </div>

          {/* Codename */}
          <span className="text-[10px] font-mono text-white/20 tracking-widest">{member.codename}</span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {[
                { label: 'CALLSIGN', value: member.codename },
                { label: 'STATUS', value: member.status },
                { label: 'DIVISION', value: member.role.toUpperCase() },
              ].map((s) => (
                <div key={s.label} className="flex justify-between px-3 py-1.5 rounded border border-white/[0.04]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/20">{s.label}</span>
                  <span className="text-[10px] font-mono text-white/50">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Main Component ---------- */

export default function KineticTeamHybrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="relative w-full bg-white dark:bg-black px-4 py-20 md:px-8 lg:px-12 overflow-hidden transition-colors duration-300">
      {/* Radar grid background (dark mode only for full sci-fi effect) */}
      <div className="hidden dark:block">
        <RadarGrid />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-medium tracking-tighter text-black dark:text-white sm:text-6xl md:text-8xl">
                Meet Our{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Team
                </span>
              </h1>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 via-neutral-200 dark:via-neutral-800 to-indigo-500/20 mx-8 hidden md:block" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 font-mono">
              CREW MANIFEST v2.5
            </p>
          </div>
        </motion.header>

        {/* ── DESKTOP: Mission Control Layout ── */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden border border-white/[0.06]"
            style={{
              background: 'rgba(255,255,255,0.01)',
              minHeight: '550px',
            }}
          >
            <div className="grid grid-cols-[320px_1fr] h-full" style={{ minHeight: '550px' }}>
              {/* Left: Crew roster */}
              <div className="border-r border-white/[0.05] overflow-y-auto">
                <CrewList activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
              </div>

              {/* Right: HUD card or empty state */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {activeIndex !== null ? (
                    <HUDCard
                      key={activeIndex}
                      member={TEAM[activeIndex]}
                      index={activeIndex}
                      onClose={() => setActiveIndex(null)}
                    />
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full gap-4 text-center p-8"
                    >
                      {/* Radar blip animation */}
                      <div className="relative w-24 h-24">
                        {[0, 1, 2].map((ring) => (
                          <motion.div
                            key={ring}
                            className="absolute inset-0 rounded-full border border-purple-500/20"
                            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: ring * 0.8,
                              ease: 'easeOut',
                            }}
                          />
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-purple-500/50" />
                        </div>
                      </div>
                      <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/15">
                        Select a crew member
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── MOBILE: Crew cards ── */}
        {isMobile && (
          <div className="flex flex-col gap-2">
            {TEAM.map((member, i) => (
              <MobileCrewCard
                key={member.id}
                member={member}
                index={i}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
