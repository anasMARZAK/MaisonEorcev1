"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useCartStore } from "../../store/cart-store";
import { t, CopyKey } from "../../lib/copy-dict";
import { newsletterSchema, NewsletterInput } from "../../schemas/forms";
import dompurify from "dompurify";

export default function Footer() {
  const locale = useCartStore((state) => state.locale);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  // Newsletter signup mutation stub
  const signupMutation = useMutation({
    mutationFn: async (email: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      const cleanEmail = dompurify.sanitize(email);
      if (!cleanEmail.includes("@")) {
        throw new Error(
          locale === "en" ? "Invalid email address" : "Adresse email invalide"
        );
      }
      return cleanEmail;
    },
    onSuccess: () => {
      toast.success(t("newsletterSuccess", locale));
      reset();
    },
    onError: (err: { message?: string }) => {
      toast.error(err.message || t("errorMsg", locale));
    },
  });

  const onSubmit = (data: NewsletterInput) => {
    signupMutation.mutate(data.email);
  };

  return (
    <footer className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] text-[#1A1917] dark:text-[#F5F3EE] border-t-4 border-[#1A1917] dark:border-[#F5F3EE] pt-24 pb-12 font-sans text-xs tracking-wider relative z-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-[#1A1917]/10 dark:border-[#F5F3EE]/15">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4 md:border-r border-[#1A1917]/20 dark:border-[#F5F3EE]/20 pr-4">
          <h3 className="font-serif text-lg tracking-[0.25em] font-extrabold text-[#1A1917] dark:text-[#F5F3EE] uppercase">
            Maison Écorce
          </h3>
          <p className="max-w-[200px] leading-relaxed text-[#1A1917]/75 dark:text-[#F5F3EE]/75 font-light">
            {t("heroSubtitle", locale)}
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 items-center mt-2 text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
            <a href="#" className="hover:text-[#C49B66] transition-colors" aria-label="Instagram">
              <Instagram strokeWidth={1.5} className="size-4" />
            </a>
            <a href="#" className="hover:text-[#C49B66] transition-colors" aria-label="Facebook">
              <Facebook strokeWidth={1.5} className="size-4" />
            </a>
            <a href="#" className="hover:text-[#C49B66] transition-colors" aria-label="Twitter">
              <Twitter strokeWidth={1.5} className="size-4" />
            </a>
          </div>
        </div>

        {/* Directory Navigation */}
        <div className="flex flex-col gap-4 md:border-r border-[#1A1917]/20 dark:border-[#F5F3EE]/20 pr-4">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1A1917] dark:text-[#F5F3EE] font-bold">
            {t("navShop", locale)}
          </h4>
          <ul className="flex flex-col gap-2.5 font-mono text-[10px] font-bold text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
            <li>
              <Link href="/products?collection=bottes" className="hover:text-[#C49B66] transition-colors">
                {locale === "en" ? "Boots" : "Bottes"}
              </Link>
            </li>
            <li>
              <Link href="/products?collection=sandales" className="hover:text-[#C49B66] transition-colors">
                {locale === "en" ? "Sandals" : "Sandales"}
              </Link>
            </li>
            <li>
              <Link href="/products?collection=sacs-en-cuir" className="hover:text-[#C49B66] transition-colors">
                {locale === "en" ? "Leather Bags" : "Sacs en Cuir"}
              </Link>
            </li>
            <li>
              <Link href="/products?collection=sacs" className="hover:text-[#C49B66] transition-colors">
                {locale === "en" ? "Bags (All)" : "Sacs (Tous)"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Information / Policies */}
        <div className="flex flex-col gap-4 md:border-r border-[#1A1917]/20 dark:border-[#F5F3EE]/20 pr-4">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1A1917] dark:text-[#F5F3EE] font-bold">
            Information
          </h4>
          <ul className="flex flex-col gap-2.5 font-mono text-[10px] font-bold text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
            <li>
              <Link href="/about" className="hover:text-[#C49B66] transition-colors">
                {t("navAbout", locale)}
              </Link>
            </li>
            <li>
              <Link href="/policies" className="hover:text-[#C49B66] transition-colors">
                {t("navPolicies", locale)}
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-[#C49B66] transition-colors">
                {locale === "en" ? "Press Room" : "Presse"}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#C49B66] transition-colors">
                {locale === "en" ? "Contact Us" : "Nous Contacter"}
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1A1917] dark:text-[#F5F3EE] font-bold">
            {t("newsletterTitle", locale)}
          </h4>
          <p className="leading-relaxed text-[#1A1917]/75 dark:text-[#F5F3EE]/75 font-light mb-2">
            {t("newsletterDesc", locale)}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-2 w-full">
            
            {/* Input Wrap - Industrial flat border card */}
            <div className="flex border-2 border-[#1A1917] dark:border-[#F5F3EE] bg-transparent rounded-none overflow-hidden h-11">
              <input
                type="text"
                placeholder={t("newsletterPlaceholder", locale)}
                {...register("email")}
                className="bg-transparent text-[#1A1917] dark:text-[#F5F3EE] placeholder-[#1A1917]/40 w-full outline-none px-4 py-2 font-mono text-[10px] uppercase font-bold"
                disabled={signupMutation.isPending}
              />
              <button
                type="submit"
                className="bg-[#1A1917] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#1A1917] px-5 hover:bg-[#1A1917]/85 dark:hover:bg-[#F5F3EE]/85 transition-all font-mono text-[10px] font-bold border-l-2 border-[#1A1917] dark:border-[#F5F3EE] cursor-pointer"
                disabled={signupMutation.isPending}
              >
                SUBMIT
              </button>
            </div>
            
            {/* Localized Validation Message */}
            {errors.email && (
              <span className="text-red-600 dark:text-red-400 text-[10px] mt-1 font-mono font-bold uppercase tracking-wider">
                {t((errors.email.message || "errorMsg") as CopyKey, locale)}
              </span>
            )}
          </form>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-6xl mx-auto px-6 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[#1A1917]/75 dark:text-[#F5F3EE]/75 text-[9px] tracking-widest font-mono uppercase font-semibold">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <span>© 2026 MAISON ÉCORCE. Tous droits réservés.</span>
          <span className="hidden md:inline">•</span>
          <span className="font-light">Design de Réf. MAISON ORIA</span>
        </div>

        {/* Monospaced outline badges */}
        <div className="flex gap-2.5 items-center font-mono text-[8px] font-bold">
          <span className="border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 px-2 py-0.5 rounded-none">Visa</span>
          <span className="border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 px-2 py-0.5 rounded-none">MC</span>
          <span className="border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 px-2 py-0.5 rounded-none">Amex</span>
          <span className="border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 px-2 py-0.5 rounded-none">Apple Pay</span>
        </div>
      </div>
    </footer>
  );
}
