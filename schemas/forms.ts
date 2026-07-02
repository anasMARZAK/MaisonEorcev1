import { z } from "zod";

// Zod validation schemas using translation keys as error messages
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "valRequired" })
    .email({ message: "valEmail" }),
});

export const reviewSchema = z.object({
  author: z
    .string()
    .min(1, { message: "valRequired" })
    .min(2, { message: "valNameMin" }),
  rating: z
    .number()
    .min(1, { message: "valRating" })
    .max(5),
  title: z
    .string()
    .min(1, { message: "valRequired" })
    .min(3, { message: "valTitleMin" }),
  body: z
    .string()
    .min(1, { message: "valRequired" })
    .min(10, { message: "valBodyMin" }),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
