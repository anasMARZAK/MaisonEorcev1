# Maison Écorce — Souliers & Maroquinerie d'Exception

Maison Écorce est une vitrine e-commerce haut de gamme conçue pour présenter une collection exclusive de bottes, sandales et maroquinerie d'exception, façonnés à la main dans notre atelier familial historique en Toscane. 

L'expérience utilisateur allie une esthétique éditoriale brutaliste à des transitions fluides, un mode sombre immersif et une validation stricte des données de bout en bout.

---

## 🛠️ Stack Technique

* **Framework :** [Next.js 15 App Router](https://nextjs.org/) (Server Components, Suspense, Dynamic Metadata, SEO & Canonical URLs).
* **Langage :** [TypeScript](https://www.typescript.org/) (Strict compilation, typages robustes pour l'API Storefront).
* **Validation de Données :** [Zod](https://zod.dev/) (Validation à l'exécution de toutes les requêtes GraphQL et formulaires utilisateur).
* **Styles :** [Tailwind CSS v3](https://tailwindcss.com/) (Thème hybride clair/sombre, animations fluides, grille réactive brutaliste).
* **Gestion d'État :** [Zustand v5](https://github.com/pmndrs/zustand) (Panier d'achat côté client persistant avec middleware).
* **Requêtes Asynchrones :** [TanStack Query v5](https://tanstack.com/query/latest) (Synchronisation client/serveur, invalidation de cache, gestion des mutations).
* **Composants UI :** [shadcn/ui](https://ui.shadcn.com/) (Composants Sheet, Dialog, Skeleton, intégrés manuellement).
* **Animations & Défilement :** [Framer Motion](https://www.framer.com/motion/) & [Lenis Smooth Scroll](https://lenis.darkroom.engineering/).

---

## 📂 Architecture des Dossiers

```
shopifystorev1/
├── app/                      # Dossier des routes Next.js 15
│   ├── about/                # Page Héritage de la marque (Server entrypoint)
│   ├── policies/             # Page Politiques Légales (Server entrypoint)
│   ├── products/             # Catalogue principal (Server entrypoint)
│   │   ├── [handle]/         # Fiche Produit Dynamique (Server entrypoint)
│   │   └── products-client.tsx # Composant de présentation du catalogue
│   ├── error.tsx             # Limite d'erreur globale brutaliste
│   ├── layout.tsx            # Mise en page racine (Lenis, Providers)
│   └── page.tsx              # Page d'accueil interactive
├── components/               # Composants d'interface réutilisables
│   ├── home/                 # Composants spécifiques à la page d'accueil (Hero, Reviews)
│   ├── layout/               # Composants globaux (Navbar, Footer, CartDrawer)
│   ├── product/              # Composants du catalogue (Gallery, Variants, Accordions)
│   └── ui/                   # Composants de base shadcn/ui (Sheet, Dialog, Skeleton)
├── hooks/                    # Hooks React personnalisés (useCart, useLenis)
├── lib/                      # Utilitaires globaux (fetchers, dictionnaire de langues)
│   └── shopify/              # Client GraphQL (réel et simulation)
├── schemas/                  # Déclarations Zod (Shopify API & formulaires)
├── store/                    # États globaux Zustand (Panier, Langue, Thème)
└── types/                    # Déclarations de types TypeScript
```

---

## ⚙️ Configuration & Variables d'Environnement

Pour lancer l'application en mode de production réel connecté à Shopify Storefront, créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Domaine public de votre boutique Shopify. | `maison-ecorce.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Jeton d'accès public à l'API de Storefront. | `ab12c345def678gh90ij12kl34mn56op` |
| `SHOPIFY_STORE_DOMAIN` | Domaine utilisé côté serveur (client réel). | `maison-ecorce.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Jeton d'accès utilisé côté serveur (client réel). | `ab12c345def678gh90ij12kl34mn56op` |

### 🔄 Bascule entre Client Réel et Simulation (Mock)

L'application intègre un mécanisme intelligent de repli. Si les variables d'environnement Shopify ne sont pas configurées, le système bascule automatiquement sur un client de simulation local (`lib/shopify/mock-client.ts`) fournissant des données toscanes pré-remplies, assurant ainsi une disponibilité continue hors-ligne ou pendant les phases de prévisualisation.

---

## 🚀 Installation & Démarrage

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

3. **Compiler le projet pour la production :**
   ```bash
   npm run build
   ```

4. **Lancer le serveur de production :**
   ```bash
   npm run start
   ```

---

## ✍️ Examen Légal

La page `/policies` contient des mentions et modèles légaux standard à titre de démonstration. Avant tout déploiement en production marchande réelle, ces textes doivent être révisés et approuvés par un conseiller juridique agréé.
