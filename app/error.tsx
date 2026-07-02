"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error Boundary caught]:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-[#0F0E0C] text-[#FDFBF7] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background radial glowing mesh */}
      <div className="absolute size-[350px] md:size-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none -top-12 -left-12" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="max-w-md w-full flex flex-col items-center text-center gap-8 relative z-10">
        {/* Large Visual */}
        <div className="font-serif text-5xl md:text-6xl text-[#D4AF37] font-semibold tracking-tighter uppercase italic leading-none">
          Erreur Système
        </div>

        {/* Text descriptions */}
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-lg md:text-xl tracking-wide uppercase">
            Une interruption est survenue
          </h1>
          <p className="font-sans text-xs tracking-wider font-light leading-relaxed max-w-xs text-[#FDFBF7]/60">
            {error.message || "Une erreur inattendue a perturbé la connexion avec nos serveurs toscans."}
          </p>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-2">
          {/* Try again */}
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0F0E0C] font-mono text-[10px] font-bold tracking-[0.25em] uppercase px-6 h-12 border border-[#D4AF37] rounded-none flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-98 cursor-pointer shadow-brutal hover:shadow-none"
          >
            <RefreshCw strokeWidth={2.5} className="size-3.5" />
            Réessayer
          </button>

          {/* Back Home */}
          <Link href="/" passHref className="w-full sm:w-auto">
            <button className="w-full bg-transparent hover:bg-[#FDFBF7]/5 text-[#FDFBF7] font-mono text-[10px] font-bold tracking-[0.25em] uppercase px-6 h-12 border border-[#FDFBF7]/20 rounded-none flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-98 cursor-pointer">
              <ArrowLeft strokeWidth={2.5} className="size-3.5" />
              Retour Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
