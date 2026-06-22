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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Aref+Ruqaa:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-text min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[2147483647] focus:px-4 focus:py-2 focus:bg-surface focus:text-text focus:border focus:border-gold-accent focus:rounded-sm focus:outline-none"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
