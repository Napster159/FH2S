import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "FH2-AtlataSanad | Formulaire Électronique de Remplissage FH2S",
  description: "Solution gratuite de remplissage automatisé du Bulletin FH2S pour AtlataSanad. Génération de PDF sécurisée et locale par AYOUB ERRAKI.",
  keywords: ["FH2", "FH2S", "AtlataSanad", "Remplissage PDF", "Automatisation", "Formulaire Électronique", "AYOUB ERRAKI"],
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/512/11733/11733416.png",
    shortcut: "https://cdn-icons-png.flaticon.com/512/11733/11733416.png",
    apple: "https://cdn-icons-png.flaticon.com/512/11733/11733416.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
