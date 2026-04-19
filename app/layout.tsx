import type { Metadata } from 'next';
import { Unbounded, Onest } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Web Solutions Expert',
  description: 'Professionelle Webentwicklung & Design',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${unbounded.variable} ${onest.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
