import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier animé — Exercices d’animations CSS",
  description: "Un atelier interactif pour apprendre les animations CSS avec des cartes de jeu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
