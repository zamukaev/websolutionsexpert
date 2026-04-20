import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

const NAV_LINKS = [
  { key: 'services',  href: '#services'  },
  { key: 'process',   href: '#process'   },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact',   href: '#contact'   },
] as const;

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-4 items-start">

          {/* ── Column 1: Logo + tagline ── */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="font-[family-name:var(--font-unbounded)] font-bold text-sm leading-none select-none w-fit"
            >
              <span className="text-[var(--text)]">WebSolutions</span>
              <span className="text-[var(--green)]">Expert</span>
            </Link>
            <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-onest)] leading-relaxed max-w-[200px]">
              {t('footer.tagline')}
            </p>
          </div>

          {/* ── Column 2: Nav links ── */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-xs text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-150 font-[family-name:var(--font-onest)]"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Column 3: Copyright ── */}
          <div className="flex flex-col gap-1 sm:text-right">
            <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-onest)]">
              © {year} WebSolutionsExpert
            </p>
            <p className="text-xs text-[var(--muted)] font-[family-name:var(--font-onest)]">
              {t('footer.rights')}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
