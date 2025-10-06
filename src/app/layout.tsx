import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "LeonOS - XP Portfolio",
  description: "A retro Windows XP-themed developer portfolio by Leon Munene.",
  icons: {
    icon: "/xp-icons/start-icon.svg", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} w-screen h-screen overflow-hidden bg-[#008080] font-sans text-sm`}>
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
