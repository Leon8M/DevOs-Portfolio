import type { Metadata } from "next";
import "./globals.css";

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
      <body className="w-screen h-screen overflow-hidden bg-[#008080] font-['Tahoma',_sans-serif] text-sm">
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
