"use client";

import React from "react";
import { ReviewAggregate } from "../../types/shopify";
import { Skeleton } from "../ui/skeleton";
import { Star } from "lucide-react";
import { t } from "../../lib/copy-dict";

interface ReviewAggregateCardProps {
  aggregate?: ReviewAggregate;
  isLoading: boolean;
  locale: "fr" | "en";
}

export default function ReviewAggregateCard({
  aggregate,
  isLoading,
  locale,
}: ReviewAggregateCardProps) {
  const isAggregateEmpty = !aggregate || aggregate.ratingCount === 0;

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
    <div className="lg:col-span-4 bg-transparent border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none p-6 shadow-brutal">
      <div className="flex flex-col gap-6">
        <h3 className="text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
          {t("averageRating", locale)}
        </h3>
        
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 w-24 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
            <Skeleton className="h-4 w-32 bg-[#1A1917]/10 dark:bg-[#F5F3EE]/10" />
          </div>
        ) : isAggregateEmpty ? (
          <p className="text-[10px] font-mono uppercase font-bold text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
            {locale === "en" ? "No reviews written yet." : "Aucun avis rédigé."}
          </p>
        ) : (
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-5xl font-extrabold tracking-tighter text-[#1A1917] dark:text-[#F5F3EE]">
              {aggregate.ratingAverage}
            </span>
            <div className="flex flex-col gap-1">
              {renderStars(Math.round(aggregate.ratingAverage), "size-4")}
              <span className="text-[9px] text-[#1A1917]/70 dark:text-[#F5F3EE]/70 font-mono uppercase font-bold mt-1">
                {t("reviewsCount", locale).replace("{n}", String(aggregate.ratingCount))}
              </span>
            </div>
          </div>
        )}

        {/* Star breakdown slider graphs */}
        {!isLoading && !isAggregateEmpty && aggregate && (
          <div className="flex flex-col gap-2 mt-2">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const count = aggregate.distribution[star] || 0;
              const percent = aggregate.ratingCount > 0 ? (count / aggregate.ratingCount) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-[9px] text-[#1A1917]/75 dark:text-[#F5F3EE]/75 font-mono font-bold">
                  <span className="w-3 text-right">{star}</span>
                  <Star className="size-3 text-[#C49B66]" fill="currentColor" />
                  
                  {/* Progress slider track */}
                  <div className="flex-1 h-3 bg-transparent border border-[#1A1917]/30 dark:border-[#F5F3EE]/30 rounded-none overflow-hidden relative">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-[#C49B66] rounded-none"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  
                  <span className="w-6 text-right text-[#1A1917]/70 dark:text-[#F5F3EE]/70">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
