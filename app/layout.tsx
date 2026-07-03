import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "../components/providers";
import LenisProvider from "../components/lenis-provider";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import PromoTicker from "../components/layout/promo-ticker";
import CartDrawer from "../components/layout/cart-drawer";
import LoadingScreen from "../components/layout/loading-screen";
import PurchaseNotification from "../components/layout/purchase-notification";
import { getStoreDomain } from "../lib/shopify/client";

// Load Google Fonts for premium Editorial Luxury style
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Maison Écorce | Souliers & Maroquinerie d'Exception",
    template: "%s | Maison Écorce",
  },
  description:
    "Maison Écorce crée des bottes, sandales et sacs en cuir d'exception, alliant rigueur architecturale, matières organiques durables et savoir-faire toscan.",
  metadataBase: new URL("https://maison-ecorce.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maison Écorce | Souliers & Maroquinerie d'Exception",
    description:
      "Découvrez notre collection de bottes, sandales et maroquinerie haut de gamme fabriqués à la main en Toscane.",
    url: "https://maison-ecorce.vercel.app",
    siteName: "Maison Écorce",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Maison Écorce Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Écorce | Souliers & Maroquinerie d'Exception",
    description:
      "Façonné à la main en Toscane. Matières durables et design intemporel.",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const domain = getStoreDomain();
  const shopifyOrigin = domain ? `https://${domain}` : "";

  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {shopifyOrigin && (
          <>
            <link rel="preconnect" href={shopifyOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={shopifyOrigin} />
          </>
        )}
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        {/* Client-side Providers wrapper */}
        <Providers>
          {/* Client-side smooth scroll wrapper */}
          <LenisProvider>
            {/* Global Loading screen */}
            <LoadingScreen />

            {/* Global background noise texture */}
            <div className="noise-bg" aria-hidden="true" />

            {/* Layout Ticker */}
            <PromoTicker />

            {/* Navigation Header */}
            <Header />

            {/* Main view container */}
            <main className="flex-1 flex flex-col">{children}</main>

            {/* Persistent Cart drawer */}
            <CartDrawer />

            {/* Live Purchase notifications */}
            <PurchaseNotification />

            {/* Footer */}
            <Footer />
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
