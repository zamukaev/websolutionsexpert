'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

/* ── animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/* ── icons ───────────────────────────────────────────────────── */
type ServiceKey = 's1' | 's2' | 's3' | 's4' | 's5' | 's6';

const ICONS: Record<ServiceKey, React.ReactNode> = {
  s1: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 9h2l2 3 2-5 2 3h2" />
    </svg>
  ),
  s2: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  s3: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="18" r="0.5" fill="currentColor" />
    </svg>
  ),
  s4: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  ),
  s5: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  s6: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

/* ── static service data ─────────────────────────────────────── */
const SERVICES: { num: string; key: ServiceKey; tags: string[] }[] = [
  { num: '01', key: 's1', tags: ['Design', 'SEO', 'Conversion'] },
  { num: '02', key: 's2', tags: ['E-Commerce', 'Stripe', 'Responsive'] },
  { num: '03', key: 's3', tags: ['React Native', 'iOS', 'Android'] },
  { num: '04', key: 's4', tags: ['Bot API', 'Automation', 'CRM'] },
  { num: '05', key: 's5', tags: ['React', 'Node.js', 'API'] },
  { num: '06', key: 's6', tags: ['24/7', 'Maintenance', 'Updates'] },
];

/* ── component ───────────────────────────────────────────────── */
export default function Services() {
  const t = useTranslations('services');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32"
      style={{ background: 'var(--bg2)' }}
    >
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-14 sm:mb-16"
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

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {SERVICES.map(({ num, key, tags }) => (
            <ServiceCard
              key={key}
              num={num}
              icon={ICONS[key]}
              tags={tags}
              title={t(`items.${key}.title`)}
              desc={t(`items.${key}.desc`)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* ── service card ────────────────────────────────────────────── */
interface ServiceCardProps {
  num: string;
  icon: React.ReactNode;
  tags: string[];
  title: string;
  desc: string;
}

function ServiceCard({ num, icon, tags, title, desc }: ServiceCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group relative flex flex-col gap-5 rounded-xl p-6 overflow-hidden cursor-default"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* top green border — slides in on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ background: 'var(--green)' }}
      />

      {/* bg lighten on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{ background: 'rgba(74,222,128,0.035)' }}
      />

      {/* faded number */}
      <span
        className="absolute top-4 right-5 font-black text-5xl leading-none font-[family-name:var(--font-unbounded)] select-none pointer-events-none"
        style={{ color: 'rgba(74,222,128,0.07)' }}
        aria-hidden="true"
      >
        {num}
      </span>

      {/* icon box — turns green on hover */}
      <div
        className="relative w-10 h-10 rounded-lg flex items-center justify-center text-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--bg)] transition-colors duration-300"
        style={{ background: 'rgba(74,222,128,0.10)' }}
      >
        {icon}
      </div>

      {/* title */}
      <h3 className="text-base font-bold text-[var(--text)] font-[family-name:var(--font-unbounded)] leading-snug">
        {title}
      </h3>

      {/* description */}
      <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-onest)] leading-relaxed flex-1">
        {desc}
      </p>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              color: 'var(--green)',
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.15)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
