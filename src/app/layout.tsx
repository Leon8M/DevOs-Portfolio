import type { Metadata } from 'next';
import './globals.css';

const title = 'Leon M. Njeru | Full-Stack & DevOps Engineer';
const description =
  'Portfolio of Leon M. Njeru, a Nairobi-based Full-Stack & DevOps Engineer (Spring Boot, Python, React, Docker, Linux). ' +
  'Explore projects, experience and certificates in LeonOS, a Windows XP-style desktop.';

export const metadata: Metadata = {
  metadataBase: new URL('https://leonosportfolio.vercel.app'),
  title,
  description,
  authors: [{ name: 'Leon M. Njeru' }],
  keywords: ['Leon Njeru', 'Leon Munene', 'Full-Stack Engineer', 'DevOps Engineer', 'Spring Boot', 'Next.js', 'Nairobi', 'portfolio'],
  icons: { icon: '/xp-icons/start-icon.svg' },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'LeonOS',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Browser extensions (Grammarly, Dark Reader, password managers...) add attributes to
    // <html>/<body> before React hydrates. suppressHydrationWarning only ignores attribute
    // differences on these two tags; mismatches inside the app are still reported.
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen w-screen overflow-hidden bg-black font-xp-ui text-sm" suppressHydrationWarning>
        <main className="h-full w-full">{children}</main>
      </body>
    </html>
  );
}
