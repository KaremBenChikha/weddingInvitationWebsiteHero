import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aicha & Zackaria — Mariage / زفاف",
  description:
    "Vous êtes invité·e au mariage d'Aicha & Zackaria — 11 Juillet 2026, Trois-Rivières, Québec",
  openGraph: {
    title: "Aicha & Zackaria — Wedding Invitation",
    description:
      "Join us for our wedding celebration — 11 July 2026, Trois-Rivières, Québec",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
