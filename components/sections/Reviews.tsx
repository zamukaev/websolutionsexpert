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
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

/* ── static review data ──────────────────────────────────────── */
const REVIEWS = [
  { id: 'r1', initials: 'MK', color: '#4ade80' },
  { id: 'r2', initials: 'AS', color: '#60a5fa' },
  { id: 'r3', initials: 'TW', color: '#a78bfa' },
] as const;

/* ── component ───────────────────────────────────────────────── */
export default function Reviews() {
  const t = useTranslations('reviews');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="reviews"
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
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map(({ id, initials, color }) => (
            <ReviewCard
              key={id}
              initials={initials}
              color={color}
              text={t(`items.${id}.text`)}
              name={t(`items.${id}.name`)}
              role={t(`items.${id}.role`)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* ── review card ─────────────────────────────────────────────── */
interface ReviewCardProps {
  initials: string;
  color: string;
  text: string;
  name: string;
  role: string;
}

function ReviewCard({ initials, color, text, name, role }: ReviewCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group relative flex flex-col gap-5 rounded-xl p-6 transition-colors duration-300"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Hover bg lighten */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'rgba(74,222,128,0.03)' }}
      />

      {/* Quote mark */}
      <span
        className="font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: '4rem',
          lineHeight: 0.8,
          color: 'rgba(74,222,128,0.15)',
          fontFamily: 'Georgia, serif',
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Stars */}
      <div className="flex items-center gap-1" aria-label="5 von 5 Sternen">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 16 16" fill="var(--green)" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M8 .5l1.95 4.18 4.55.44-3.32 3.01 1.01 4.47L8 10.1l-4.19 2.5 1.01-4.47L1.5 5.12l4.55-.44z" />
          </svg>
        ))}
      </div>

      {/* Review text */}
      <p className="text-sm italic text-[var(--muted)] font-[family-name:var(--font-onest)] leading-relaxed flex-1">
        {text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-1">
        {/* Initials avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{
            background: `${color}20`,
            border: `1px solid ${color}40`,
            color,
          }}
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text)] font-[family-name:var(--font-onest)] leading-none">
            {name}
          </p>
          <p className="text-xs text-[var(--muted)] mt-1 font-[family-name:var(--font-onest)] leading-none">
            {role}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
