import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageSwitcher from "./language-switcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suzy-laboratory.suzywang168.chatgpt.site"),
  title: "Suzy Laboratory — Anime, Film & Product Design",
  description: "Independent product and visual laboratory by Suzy Wang, exploring anime, AI filmmaking, creative technology and complex digital products.",
  keywords: ["Suzy Wang", "Suzy Laboratory", "anime product design", "AI filmmaking", "Reelay", "Jetsen", "creative technology"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Suzy Laboratory — Anime, Film & Product Design",
    description: "Selected work across anime, AI filmmaking, creative technology and digital product systems.",
    type: "website",
    url: "/",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <LanguageSwitcher />
      </body>
    </html>
  );
}
