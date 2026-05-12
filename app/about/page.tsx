'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const team = [
  {
    name: 'Sydney Phillips',
    role: 'Co-Founder & Creative Director',
    initials: 'SP',
    bio: 'Leads the visual identity and product design of every piece that comes out of the Frostburg workshop. Obsessed with the intersection of art and manufacturing.',
  },
  {
    name: 'Zachary Mason',
    role: 'Co-Founder & Lead Engineer',
    initials: 'ZM',
    bio: 'Handles the technical side — from CAD modeling and slicing to printer calibration and material science. If it can be printed, Zach has figured out how.',
  },
  {
    name: 'Connor Lancaster',
    role: 'Co-Founder & Operations',
    initials: 'CL',
    bio: 'Keeps the workshop running and orders moving. Manages production timelines, quality control, and makes sure every piece leaves Frostburg in perfect condition.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">

      {/* Hero */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-10 md:pt-20 pb-16 md:pb-24 overflow-hidden">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-10 md:mb-16"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 md:mb-6">
            FrostForge — Frostburg, MD
          </p>
          <div className="space-y-1 mb-8 md:mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.85]">
              WHO WE
            </h1>
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-600 leading-[0.85]">
              ARE
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              FrostForge was born out of a shared obsession with detail, craftsmanship, and the
              technology to make it real. Three founders. One workshop. A relentless commitment
              to precision manufacturing that turns digital designs into physical art.
            </p>
          </div>
        </motion.div>

        {/* Decorative corner line */}
        <div className="absolute top-0 right-0 w-px h-64 bg-gradient-to-b from-zinc-800 to-transparent hidden md:block" />
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="h-px w-full bg-zinc-900" />
      </div>

      {/* Mission Strip */}
      <section className="px-6 md:px-12 lg:px-24 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {[
            { label: 'Founded', value: '2024', sub: 'Frostburg, Maryland' },
            { label: 'Specialty', value: 'FDM + Resin', sub: 'Precision fabrication' },
            { label: 'Mission', value: 'Forge Art', sub: 'One print at a time' },
          ].map((stat) => (
            <div key={stat.label} className="border-l border-zinc-800 pl-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stat.value}</p>
              <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="h-px w-full bg-zinc-900" />
      </div>

      {/* Team */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">The Founders</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Built by three.<br className="hidden md:block" /> Forged together.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="group border border-zinc-900 bg-zinc-950/50 p-8 md:p-10 hover:border-zinc-700 transition-all duration-500"
            >
              {/* Initial Avatar */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:border-zinc-600 transition-colors duration-500">
                <span className="font-mono text-xl md:text-2xl font-bold text-white tracking-widest">
                  {member.initials}
                </span>
              </div>

              {/* Index */}
              <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest mb-4">
                0{index + 1}
              </p>

              {/* Name & Role */}
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
                {member.name}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6">
                {member.role}
              </p>

              {/* Divider */}
              <div className="h-px w-8 bg-zinc-800 mb-6 group-hover:w-16 group-hover:bg-zinc-600 transition-all duration-500" />

              {/* Bio */}
              <p className="text-zinc-500 text-sm leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="h-px w-full bg-zinc-900" />
      </div>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <div className="max-w-lg">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-3">Ready to order?</p>
            <p className="text-2xl md:text-4xl font-bold tracking-tighter text-white">
              Every piece is made by hand, in Frostburg — just for you.
            </p>
          </div>
          <Link
            href="/store"
            className="flex-shrink-0 flex items-center gap-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-zinc-200 transition-colors active:scale-[0.98] transition-transform"
          >
            View the Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-black/20 py-8 md:py-10 text-center text-zinc-500">
        <p className="text-xs md:text-sm">© 2024 FrostForge. Based in Frostburg, Maryland.</p>
      </footer>
    </main>
  );
}
