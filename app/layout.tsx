import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FH2-AtlataSanad Automation PDF",
  "operatingSystem": "All",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MAD"
  },
  "author": {
    "@type": "Person",
    "name": "AYOUB ERRAKI"
  },
  "description": "Formulaire électronique de remplissage automatisé pour le bulletin FH2S / AtlataSanad."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F2S3JZ3CTP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F2S3JZ3CTP');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
