'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ── types ───────────────────────────────────────────────────── */
type Category = 'all' | 'landingpages' | 'shops' | 'apps' | 'bots';
type MockupVariant = 'browserA' | 'browserB' | 'mobile' | 'chat';

interface Project {
  id: string;
  category: Exclude<Category, 'all'>;
  mockup: MockupVariant;
  accent: string;
}

/* ── static data ─────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  { id: 'p1', category: 'landingpages', mockup: 'browserA', accent: '#4ade80' },
  { id: 'p2', category: 'shops',        mockup: 'browserB', accent: '#60a5fa' },
  { id: 'p3', category: 'apps',         mockup: 'mobile',   accent: '#f472b6' },
  { id: 'p4', category: 'bots',         mockup: 'chat',     accent: '#34d399' },
  { id: 'p5', category: 'landingpages', mockup: 'browserA', accent: '#a78bfa' },
  { id: 'p6', category: 'shops',        mockup: 'browserB', accent: '#fb923c' },
];

const FILTER_KEYS: Category[] = ['all', 'landingpages', 'shops', 'apps', 'bots'];

/* ── animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/* ── component ───────────────────────────────────────────────── */
export default function Portfolio() {
  const t = useTranslations('portfolio');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Category>('all');

  const visible = active === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  return (
    <section
      id="portfolio"
      className="relative py-24 sm:py-32"
      style={{ background: 'var(--bg2)' }}
    >
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green)] font-[family-name:var(--font-unbounded)] mb-4">
            {t('label')}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-[family-name:var(--font-unbounded)] text-[var(--text)] leading-tight max-w-xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-[var(--muted)] text-base max-w-lg font-[family-name:var(--font-onest)] font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTER_KEYS.map((key) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 font-[family-name:var(--font-onest)] cursor-pointer"
                style={{
                  background: isActive ? 'var(--green)' : 'rgba(74,222,128,0.07)',
                  color: isActive ? 'var(--bg)' : 'var(--muted)',
                  border: `1px solid ${isActive ? 'var(--green)' : 'var(--border)'}`,
                  boxShadow: isActive ? '0 0 20px rgba(74,222,128,0.25)' : 'none',
                }}
              >
                {t(`filter.${key}`)}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={fadeUp}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <ProjectCard project={project} t={t} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

/* ── project card ────────────────────────────────────────────── */
function ProjectCard({
  project,
  t,
}: {
  project: Project;
  t: ReturnType<typeof useTranslations<'portfolio'>>;
}) {
  const catLabel = t(`cat.${project.category}`);

  return (
    <article
      className="group relative rounded-xl overflow-hidden cursor-default"
      style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
    >
      {/* Mockup area */}
      <div className="relative h-48 sm:h-52 overflow-hidden" style={{ background: 'var(--bg3)' }}>
        <MockupSwitch variant={project.mockup} accent={project.accent} />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(10,14,11,0.96) 0%, rgba(10,14,11,0.7) 60%, transparent 100%)' }}
        >
          <span
            className="mb-2 inline-flex w-fit px-2.5 py-1 rounded-full text-xs font-semibold font-[family-name:var(--font-onest)]"
            style={{
              color: project.accent,
              background: `${project.accent}18`,
              border: `1px solid ${project.accent}30`,
            }}
          >
            {catLabel}
          </span>
          <h3 className="text-base font-bold text-[var(--text)] font-[family-name:var(--font-unbounded)] leading-snug mb-1">
            {t(`projects.${project.id}.title`)}
          </h3>
          <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-onest)] leading-relaxed">
            {t(`projects.${project.id}.desc`)}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ── mockup switcher ─────────────────────────────────────────── */
function MockupSwitch({ variant, accent }: { variant: MockupVariant; accent: string }) {
  switch (variant) {
    case 'browserA': return <BrowserMockupA accent={accent} />;
    case 'browserB': return <BrowserMockupB accent={accent} />;
    case 'mobile':   return <MobileMockup   accent={accent} />;
    case 'chat':     return <ChatMockup     accent={accent} />;
  }
}

/* ── browser mockup A — landing page style ───────────────────── */
function BrowserMockupA({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 p-2.5 flex flex-col gap-1.5">
      {/* Titlebar */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md flex-shrink-0"
        style={{ background: 'var(--bg2)' }}
      >
        <span className="h-2 w-2 rounded-full bg-[#ff5f57] opacity-80" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e] opacity-80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840] opacity-80" />
        <div className="flex-1 mx-2 h-2 rounded-full opacity-20" style={{ background: 'var(--muted)' }} />
      </div>
      {/* Hero block */}
      <div
        className="rounded-md p-3 flex flex-col gap-2 flex-shrink-0"
        style={{ background: `${accent}12` }}
      >
        <div className="h-1.5 w-14 rounded-full" style={{ background: accent, opacity: 0.7 }} />
        <div className="h-3 w-28 rounded-full opacity-80" style={{ background: 'var(--text)' }} />
        <div className="h-1.5 w-20 rounded-full opacity-20" style={{ background: 'var(--muted)' }} />
        <div className="flex gap-1.5 mt-0.5">
          <div className="h-5 w-14 rounded-full" style={{ background: accent, opacity: 0.85 }} />
          <div className="h-5 w-12 rounded-full border opacity-30" style={{ borderColor: accent }} />
        </div>
      </div>
      {/* Feature cards row */}
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {[0.9, 0.7, 0.55].map((op, i) => (
          <div
            key={i}
            className="rounded-md p-2 flex flex-col gap-1.5"
            style={{ background: 'var(--bg2)', opacity: op }}
          >
            <div className="h-2 w-2 rounded" style={{ background: accent }} />
            <div className="h-1.5 w-full rounded-full opacity-30" style={{ background: 'var(--muted)' }} />
            <div className="h-1.5 w-3/4 rounded-full opacity-20" style={{ background: 'var(--muted)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── browser mockup B — shop/grid style ──────────────────────── */
function BrowserMockupB({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 p-2.5 flex flex-col gap-1.5">
      {/* Titlebar */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md flex-shrink-0"
        style={{ background: 'var(--bg2)' }}
      >
        <span className="h-2 w-2 rounded-full bg-[#ff5f57] opacity-80" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e] opacity-80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840] opacity-80" />
        <div className="flex-1 mx-2 h-2 rounded-full opacity-20" style={{ background: 'var(--muted)' }} />
        <div className="h-4 w-4 rounded opacity-40" style={{ background: accent }} />
      </div>
      {/* Nav + search bar */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="flex-1 h-4 rounded-md opacity-15" style={{ background: 'var(--muted)' }} />
        <div className="h-4 w-8 rounded-md" style={{ background: accent, opacity: 0.7 }} />
      </div>
      {/* Product grid */}
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {[1, 0.8, 0.75, 0.65, 0.55, 0.45].map((op, i) => (
          <div
            key={i}
            className="rounded-md flex flex-col overflow-hidden"
            style={{ background: 'var(--bg2)', opacity: op }}
          >
            <div className="h-8 w-full" style={{ background: `${accent}20` }} />
            <div className="p-1 flex flex-col gap-0.5">
              <div className="h-1 w-full rounded-full opacity-30" style={{ background: 'var(--text)' }} />
              <div className="h-1.5 w-8 rounded-full" style={{ background: accent, opacity: 0.8 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── mobile mockup ───────────────────────────────────────────── */
function MobileMockup({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative w-24 h-44 rounded-2xl overflow-hidden flex-shrink-0"
        style={{
          background: 'var(--bg)',
          border: `2px solid ${accent}30`,
          boxShadow: `0 0 30px ${accent}18`,
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 h-2 w-8 rounded-full z-10"
          style={{ background: 'var(--bg2)' }}
        />
        {/* Status bar */}
        <div className="pt-5 px-2.5 flex flex-col gap-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="h-2 w-10 rounded-full opacity-60" style={{ background: 'var(--text)' }} />
            <div className="h-4 w-4 rounded-full" style={{ background: `${accent}30` }} />
          </div>
          {/* Balance card */}
          <div
            className="rounded-xl p-2 flex flex-col gap-1"
            style={{ background: `${accent}15` }}
          >
            <div className="h-1 w-8 rounded-full opacity-40" style={{ background: 'var(--muted)' }} />
            <div className="h-3 w-14 rounded-full opacity-90" style={{ background: accent }} />
          </div>
          {/* List items */}
          {[1, 0.75, 0.55].map((op, i) => (
            <div key={i} className="flex items-center gap-1.5" style={{ opacity: op }}>
              <div className="h-5 w-5 rounded-lg flex-shrink-0" style={{ background: `${accent}20` }} />
              <div className="flex flex-col gap-0.5 flex-1">
                <div className="h-1 w-full rounded-full opacity-30" style={{ background: 'var(--muted)' }} />
                <div className="h-1 w-2/3 rounded-full opacity-20" style={{ background: 'var(--muted)' }} />
              </div>
              <div className="h-1.5 w-6 rounded-full" style={{ background: accent, opacity: 0.6 }} />
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div
          className="absolute bottom-0 inset-x-0 flex items-center justify-around py-2 px-3 border-t"
          style={{ borderColor: `${accent}20`, background: 'var(--bg)' }}
        >
          {[1, 0.4, 0.4, 0.4].map((op, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded"
              style={{ background: i === 0 ? accent : 'var(--muted)', opacity: op }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── chat mockup ─────────────────────────────────────────────── */
function ChatMockup({ accent }: { accent: string }) {
  const msgs = [
    { side: 'left',  width: 'w-24', text: true },
    { side: 'right', width: 'w-16', text: false },
    { side: 'left',  width: 'w-28', text: true },
    { side: 'left',  width: 'w-20', text: false },
    { side: 'right', width: 'w-12', text: false },
  ];

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Chat header */}
      <div
        className="flex items-center gap-2 px-3 py-2 flex-shrink-0 border-b"
        style={{ background: 'var(--bg)', borderColor: `${accent}15` }}
      >
        <div
          className="h-6 w-6 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ background: `${accent}25` }}
        >
          <div className="h-2 w-2 rounded-full" style={{ background: accent }} />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="h-1.5 w-16 rounded-full opacity-70" style={{ background: 'var(--text)' }} />
          <div className="h-1 w-10 rounded-full" style={{ background: accent, opacity: 0.5 }} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-2 p-3 overflow-hidden">
        {msgs.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`${msg.width} rounded-xl px-2.5 py-1.5 flex flex-col gap-1`}
              style={{
                background: msg.side === 'right' ? `${accent}25` : 'var(--bg2)',
              }}
            >
              {msg.text && (
                <div className="h-1.5 w-full rounded-full opacity-30" style={{ background: 'var(--muted)' }} />
              )}
              <div className="h-1.5 w-3/4 rounded-full opacity-20" style={{ background: 'var(--muted)' }} />
            </div>
          </div>
        ))}

        {/* Bot reply with buttons */}
        <div className="flex justify-start">
          <div
            className="w-32 rounded-xl px-2.5 py-2 flex flex-col gap-1.5"
            style={{ background: 'var(--bg2)' }}
          >
            <div className="h-1.5 w-full rounded-full opacity-25" style={{ background: 'var(--muted)' }} />
            <div className="h-1.5 w-4/5 rounded-full opacity-20" style={{ background: 'var(--muted)' }} />
            <div className="flex gap-1 mt-0.5">
              <div className="flex-1 h-4 rounded-lg" style={{ background: `${accent}30` }} />
              <div className="flex-1 h-4 rounded-lg" style={{ background: `${accent}18` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-2 flex-shrink-0 border-t"
        style={{ background: 'var(--bg)', borderColor: `${accent}15` }}
      >
        <div className="flex-1 h-5 rounded-full opacity-15" style={{ background: 'var(--muted)' }} />
        <div className="h-5 w-5 rounded-full" style={{ background: `${accent}35` }} />
      </div>
    </div>
  );
}
