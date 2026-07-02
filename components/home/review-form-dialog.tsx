"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shopifyClient } from "../../lib/shopify";
import { reviewSchema, ReviewInput } from "../../schemas/forms";
import { t, CopyKey } from "../../lib/copy-dict";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";
import { Star, MessageSquare } from "lucide-react";
import dompurify from "dompurify";

interface ReviewFormDialogProps {
  productHandle: string;
  locale: "fr" | "en";
}

export default function ReviewFormDialog({ productHandle, locale }: ReviewFormDialogProps) {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { author: "", rating: 5, title: "", body: "" },
  });

  // Mutation to submit review
  const addReviewMutation = useMutation({
    mutationFn: async (data: ReviewInput) => {
      const sanitizeInput = (val: string) =>
        typeof window !== "undefined" ? dompurify.sanitize(val) : val;

      const payload = {
        productHandle,
        author: sanitizeInput(data.author),
        rating: data.rating,
        title: sanitizeInput(data.title),
        body: sanitizeInput(data.body),
      };

      return shopifyClient.addReview(payload);
    },
    onSuccess: () => {
      toast.success(locale === "en" ? "Review posted successfully!" : "Avis enregistré avec succès !");
      setFormOpen(false);
      reset();
      
      queryClient.invalidateQueries({ queryKey: ["reviews", productHandle] });
      queryClient.invalidateQueries({ queryKey: ["review-aggregate", productHandle] });
    },
    onError: (err: { message?: string }) => {
      toast.error(err.message || t("errorMsg", locale));
    },
  });

  const onSubmit = (data: ReviewInput) => {
    addReviewMutation.mutate(data);
  };

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger className="bg-[#1A1917] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#1A1917] border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none px-6 h-11 text-[10px] font-mono tracking-[0.2em] uppercase font-bold flex items-center gap-2 group transition-all duration-300 hover:bg-[#F5F3EE] hover:text-[#1A1917] dark:hover:bg-[#1A1917] dark:hover:text-[#F5F3EE] shadow-brutal hover:shadow-none cursor-pointer">
        <MessageSquare className="size-3.5" strokeWidth={2} />
        {t("writeReview", locale)}
      </DialogTrigger>
      
      <DialogContent className="bg-[#F5F3EE] dark:bg-[#1A1917] text-[#1A1917] dark:text-[#F5F3EE] border-2 border-[#1A1917] dark:border-[#F5F3EE] w-[90%] sm:max-w-md rounded-none p-6 z-[100]">
        <DialogHeader className="text-left gap-1">
          <DialogTitle className="font-serif text-2xl font-extrabold uppercase italic">
            {t("writeReview", locale)}
          </DialogTitle>
          <DialogDescription className="text-[9px] tracking-widest uppercase font-mono font-bold text-[#1A1917]/40 dark:text-[#F5F3EE]/40">
            {locale === "en" ? "Share your experience" : "Partagez votre avis"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4 font-mono text-[10px] uppercase font-bold">
          {/* Rating Selection */}
          <div className="flex flex-col gap-2">
            <label className="tracking-wider text-[#1A1917]/60 dark:text-[#F5F3EE]/60">
              {t("ratingLabel", locale)}
            </label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex gap-1 text-[#C49B66]">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const value = idx + 1;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => field.onChange(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-0.5 focus:outline-none cursor-pointer"
                        aria-label={`Rate ${value} stars`}
                      >
                        <Star
                          fill={
                            (hoverRating !== null ? idx < hoverRating : idx < field.value)
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className="size-6 transition-colors duration-200"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.rating && (
              <span className="text-red-600 dark:text-red-400 text-[9px]">
                {t((errors.rating.message || "errorMsg") as CopyKey, locale)}
              </span>
            )}
          </div>

          {/* Author Name */}
          <div className="flex flex-col gap-2">
            <label className="tracking-wider text-[#1A1917]/60 dark:text-[#F5F3EE]/60">
              {t("formName", locale)}
            </label>
            <input
              type="text"
              {...register("author")}
              className="bg-transparent border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none px-4 py-2.5 outline-none focus:bg-[#1A1917]/5 dark:focus:bg-[#F5F3EE]/5 font-mono text-[10px] font-bold text-[#1A1917] dark:text-[#F5F3EE]"
              disabled={addReviewMutation.isPending}
            />
            {errors.author && (
              <span className="text-red-600 dark:text-red-400 text-[9px]">
                {t((errors.author.message || "errorMsg") as CopyKey, locale)}
              </span>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="tracking-wider text-[#1A1917]/60 dark:text-[#F5F3EE]/60">
              {t("formTitle", locale)}
            </label>
            <input
              type="text"
              {...register("title")}
              className="bg-transparent border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none px-4 py-2.5 outline-none focus:bg-[#1A1917]/5 dark:focus:bg-[#F5F3EE]/5 font-mono text-[10px] font-bold text-[#1A1917] dark:text-[#F5F3EE]"
              disabled={addReviewMutation.isPending}
            />
            {errors.title && (
              <span className="text-red-600 dark:text-red-400 text-[9px]">
                {t((errors.title.message || "errorMsg") as CopyKey, locale)}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-col gap-2">
            <label className="tracking-wider text-[#1A1917]/60 dark:text-[#F5F3EE]/60">
              {t("formBody", locale)}
            </label>
            <textarea
              rows={4}
              {...register("body")}
              className="bg-transparent border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none px-4 py-2.5 outline-none focus:bg-[#1A1917]/5 dark:focus:bg-[#F5F3EE]/5 font-mono text-[10px] font-bold text-[#1A1917] dark:text-[#F5F3EE] resize-none"
              disabled={addReviewMutation.isPending}
            />
            {errors.body && (
              <span className="text-red-600 dark:text-red-400 text-[9px]">
                {t((errors.body.message || "errorMsg") as CopyKey, locale)}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={addReviewMutation.isPending}
            className="w-full bg-[#1A1917] text-[#F5F3EE] dark:bg-[#F5F3EE] dark:text-[#1A1917] border-2 border-[#1A1917] dark:border-[#F5F3EE] rounded-none h-11 text-[10px] tracking-[0.2em] uppercase font-bold mt-2 hover:bg-[#F5F3EE] hover:text-[#1A1917] dark:hover:bg-[#1A1917] dark:hover:text-[#F5F3EE] transition-all duration-300 shadow-brutal hover:shadow-none cursor-pointer"
          >
            {addReviewMutation.isPending ? t("loading", locale) : t("submitReview", locale)}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
