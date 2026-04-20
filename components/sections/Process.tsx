'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

/* ── animation variants ──────────────────────────────────────── */
const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/* ── static step data ────────────────────────────────────────── */
const STEPS = [
  { num: '01', key: 'briefing' },
  { num: '02', key: 'design'   },
  { num: '03', key: 'development' },
  { num: '04', key: 'launch'   },
] as const;

/* ── component ───────────────────────────────────────────────── */
export default function Process() {
  const t = useTranslations('process');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="process"
      className="relative py-24 sm:py-32"
      style={{ background: 'var(--bg)' }}
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

        {/* Steps */}
        <div className="relative">

          {/* connecting line — sits behind the number boxes */}
          <div
            aria-hidden="true"
            className="absolute top-7 left-7 right-7 h-px hidden lg:block"
            style={{ background: 'var(--border)' }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative"
          >
            {STEPS.map(({ num, key }) => (
              <motion.div
                key={key}
                variants={fadeLeft}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="group flex flex-col gap-4"
              >
                {/* number box */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10 transition-colors duration-300 group-hover:bg-[var(--green)]"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                >
                  <span className="text-sm font-black font-[family-name:var(--font-unbounded)] text-[var(--green)] group-hover:text-[var(--bg)] transition-colors duration-300">
                    {num}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-[var(--text)] font-[family-name:var(--font-unbounded)] leading-snug">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--muted)] font-[family-name:var(--font-onest)] leading-relaxed">
                    {t(`steps.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
