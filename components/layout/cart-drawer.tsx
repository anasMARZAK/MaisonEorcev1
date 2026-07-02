"use client";

import React from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { useCartStore } from "../../store/cart-store";
import { useCart } from "../../hooks/use-cart";
import { t } from "../../lib/copy-dict";
import { Trash, ArrowRight, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { cartItems, totalPrice, locale } = useCartStore();
  const { isOpen, setIsOpen, updateQuantity, removeItem, checkoutUrl, isLoading, isUpdating } = useCart();

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md bg-[#F5F3EE] dark:bg-[#1A1917] text-[#1A1917] dark:text-[#F5F3EE] flex flex-col h-full border-l-4 border-[#1A1917] dark:border-[#F5F3EE] p-0 z-50 rounded-none">
        
        {/* Header */}
        <SheetHeader className="p-6 border-b-2 border-[#1A1917] dark:border-[#F5F3EE] flex flex-col gap-1 text-left">
          <SheetTitle className="font-serif text-2xl font-extrabold tracking-wider text-[#1A1917] dark:text-[#F5F3EE] uppercase italic">
            {t("cartTitle", locale)}
          </SheetTitle>
          <SheetDescription className="text-[9px] tracking-[0.25em] uppercase text-[#1A1917]/50 dark:text-[#F5F3EE]/50 font-mono font-bold">
            Maison Écorce Shopping Bag
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          <AnimatePresence initial={false}>
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-64 text-center gap-6"
              >
                <p className="font-serif italic text-xl text-[#1A1917]/40 dark:text-[#F5F3EE]/40">
                  {t("cartEmpty", locale)}
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none px-6 py-2 bg-transparent text-[#1A1917] dark:text-[#F5F3EE] font-mono text-[10px] uppercase font-bold tracking-widest hover:bg-[#1A1917] hover:text-[#F5F3EE] dark:hover:bg-[#F5F3EE] dark:hover:text-[#1A1917] transition-all cursor-pointer"
                >
                  {t("continueShopping", locale)}
                </button>
              </motion.div>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-transparent border border-[#1A1917]/20 dark:border-[#F5F3EE]/20 hover:border-[#1A1917] dark:hover:border-[#F5F3EE] p-4 rounded-none transition-all flex gap-4 items-center relative"
                >
                  
                  {/* Item Image */}
                  <div className="relative size-20 rounded-none overflow-hidden border border-[#1A1917]/10 dark:border-[#F5F3EE]/10 bg-transparent shrink-0">
                    {item.merchandise.image ? (
                      <Image
                        src={item.merchandise.image.url}
                        alt={item.merchandise.image.altText || item.merchandise.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <span className="font-serif text-sm font-extrabold leading-tight text-[#1A1917] dark:text-[#F5F3EE] uppercase tracking-wide">
                      {item.merchandise.product.title}
                    </span>
                    
                    {/* Options (Size/Color) */}
                    <span className="text-[9px] font-mono tracking-wider text-[#1A1917]/50 dark:text-[#F5F3EE]/50 uppercase font-semibold">
                      {item.merchandise.selectedOptions.map((o) => o.value).join(" / ")}
                    </span>

                    {/* Pricing and Controls */}
                    <div className="flex items-center justify-between mt-3 gap-2">
                      
                      {/* Industrial Monospace Quantity Controls */}
                      <div className="flex items-center border border-[#1A1917] dark:border-[#F5F3EE] rounded-none h-7">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isUpdating}
                          className="px-2.5 hover:bg-[#1A1917]/10 dark:hover:bg-[#F5F3EE]/10 h-full text-[#1A1917]/70 dark:text-[#F5F3EE]/70 font-mono text-xs cursor-pointer font-bold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 text-[10px] font-mono font-bold min-w-[24px] text-center border-x border-[#1A1917] dark:border-[#F5F3EE] text-[#1A1917] dark:text-[#F5F3EE]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isUpdating}
                          className="px-2.5 hover:bg-[#1A1917]/10 dark:hover:bg-[#F5F3EE]/10 h-full text-[#1A1917]/70 dark:text-[#F5F3EE]/70 font-mono text-xs cursor-pointer font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Monospace Price Tag */}
                      <span className="text-[11px] font-mono font-bold text-[#1A1917] dark:text-[#F5F3EE]">
                        {(parseFloat(item.merchandise.price.amount) * item.quantity).toFixed(2)}{" "}
                        {item.merchandise.price.currencyCode === "EUR" ? "€" : item.merchandise.price.currencyCode}
                      </span>

                    </div>
                  </div>

                  {/* Absolute positioning of close action to match print invoice layouts */}
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={isUpdating}
                    className="absolute top-2 right-2 p-1 text-[#1A1917]/30 hover:text-red-700 dark:text-[#F5F3EE]/30 dark:hover:text-red-400 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash className="size-3.5" strokeWidth={2} />
                  </button>

                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t-2 border-[#1A1917] dark:border-[#F5F3EE] bg-[#F5F3EE] dark:bg-[#1A1917] flex flex-col gap-4">
            
            {/* Totals */}
            <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917] dark:text-[#F5F3EE]">
              <span>{t("subtotal", locale)}</span>
              <span className="text-base font-extrabold">
                {totalPrice.toFixed(2)}{" "}
                {cartItems[0]?.merchandise.price.currencyCode === "EUR" ? "€" : cartItems[0]?.merchandise.price.currencyCode}
              </span>
            </div>

            {/* Warning Message - Coupon Cutout Look */}
            <div className="flex gap-2.5 items-start border-2 border-dashed border-[#1A1917] dark:border-[#F5F3EE] p-3 text-[10px] text-[#1A1917]/70 dark:text-[#F5F3EE]/70 leading-normal font-mono uppercase font-bold bg-[#e9e5db]/30 dark:bg-[#2c2b28]/30">
              <ShieldAlert className="size-4 text-[#C49B66] shrink-0" strokeWidth={2} />
              <span>{t("checkoutWarning", locale)}</span>
            </div>

            {/* Checkout CTA - Brutalist thick shadow button */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || isUpdating}
              className="w-full bg-[#1A1917] hover:bg-[#F5F3EE] text-[#F5F3EE] hover:text-[#1A1917] dark:bg-[#F5F3EE] dark:hover:bg-[#1A1917] dark:text-[#1A1917] dark:hover:text-[#F5F3EE] border-2 border-[#1A1917] dark:border-[#F5F3EE] h-12 text-[10px] font-mono tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-brutal hover:shadow-none cursor-pointer"
            >
              {t("checkoutBtn", locale)}
              <ArrowRight strokeWidth={2.5} className="size-3.5" />
            </button>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
