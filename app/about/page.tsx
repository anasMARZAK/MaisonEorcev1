import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "L'Art du Temps et du Geste | La Maison",
  description:
    "Maison Écorce crée des souliers et de la maroquinerie d'exception, alliant rigueur architecturale, matières organiques durables et savoir-faire artisanal toscan.",
  alternates: {
    canonical: "https://maison-ecorce.vercel.app/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
