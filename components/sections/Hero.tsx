'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/lib/navigation';

const WHATSAPP_URL = 'https://wa.me/4915236933626';

/* ── animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

const mockupVariant = {
  hidden: { opacity: 0, x: 60, rotateY: 12 },
  show:   {
    opacity: 1, x: 0, rotateY: 3,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const pulse = {
  scale: [1, 1.45, 1],
  opacity: [1, 0.4, 1],
};

/* ── stats data ──────────────────────────────────────────────── */
const STATS = [
  { value: '30+', key: 'projects' },
  { value: '3',   key: 'experience' },
  { value: '100%', key: 'satisfaction' },
] as const;

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden pt-20">

      {/* ── Background: radial glow top-right ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 80% -10%, rgba(74,222,128,0.13) 0%, transparent 70%)',
        }}
      />

      {/* ── Background: dot grid overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(74,222,128,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20">

        {/* ════════ LEFT COLUMN ════════ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {/* badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 w-fit">
            <span className="relative flex h-2.5 w-2.5">
              {/* pulsing ring */}
              <motion.span
                animate={pulse}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-[var(--green)]"
                aria-hidden="true"
              />
              <span className="relative block h-2.5 w-2.5 rounded-full bg-[var(--green)]" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--green)] font-[family-name:var(--font-unbounded)]">
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight font-[family-name:var(--font-unbounded)] text-[var(--text)]"
          >
            {t('hero.title')}{' '}
            <span
              className="text-[var(--green)]"
              style={{
                textShadow: '0 0 40px rgba(74,222,128,0.35)',
              }}
            >
              {t('hero.titleHighlight')}
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-md font-[family-name:var(--font-onest)] font-light"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold',
                'bg-[var(--green)] text-[var(--bg)]',
                'shadow-[0_0_28px_var(--green-glow)]',
                'hover:bg-[var(--green-dim)] hover:shadow-[0_0_40px_var(--green-glow)]',
                'transition-all duration-200',
              ].join(' ')}
            >
              {t('hero.cta')}
            </a>

            <Link
              href="#portfolio"
              className={[
                'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium',
                'bg-transparent text-[var(--green)]',
                'border border-[var(--border)]',
                'hover:border-[var(--green)] hover:bg-[var(--green-glow)]',
                'transition-all duration-200',
              ].join(' ')}
            >
              {t('hero.ctaSecondary')}
            </Link>
          </motion.div>

          {/* stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-6 pt-2"
          >
            {STATS.map(({ value, key }, i) => (
              <div key={key} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="h-8 w-px bg-[var(--border)]" aria-hidden="true" />
                )}
                <div>
                  <p className="text-2xl font-black text-[var(--text)] font-[family-name:var(--font-unbounded)] leading-none">
                    {value}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-1 leading-none">
                    {t(`stats.${key}`)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ════════ RIGHT COLUMN — browser mockup ════════ */}
        <motion.div
          variants={mockupVariant}
          initial="hidden"
          animate="show"
          className="hidden lg:block"
          style={{ perspective: 1000 }}
        >
          <BrowserMockup />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Browser mockup (CSS only) ───────────────────────────────── */
function BrowserMockup() {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-[var(--border)]"
      style={{
        background: 'var(--card)',
        boxShadow:
          '0 0 0 1px rgba(74,222,128,0.06), 0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(74,222,128,0.06)',
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]"
        style={{ background: 'var(--bg2)' }}
      >
        {/* traffic-light dots */}
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />

        {/* fake address bar */}
        <div
          className="flex-1 mx-3 rounded-full px-3 py-1 text-xs text-[var(--muted)] font-mono"
          style={{ background: 'var(--bg3)' }}
        >
          websolutionsexpert.de
        </div>
      </div>

      {/* fake page content */}
      <div className="p-5 flex flex-col gap-4">

        {/* fake nav */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded-full bg-[var(--green)] opacity-70" />
          <div className="flex gap-2">
            {[40, 32, 40, 28].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-[var(--muted)] opacity-30" style={{ width: w }} />
            ))}
          </div>
        </div>

        {/* fake hero block */}
        <div
          className="rounded-lg p-6 flex flex-col gap-3"
          style={{ background: 'var(--bg2)' }}
        >
          <div className="h-2 w-16 rounded-full bg-[var(--green)] opacity-60" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-48 rounded-full bg-[var(--text)] opacity-70" />
            <div className="h-4 w-36 rounded-full bg-[var(--green)]" style={{ opacity: 0.9 }} />
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="h-2 w-full rounded-full bg-[var(--muted)] opacity-20" />
            <div className="h-2 w-4/5 rounded-full bg-[var(--muted)] opacity-20" />
          </div>
          <div className="flex gap-2 mt-2">
            <div className="h-7 w-24 rounded-full bg-[var(--green)] opacity-80" />
            <div
              className="h-7 w-20 rounded-full border border-[var(--border)]"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>

        {/* fake cards row */}
        <div className="grid grid-cols-3 gap-2">
          {[0.7, 0.5, 0.6].map((op, i) => (
            <div
              key={i}
              className="rounded-lg p-3 flex flex-col gap-2"
              style={{ background: 'var(--bg3)', opacity: op }}
            >
              <div className="h-2 w-8 rounded-full bg-[var(--green)]" />
              <div className="h-2 w-full rounded-full bg-[var(--muted)] opacity-40" />
              <div className="h-2 w-3/4 rounded-full bg-[var(--muted)] opacity-40" />
            </div>
          ))}
        </div>

        {/* scanning line animation */}
        <motion.div
          className="h-px w-full rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--green), transparent)' }}
          animate={{ opacity: [0, 0.6, 0], scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
        />
      </div>

      {/* subtle inner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74,222,128,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
