"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "../store/cart-store";
import { t } from "../lib/copy-dict";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const locale = useCartStore((state) => state.locale);

  return (
    <div className="min-h-screen w-full bg-[#0F0E0C] text-[#FDFBF7] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background radial glowing mesh */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute size-[350px] md:size-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none -top-12 -left-12"
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="max-w-md w-full flex flex-col items-center text-center gap-8 relative z-10">
        {/* Large 404 visual */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-8xl md:text-9xl text-[#D4AF37] font-semibold tracking-tighter opacity-70"
        >
          404
        </motion.div>

        {/* Text descriptions */}
        <div className="flex flex-col gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-2xl md:text-3xl tracking-wide"
          >
            {t("title404", locale)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-sans text-xs tracking-wider font-light leading-relaxed max-w-xs"
          >
            {t("desc404", locale)}
          </motion.p>
        </div>

        {/* Back home CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link href="/" passHref>
            <Button className="bg-[#FDFBF7] hover:bg-[#FDFBF7]/90 text-[#0F0E0C] font-semibold text-[10px] tracking-[0.25em] uppercase px-6 py-3.5 rounded-full flex items-center gap-2.5 transition-all duration-300 transform active:scale-98 group">
              <ArrowLeft strokeWidth={1.5} className="size-3.5 group-hover:-translate-x-1 transition-transform" />
              {t("goHome", locale)}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function Button({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
