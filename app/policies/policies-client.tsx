"use client";

import React from "react";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import { ShieldAlert, Truck, RefreshCw, FileText } from "lucide-react";

export default function PoliciesClient() {
  const locale = useCartStore((state) => state.locale);

  return (
    <div className="w-full bg-[#FDFBF7] dark:bg-[#0F0E0C] pt-28 pb-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Title */}
        <div className="flex flex-col gap-3 border-b border-black/5 dark:border-white/5 pb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Maison Écorce
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#0F0E0C] dark:text-[#FDFBF7] tracking-wide">
            {t("legalTitle", locale)}
          </h1>
        </div>

        {/* Warning Banner */}
        <div className="flex gap-3 items-start bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl text-[11px] text-[#0F0E0C]/80 dark:text-[#FDFBF7]/80 leading-relaxed font-light">
          <ShieldAlert className="size-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <strong className="font-semibold">
              {locale === "en" ? "Review Required:" : "Examen requis :"}
            </strong>{" "}
            {locale === "en"
              ? "This page is a placeholder containing standard policy templates. These must be reviewed and approved by a qualified legal advisor before launch."
              : "Cette page contient des modèles de politiques standard. Ceux-ci doivent être examinés et approuvés par un conseiller juridique qualifié avant le lancement."}
          </div>
        </div>

        {/* Policy Sections */}
        <div className="flex flex-col gap-12 mt-4">
          
          {/* Shipping Policy */}
          <div className="flex flex-col gap-4 border-b border-black/5 dark:border-white/5 pb-10">
            <div className="flex items-center gap-2.5 text-[#0F0E0C] dark:text-[#FDFBF7]">
              <Truck className="size-4 text-[#D4AF37]" strokeWidth={1.5} />
              <h2 className="font-serif text-lg tracking-wider">
                {locale === "en" ? "Shipping Policy" : "Politique de Livraison"}
              </h2>
            </div>
            <div className="text-[12px] leading-relaxed text-[#0F0E0C]/70 dark:text-[#FDFBF7]/70 font-light flex flex-col gap-3">
              <p>
                {locale === "en"
                  ? "Maison Écorce offers complimentary standard shipping on all orders over €150 within the European Union. For orders under this amount, a flat shipping fee of €15 is applied at checkout."
                  : "Maison Écorce propose la livraison standard offerte pour toute commande supérieure à 150 € au sein de l'Union Européenne. Pour toute commande d'un montant inférieur, un forfait de livraison de 15 € s'applique."}
              </p>
              <p>
                {locale === "en"
                  ? "Orders are processed within 2 business days. Standard delivery timelines range from 3 to 5 business days. Express shipping is available at checkout for €30 (1-2 business days)."
                  : "Les commandes sont traitées sous 2 jours ouvrés. Les délais de livraison standard varient entre 3 et 5 jours ouvrés. La livraison express est disponible pour 30 € (1-2 jours ouvrés)."}
              </p>
            </div>
          </div>

          {/* Return Policy */}
          <div className="flex flex-col gap-4 border-b border-black/5 dark:border-white/5 pb-10">
            <div className="flex items-center gap-2.5 text-[#0F0E0C] dark:text-[#FDFBF7]">
              <RefreshCw className="size-4 text-[#D4AF37]" strokeWidth={1.5} />
              <h2 className="font-serif text-lg tracking-wider">
                {locale === "en" ? "Returns & Exchanges" : "Retours & Échanges"}
              </h2>
            </div>
            <div className="text-[12px] leading-relaxed text-[#0F0E0C]/70 dark:text-[#FDFBF7]/70 font-light flex flex-col gap-3">
              <p>
                {locale === "en"
                  ? "We want you to be fully satisfied with your purchase. You have 30 days from the date of receiving your parcel to request a return and obtain a refund or exchange."
                  : "Nous souhaitons que vous soyez pleinement satisfait de vos pièces. Vous disposez d'un délai de 30 jours à compter de la réception de votre colis pour initier un retour et obtenir un remboursement ou un échange."}
              </p>
              <p>
                {locale === "en"
                  ? "Items must be returned in their original packaging, unworn, unwashed, and in pristine condition. All leather tags must be attached. Return shipping fees are at the customer's expense."
                  : "Les articles doivent être retournés dans leur emballage d'origine, non portés, non lavés et dans un état impeccable. Les étiquettes en cuir doivent rester attachées. Les frais de retour sont à la charge du client."}
              </p>
            </div>
          </div>

          {/* Terms of Use */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-[#0F0E0C] dark:text-[#FDFBF7]">
              <FileText className="size-4 text-[#D4AF37]" strokeWidth={1.5} />
              <h2 className="font-serif text-lg tracking-wider">
                {locale === "en" ? "Terms of Use" : "Conditions d'Utilisation"}
              </h2>
            </div>
            <div className="text-[12px] leading-relaxed text-[#0F0E0C]/70 dark:text-[#FDFBF7]/70 font-light flex flex-col gap-3">
              <p>
                {locale === "en"
                  ? "By browsing and purchasing from Maison Écorce, you agree to our Terms of Use. We reserve the right to modify prices and collection availabilities at any time without notice."
                  : "En naviguant et en effectuant des achats sur Maison Écorce, vous acceptez nos conditions d'utilisation. Nous nous réservons le droit de modifier les prix et la disponibilité des collections à tout moment sans préavis."}
              </p>
              <p>
                {locale === "en"
                  ? "This storefront represents a mock environment designed for portfolio presentation. No real sales are conducted through this interface; all checkout redirects resolve to Shopify test checkouts."
                  : "Ce site représente une boutique de démonstration conçue à des fins de présentation. Aucune transaction réelle n'est effectuée sur cette interface ; les redirections de caisse mènent à des environnements de test Shopify."}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
