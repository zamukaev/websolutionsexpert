'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

/* ── animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

const colContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/* ── feature icons ───────────────────────────────────────────── */
type FeatureKey = 'approach' | 'design' | 'deadlines' | 'support';

const FEATURE_ICONS: Record<FeatureKey, React.ReactNode> = {
  approach: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  ),
  deadlines: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
};

const FEATURES: FeatureKey[] = ['approach', 'design', 'deadlines', 'support'];

/* ── tech stack ──────────────────────────────────────────────── */
const TECH_STACK = [
  'React', 'Angular', 'React Native', 'TypeScript',
  'Node.js', 'FastAPI', 'Firebase', 'PostgreSQL',
  'Docker', 'Figma', 'Next.js', 'Expo',
];

/* ── component ───────────────────────────────────────────────── */
export default function WhyMe() {
  const t = useTranslations('whyme');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
      style={{ background: 'var(--bg)' }}
    >
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
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

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: feature rows ── */}
          <motion.div
            variants={colContainer}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="flex flex-col gap-6"
          >
            {FEATURES.map((key) => (
              <FeatureRow key={key} featureKey={key} t={t} />
            ))}
          </motion.div>

          {/* ── Right: tech stack card ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <TechStackCard t={t} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ── feature row ─────────────────────────────────────────────── */
function FeatureRow({
  featureKey,
  t,
}: {
  featureKey: FeatureKey;
  t: ReturnType<typeof useTranslations<'whyme'>>;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group flex gap-4 items-start"
    >
      {/* Icon box */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 text-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--bg)]"
        style={{ background: 'rgba(74,222,128,0.10)', border: '1px solid var(--border)' }}
      >
        {FEATURE_ICONS[featureKey]}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 pt-0.5">
        <h3 className="text-sm font-bold text-[var(--text)] font-[family-name:var(--font-unbounded)] leading-snug">
          {t(`features.${featureKey}.title`)}
        </h3>
        <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-onest)] leading-relaxed">
          {t(`features.${featureKey}.desc`)}
        </p>
      </div>
    </motion.div>
  );
}

/* ── tech stack card ─────────────────────────────────────────── */
function TechStackCard({
  t,
}: {
  t: ReturnType<typeof useTranslations<'whyme'>>;
}) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: '0 0 60px rgba(74,222,128,0.04)',
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--green)] font-[family-name:var(--font-unbounded)] mb-1">
        {t('stack.label')}
      </p>
      <h3 className="text-base font-bold text-[var(--text)] font-[family-name:var(--font-unbounded)] mb-6">
        {t('stack.title')}
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {TECH_STACK.map((tech) => (
          <TechItem key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
}

/* ── tech item ───────────────────────────────────────────────── */
function TechItem({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center px-2 py-2.5 rounded-lg text-center transition-all duration-200 cursor-default"
      style={{
        background: hovered ? 'rgba(74,222,128,0.08)' : 'rgba(74,222,128,0.04)',
        border: `1px solid ${hovered ? 'rgba(74,222,128,0.4)' : 'var(--border)'}`,
      }}
    >
      <span
        className="text-xs font-medium font-[family-name:var(--font-onest)] transition-colors duration-200"
        style={{ color: hovered ? 'var(--green)' : 'var(--muted)' }}
      >
        {name}
      </span>
    </div>
  );
}
