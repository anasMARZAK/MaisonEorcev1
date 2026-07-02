import type { Metadata } from "next";
import Hero from "../components/home/hero";
import Collections from "../components/home/collections";
import Bestsellers from "../components/home/bestsellers";
import Reviews from "../components/home/reviews";
import Ugc from "../components/home/ugc";
import PromoCountdown from "../components/home/promo-countdown";

export const metadata: Metadata = {
  title: "Maison Écorce | Haute Maroquinerie & Souliers Toscans",
  description:
    "Découvrez l'excellence de la maroquinerie italienne. Bottes, sandales et sacs fabriqués à la main en Toscane avec des cuirs à tannage végétal durables.",
  alternates: {
    canonical: "https://maison-ecorce.vercel.app",
  },
};

export default function Home() {
  const brandTickerValues = [
    "Tannage Végétal Certifié",
    "Cousu Blake Artisanal",
    "Cuir de Veau Pleine Fleur",
    "Conçu pour Durer",
    "Atelier en Toscane",
  ];

  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* 1. Full height Hero */}
      <Hero />

      {/* 2. Secondary brand values ticker scroll - Reverse flow */}
      <div className="w-full bg-[#0F0E0C] text-[#FDFBF7] py-4 overflow-hidden border-t border-b border-white/5 relative z-20 text-[10px] font-sans tracking-[0.25em] uppercase font-semibold">
        <div className="flex whitespace-nowrap">
          <div className="flex shrink-0 animate-marquee-slow gap-16 pr-16 items-center">
            {brandTickerValues.map((val) => (
              <React.Fragment key={val}>
                <span>{val}</span>
                <span className="text-[#D4AF37]">•</span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee-slow gap-16 pr-16 items-center" aria-hidden="true">
            {brandTickerValues.map((val) => (
              <React.Fragment key={val}>
                <span>{val}</span>
                <span className="text-[#D4AF37]">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Curated Collections grid */}
      <Collections />

      {/* 4. Bestsellers highlights */}
      <Bestsellers />

      {/* 5. Countdown promo block */}
      <PromoCountdown />

      {/* 6. Client reviews deck */}
      <Reviews />

      {/* 7. Instagram UGC wall */}
      <Ugc />
    </div>
  );
}

// React import to comply with TSX compiler in Next.js
import React from "react";
