import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://websolutionsexpert.de';

const META: Record<string, { title: string; description: string; keywords: string; ogLocale: string }> = {
  de: {
    title: 'WebSolutionsExpert – Websites & Apps nach Maß | Berlin',
    description:
      'Professionelle Webentwicklung in Berlin: Landingpages, Online-Shops, Mobile Apps, Telegram-Bots und Web-Apps. Schnell, modern, zuverlässig.',
    keywords:
      'Webentwicklung Berlin, Landingpage, Online-Shop, Mobile App, Telegram Bot, Next.js, React, Webdesign',
    ogLocale: 'de_DE',
  },
  ru: {
    title: 'WebSolutionsExpert – Сайты и приложения под ключ | Берлин',
    description:
      'Профессиональная веб-разработка в Берлине: лендинги, интернет-магазины, мобильные приложения, Telegram-боты и веб-приложения. Быстро, современно, надёжно.',
    keywords:
      'веб-разработка Берлин, лендинг, интернет-магазин, мобильное приложение, Telegram бот, Next.js, React, веб-дизайн',
    ogLocale: 'ru_RU',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.de;
  const canonical = `${SITE_URL}/${locale}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical,
      languages: {
        'de': `${SITE_URL}/de`,
        'ru': `${SITE_URL}/ru`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      siteName: 'WebSolutionsExpert',
      locale: m.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}
