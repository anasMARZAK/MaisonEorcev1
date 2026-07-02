import type { Metadata } from "next";
import PoliciesClient from "./policies-client";

export const metadata: Metadata = {
  title: "Conditions & Mentions Légales | Maison Écorce",
  description:
    "Consultez les conditions d'utilisation, la politique de livraison standard offerte dès 150 € et la politique de retour de 30 jours de Maison Écorce.",
  alternates: {
    canonical: "https://maison-ecorce.vercel.app/policies",
  },
};

export default function PoliciesPage() {
  return <PoliciesClient />;
}
