"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { shopifyClient } from "../../lib/shopify";
import { useCartStore } from "../../store/cart-store";
import { t } from "../../lib/copy-dict";
import { Skeleton } from "../ui/skeleton";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import ReviewFormDialog from "./review-form-dialog";
import ReviewAggregateCard from "./review-aggregate-card";

interface ReviewsProps {
  productHandle?: string;
}

export default function Reviews({ productHandle = "maison-ecorce" }: ReviewsProps) {
  const locale = useCartStore((state) => state.locale);

  // 1. Fetch reviews
  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ["reviews", productHandle],
    queryFn: () => shopifyClient.getReviews(productHandle),
  });

  // 2. Fetch aggregates
  const { data: aggregate, isLoading: loadingAggregate } = useQuery({
    queryKey: ["review-aggregate", productHandle],
    queryFn: () => shopifyClient.getReviewAggregate(productHandle),
  });

  const renderStars = (rating: number, sizeClass = "size-3.5") => {
    return (
      <div className="flex gap-0.5 text-[#C49B66]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            fill={idx < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            className={sizeClass}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full bg-[#F5F3EE] dark:bg-[#1A1917] py-24 md:py-32 px-6 border-t-2 border-[#1A1917] dark:border-[#F5F3EE] relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#1A1917]/10 dark:border-[#F5F3EE]/15 pb-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8B6230] dark:text-[#C49B66] font-bold">
              {locale === "en" ? "Client Journal" : "Le Journal des Clients"}
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#1A1917] dark:text-[#F5F3EE] tracking-tight font-extrabold uppercase italic lowercase leading-none">
              {t("sectionReviews", locale)}
            </h2>
          </div>

          {/* Dialog for Review Form */}
          <ReviewFormDialog productHandle={productHandle} locale={locale} />
        </div>

        {/* Aggregate breakdown & reviews list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Rating aggregate breakdown */}
          <ReviewAggregateCard aggregate={aggregate} isLoading={loadingAggregate} locale={locale} />

          {/* Review List (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {loadingReviews ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex flex-col gap-3 pb-6 border-b border-[#1A1917]/10 dark:border-[#F5F3EE]/15">
                  <Skeleton className="h-4 w-28 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
                  <Skeleton className="h-5 w-48 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
                  <Skeleton className="h-4 w-full bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
                </div>
              ))
            ) : reviews.length === 0 ? (
              <div className="py-12 border-2 border-dashed border-[#1A1917]/20 dark:border-[#F5F3EE]/20 rounded-none flex flex-col items-center justify-center text-center p-6 text-[#1A1917]/70 dark:text-[#F5F3EE]/70 gap-3">
                <p className="font-serif italic text-lg">Aucun commentaire rédigé pour le moment.</p>
                <p className="text-[9px] font-mono tracking-wide uppercase font-bold">Soyez le premier à donner votre avis.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col gap-3 pb-8 border-b border-[#1A1917]/10 dark:border-[#F5F3EE]/15 last:border-b-0 last:pb-0"
                  >
                    {/* Header: stars + author + date */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] tracking-wide font-mono font-bold uppercase">
                      <div className="flex items-center gap-3">
                        {renderStars(review.rating)}
                        <span className="text-[#8B6230] dark:text-[#C49B66]">
                          {review.author}
                        </span>
                      </div>
                      <span className="text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
                        {new Date(review.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Review text content */}
                    <div className="flex flex-col gap-1.5">
                      <h4 className="font-serif text-base font-extrabold text-[#1A1917] dark:text-[#F5F3EE] uppercase tracking-wide">
                        {review.title}
                      </h4>
                      <p className="font-sans text-xs leading-relaxed font-light text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
                        {review.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
