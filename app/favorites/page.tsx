import type { Metadata } from "next";
import FavoritesClient from "./favorites-client";

export const metadata: Metadata = {
  title: "Vos Favoris | Maison Écorce",
  description: "Retrouvez vos créations et souliers favoris Maison Écorce.",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
