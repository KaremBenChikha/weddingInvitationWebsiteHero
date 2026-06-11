import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aicha & Zakaria — Mariage / زفاف",
  description:
    "Vous êtes invité·e au mariage d'Aicha & Zakaria — 11 Juillet 2026, Trois-Rivières, Québec",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Aicha & Zakaria — Wedding Invitation",
    description:
      "Join us for our wedding celebration — 11 July 2026, Trois-Rivières, Québec",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-surface text-text min-h-screen">{children}</body>
    </html>
  );
}
