"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";

export default function Header() {
  const { totalItems, isOpen, setIsOpen, locale, setLocale } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLocale(locale === "fr" ? "en" : "fr");
  };

  const navItems = [
    { href: "/products", labelKey: "navShop" as const },
    { href: "/about", labelKey: "navAbout" as const },
    { href: "/policies", labelKey: "navPolicies" as const },
  ];

  return (
    <div className="relative z-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F3EE] dark:bg-[#1A1917] border-b-2 border-[#1A1917] dark:border-[#F5F3EE] h-16 flex items-center justify-between px-6 md:px-12 w-full">
        
        {/* Left: Logo - Big Serif Couture Branding */}
        <Link href="/" className="flex items-center">
          <span className="font-serif text-base md:text-lg tracking-[0.25em] font-extrabold text-[#1A1917] dark:text-[#F5F3EE] uppercase">
            Maison Écorce
          </span>
        </Link>

        {/* Center: Editorial Monospace Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-[#1A1917] dark:hover:text-[#F5F5F5] transition-colors duration-200 relative py-1 ${
                  active ? "text-[#1A1917] dark:text-[#F5F3EE] font-extrabold" : ""
                }`}
              >
                {t(item.labelKey, locale)}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A1917] dark:bg-[#F5F3EE]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Monospace Action items */}
        <div className="flex items-center gap-6 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1A1917] dark:text-[#F5F3EE]">
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="hover:underline transition-all py-1 cursor-pointer"
            title="Toggle Language"
          >
            LN: <span className="text-[#C49B66]">{locale}</span>
          </button>

          {/* Text-based Cart Trigger - Brutalist styling */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border border-[#1A1917] dark:border-[#F5F3EE] hover:bg-[#1A1917] hover:text-[#F5F3EE] dark:hover:bg-[#F5F3EE] dark:hover:text-[#1A1917] px-4 py-1.5 transition-all duration-200 cursor-pointer"
            title={t("cartTitle", locale)}
          >
            BAG ({totalItems})
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center cursor-pointer p-1"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? (
              <X strokeWidth={2} className="size-5 text-[#1A1917] dark:text-[#F5F3EE]" />
            ) : (
              <Menu strokeWidth={2} className="size-5 text-[#1A1917] dark:text-[#F5F3EE]" />
            )}
          </button>

        </div>

      </header>

      {/* Mobile Editorial Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-[#F5F3EE] dark:bg-[#1A1917] border-b-2 border-[#1A1917] dark:border-[#F5F3EE] flex flex-col justify-between px-6 py-16 text-[#1A1917] dark:text-[#F5F3EE] md:hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

            {/* Links */}
            <nav className="flex flex-col gap-8 z-10">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-4xl font-extrabold tracking-wider hover:text-[#C49B66] transition-colors block italic lowercase"
                  >
                    {t(item.labelKey, locale)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom taglines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="z-10 flex flex-col gap-1.5 text-[9px] tracking-[0.2em] font-mono uppercase"
            >
              <p>Maison Écorce Paris — Florence</p>
              <p>© 2026. Blake stitched craft.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
