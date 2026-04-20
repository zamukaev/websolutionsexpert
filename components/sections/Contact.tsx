'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/4915236933626';
const EMAIL = 'info@websolutionsexpert.de';

/* ── animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

/* ── component ───────────────────────────────────────────────── */
export default function Contact() {
  const t = useTranslations('contact');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(74,222,128,0.10) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="mx-auto max-w-[780px] px-4 sm:px-6 text-center">

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-8"
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green)] font-[family-name:var(--font-unbounded)]"
          >
            {t('label')}
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-[family-name:var(--font-unbounded)] text-[var(--text)] leading-[1.1]"
          >
            {t('title')}{' '}
            <span
              className="text-[var(--green)]"
              style={{ textShadow: '0 0 40px rgba(74,222,128,0.35)' }}
            >
              {t('titleHighlight')}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base text-[var(--muted)] font-[family-name:var(--font-onest)] font-light leading-relaxed max-w-lg"
          >
            {t('subtitle')}
          </motion.p>

          {/* Action buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold',
                'bg-[#25D366] text-white',
                'shadow-[0_0_28px_rgba(37,211,102,0.3)]',
                'hover:bg-[#1ebe5c] hover:shadow-[0_0_40px_rgba(37,211,102,0.45)]',
                'transition-all duration-200',
              ].join(' ')}
            >
              <WhatsAppIcon />
              {t('ctaWhatsapp')}
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className={[
                'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium',
                'bg-transparent text-[var(--green)]',
                'border border-[var(--border)]',
                'hover:border-[var(--green)] hover:bg-[var(--green-glow)]',
                'transition-all duration-200',
              ].join(' ')}
            >
              <EmailIcon />
              {t('ctaEmail')}
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 w-full max-w-sm">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs text-[var(--muted)] font-[family-name:var(--font-onest)] whitespace-nowrap">
              {t('divider')}
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </motion.div>

          {/* Contact form */}
          <motion.div variants={fadeUp} className="w-full">
            <ContactForm t={t} />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

/* ── contact form ────────────────────────────────────────────── */
function ContactForm({ t }: { t: ReturnType<typeof useTranslations<'contact'>> }) {
  const [name, setName]     = useState('');
  const [phone, setPhone]   = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setName('');
      setPhone('');
      setMessage('');
      setTimeout(() => setSent(false), 3000);
    }, 700);
  }

  const inputCls = [
    'w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200',
    'font-[family-name:var(--font-onest)] text-[var(--text)] placeholder:text-[var(--muted)]',
    'focus:border-[var(--green)] focus:shadow-[0_0_0_2px_rgba(74,222,128,0.12)]',
  ].join(' ');

  const inputStyle = {
    background: 'var(--card)',
    border: '1px solid var(--border)',
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl p-6 sm:p-8 text-left flex flex-col gap-4"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
    >
      {/* Name + Phone row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('form.name')}
          className={inputCls}
          style={inputStyle}
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t('form.phone')}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      {/* Message */}
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t('form.message')}
        rows={4}
        className={`${inputCls} resize-none`}
        style={inputStyle}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || sent}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold',
          'transition-all duration-200 self-start',
          sent
            ? 'bg-[var(--green)] text-[var(--bg)]'
            : loading
            ? 'opacity-60 cursor-not-allowed bg-[var(--green)] text-[var(--bg)]'
            : [
                'bg-[var(--green)] text-[var(--bg)]',
                'hover:bg-[var(--green-dim)] shadow-[0_0_24px_var(--green-glow)]',
                'hover:shadow-[0_0_36px_var(--green-glow)]',
              ].join(' '),
        ].join(' ')}
      >
        {sent ? t('form.sent') : loading ? t('form.sending') : t('form.submit')}
      </button>
    </form>
  );
}

/* ── icon sub-components ─────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  );
}
