'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useRouter, usePathname } from '@/lib/navigation';

const WHATSAPP_URL = 'https://wa.me/4915236933626';

const NAV_LINKS = [
  { key: 'services', href: '#services' },
  { key: 'process',  href: '#process'  },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact',  href: '#contact'  },
] as const;

export default function Navbar() {
  const t       = useTranslations('nav');
  const locale  = useLocale();
  const router  = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── scroll shrink (CSS transition fallback) ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  function switchLocale(next: 'de' | 'ru') {
    router.replace(pathname, { locale: next });
  }

  return (
    <motion.header
      initial={false}
      className={[
        'fixed inset-x-0 top-0 z-50',
        'border-b border-[var(--border)]',
        'backdrop-blur-md',
        'transition-[padding,background-color] duration-300',
        scrolled
          ? 'py-2 bg-[rgba(10,14,11,0.92)]'
          : 'py-4 bg-[rgba(10,14,11,0.6)]',
      ].join(' ')}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex-shrink-0 font-[family-name:var(--font-unbounded)] font-bold text-base leading-none select-none">
          <span className="text-[var(--text)]">WebSolutions</span>
          <span className="text-[var(--green)]">Expert</span>
        </Link>

        {/* ── Desktop nav ── */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted)]">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="hover:text-[var(--text)] transition-colors duration-150"
                onClick={() => setMenuOpen(false)}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right cluster ── */}
        <div className="hidden md:flex items-center gap-3">
          {/* locale switcher */}
          <div className="flex items-center gap-1 rounded-full border border-[var(--border)] p-1">
            {(['de', 'ru'] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={[
                  'px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all duration-200',
                  locale === loc
                    ? 'bg-[var(--green)] text-[var(--bg)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]',
                ].join(' ')}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
              'bg-[#25D366] text-white',
              'shadow-[0_0_20px_rgba(37,211,102,0.25)]',
              'hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]',
              'hover:bg-[#1ebe5c]',
              'transition-all duration-200',
            ].join(' ')}
          >
            <WhatsAppIcon />
            {locale === 'de' ? 'Schreiben' : 'Написать'}
          </a>
        </div>

        {/* ── Hamburger ── */}
        <button
          className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden border-t border-[var(--border)] bg-[rgba(10,14,11,0.97)]"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] border-b border-[var(--border)] last:border-0 transition-colors"
                >
                  {t(key)}
                </a>
              ))}

              {/* locale + CTA row */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-1 rounded-full border border-[var(--border)] p-1">
                  {(['de', 'ru'] as const).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={[
                        'px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all duration-200',
                        locale === loc
                          ? 'bg-[var(--green)] text-[var(--bg)]'
                          : 'text-[var(--muted)] hover:text-[var(--text)]',
                      ].join(' ')}
                    >
                      {loc}
                    </button>
                  ))}
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-[#25D366] text-white"
                >
                  <WhatsAppIcon />
                  {locale === 'de' ? 'Schreiben' : 'Написать'}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── Icon sub-components ──────────────────────────────────────── */

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <motion.line
        x1="2" y1="6" x2="20" y2="6"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ originX: '50%', originY: '50%' }}
      />
      <motion.line
        x1="2" y1="11" x2="20" y2="11"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        style={{ originX: '50%', originY: '50%' }}
      />
      <motion.line
        x1="2" y1="16" x2="20" y2="16"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ originX: '50%', originY: '50%' }}
      />
    </svg>
  );
}
