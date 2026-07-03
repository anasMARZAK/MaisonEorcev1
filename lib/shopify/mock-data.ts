import { Money, Image, ProductOption, ProductVariant } from "../../types/shopify";

export interface MockProduct {
  id: string;
  handle: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  price: Money;
  compareAtPrice: Money | null;
  images: Image[];
  tags: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  collections: string[];
}

export const MOCK_COLLECTIONS = [
  {
    id: "col-1",
    handle: "bottes",
    title: { fr: "Bottes", en: "Boots" },
    description: {
      fr: "Notre collection emblématique de bottes artisanales en cuir.",
      en: "Our signature collection of handcrafted leather boots.",
    },
    image: {
      url: "/assets/images/generated/maison_ecorce_bestseller_boots.png",
      altText: "Bottes en cuir artisanales",
    },
  },
  {
    id: "col-2",
    handle: "sandales",
    title: { fr: "Sandales", en: "Sandals" },
    description: {
      fr: "Légèreté, confort et raffinement pour les beaux jours.",
      en: "Lightness, comfort, and refinement for warm sunny days.",
    },
    image: {
      url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800",
      altText: "Sandales en cuir d'été",
    },
  },
  {
    id: "col-3",
    handle: "sacs-en-cuir",
    title: { fr: "Sacs en Cuir", en: "Leather Bags" },
    description: {
      fr: "Notre ligne exclusive de maroquinerie haut de gamme.",
      en: "Our exclusive line of premium leather goods.",
    },
    image: {
      url: "/assets/images/generated/maison_ecorce_bestseller_bag.png",
      altText: "Marroquinerie de luxe",
    },
  },
  {
    id: "col-4",
    handle: "sacs",
    title: { fr: "Sacs", en: "Bags" },
    description: {
      fr: "Sacs intemporels pensés pour le quotidien et le voyage.",
      en: "Timeless bags designed for everyday use and travel.",
    },
    image: {
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
      altText: "Collection de sacs",
    },
  },
];

export const MOCK_PRODUCTS: MockProduct[] = [
  // 1. BOOTS (Bottes) - Minimum 6 products
  {
    id: "prod-boot-1",
    handle: "bottine-chelsea-faubourg",
    title: { fr: "Bottine Chelsea Faubourg", en: "Faubourg Chelsea Boot" },
    description: {
      fr: "Bottines Chelsea intemporelles en cuir de veau pleine fleur, fabriquées à la main. Dotées d'inserts élastiques latéraux ton sur ton et d'une tirette à l'arrière pour un enfilage aisé.\n\nMatière : Cuir de veau tannage végétal de Toscane.\nDoublure : Cuir de mouton souple respirant.\nSemelle : Cuir véritable avec patin gomme injecté anti-glisse.\nMontage : Cousu Blake pour une flexibilité optimale.\nConseil taille : Prenez votre pointure habituelle.",
      en: "Timeless Chelsea boots handcrafted in premium full-grain calfskin. Features tonal elastic side inserts and a back pull-tab for effortless wear.\n\nMaterial: Vegetable-tanned Tuscan calfskin.\nLining: Breathable soft sheepskin.\nSole: Genuine leather with non-slip injected rubber insert.\nConstruction: Blake stitched for optimal flexibility.\nSizing: Fits true to size.",
    },
    price: { amount: "320.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "/assets/images/generated/maison_ecorce_bestseller_boots.png", altText: "Bottine Chelsea Faubourg - Vue principale" },
      { url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800", altText: "Bottine Chelsea Faubourg - Gros plan cuir" },
    ],
    tags: ["bestseller", "bottes", "cuir", "noir"],
    collections: ["bottes", "cuir"],
    options: [
      { name: "Color", values: ["Noir", "Cognac"] },
      { name: "Size", values: ["EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42"] },
    ],
    variants: [],
  },
  {
    id: "prod-boot-2",
    handle: "botte-haute-marais",
    title: { fr: "Botte Haute Marais", en: "Marais Tall Boot" },
    description: {
      fr: "Bottes hautes d'une élégance rare, confectionnées en cuir suédé haut de gamme. Sa silhouette élancée s'associe idéalement avec une robe ou un manteau mi-long.\n\nMatière : Cuir suédé de chèvre ultra-doux.\nDoublure : Cuir de veau doublé.\nSemelle : Cuir avec talon enrobé de 5 cm.\nHauteur de tige : 38 cm.\nFermeture : Zip latéral partiel invisible.\nConseil taille : Convient aux mollets fins à moyens.",
      en: "Stunning tall boots crafted in luxury suede leather. The sleek silhouette pairs beautifully with dresses or mid-length coats.\n\nMaterial: Ultra-soft goat suede leather.\nLining: Fully lined in calfskin.\nSole: Leather with a 5cm leather-wrapped heel.\nShaft Height: 38 cm.\nClosure: Partial invisible side zipper.\nSizing: Best suited for slim to medium calves.",
    },
    price: { amount: "395.00", currencyCode: "EUR" },
    compareAtPrice: { amount: "450.00", currencyCode: "EUR" },
    images: [
      { url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800", altText: "Botte Haute Marais - Camel" },
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800", altText: "Botte Haute Marais - Vue portée" },
    ],
    tags: ["sale", "bottes", "cuir", "camel"],
    collections: ["bottes", "cuir"],
    options: [
      { name: "Color", values: ["Camel", "Bordeaux"] },
      { name: "Size", values: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41"] },
    ],
    variants: [],
  },
  {
    id: "prod-boot-3",
    handle: "bottine-lacet-bastille",
    title: { fr: "Bottine à Lacets Bastille", en: "Bastille Lace-up Boot" },
    description: {
      fr: "Bottines d'inspiration militaire revisitées avec raffinement. Le laçage à oeillets métalliques apporte du caractère, tandis que le cuir grainé robuste garantit une excellente durabilité.\n\nMatière : Cuir de vachette grainé pleine fleur.\nDoublure : Doublure chaude en microfibre et cuir.\nSemelle : Semelle commando en gomme naturelle Vibram.\nFermeture : Lacets de coton ciré et zip intérieur pratique.\nConseil taille : Prenez une pointure en dessous si vous hésitez entre deux.",
      en: "Refined military-inspired lace-up boots. Featuring industrial metal eyelets for character and robust pebble-grain leather for heavy durability.\n\nMaterial: Full-grain pebbled cow leather.\nLining: Warm microfiber and leather lining.\nSole: Natural rubber Vibram commando lug sole.\nClosure: Waxed cotton laces and convenient inner zipper.\nSizing: Take one size down if between sizes.",
    },
    price: { amount: "340.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1605733513597-a8f8d410f286?q=80&w=800", altText: "Bottine à Lacets Bastille - Marron" },
      { url: "https://images.unsplash.com/photo-1603487982184-bc15d88f4090?q=80&w=800", altText: "Bottine à Lacets Bastille - Vue semelle" },
    ],
    tags: ["new", "bottes", "cuir", "cognac"],
    collections: ["bottes", "cuir"],
    options: [
      { name: "Color", values: ["Cognac", "Noir"] },
      { name: "Size", values: ["EU 38", "EU 39", "EU 40", "EU 41", "EU 42"] },
    ],
    variants: [],
  },
  {
    id: "prod-boot-4",
    handle: "bottine-talon-odeon",
    title: { fr: "Bottine à Talon Odéon", en: "Odéon Heeled Boot" },
    description: {
      fr: "Bottines chics dotées d'un talon bloc sculptural confortable de 6,5 cm. Une silhouette graphique avec un bout légèrement carré pour une allure résolument moderne.\n\nMatière : Cuir de chèvre glacé verni brillant.\nDoublure : Doublure cuir de veau.\nSemelle : Semelle extérieure en cuir véritable.\nTalon : Talon bottier enrobé de cuir.\nConseil taille : Convient parfaitement aux pieds étroits.",
      en: "Chic booties featuring a comfortable 6.5cm sculptural block heel. A graphic silhouette with a slightly squared toe for a modern look.\n\nMaterial: High-shine glazed goat leather.\nLining: Calfskin lining.\nSole: Genuine leather outsole.\nHeel: Leather-wrapped stacked heel.\nSizing: Perfectly suited for narrow feet.",
    },
    price: { amount: "295.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800", altText: "Bottine à Talon Odéon - Noir glacé" },
      { url: "https://images.unsplash.com/photo-1518049368425-797ab455957d?q=80&w=800", altText: "Bottine à Talon Odéon - Détail talon" },
    ],
    tags: ["bottes", "cuir", "noir"],
    collections: ["bottes", "cuir"],
    options: [
      { name: "Color", values: ["Noir", "Bordeaux"] },
      { name: "Size", values: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41"] },
    ],
    variants: [],
  },
  {
    id: "prod-boot-5",
    handle: "botte-cavaliere-tuileries",
    title: { fr: "Botte Cavalière Tuileries", en: "Tuileries Riding Boot" },
    description: {
      fr: "La botte cavalière classique réinterprétée dans un cuir rigide exceptionnel. Un modèle iconique du vestiaire d'automne qui traverse les saisons.\n\nMatière : Cuir de croupon de vachette double tannage.\nDoublure : Doublure intégrale en cuir de porc naturel.\nSemelle : Double semelle cuir cousue Goodyear.\nTige : 40 cm, coupe droite traditionnelle.\nConseil taille : Prenez votre pointure habituelle.",
      en: "The classic riding boot reinterpreted in exceptional, structured double-tanned leather. An iconic autumn wardrobe piece designed to last generations.\n\nMaterial: Double-tanned cow rump leather.\nLining: Fully lined in natural pigskin.\nSole: Goodyear welted double leather sole.\nShaft: 40 cm, traditional straight cut.\nSizing: Fits true to size.",
    },
    price: { amount: "420.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1518049368425-797ab455957d?q=80&w=800", altText: "Botte Cavalière Tuileries - Cognac" },
      { url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800", altText: "Botte Cavalière Tuileries - Zoom sur le cuir" },
    ],
    tags: ["bestseller", "bottes", "cuir", "cognac"],
    collections: ["bottes", "cuir"],
    options: [
      { name: "Color", values: ["Cognac", "Noir"] },
      { name: "Size", values: ["EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42"] },
    ],
    variants: [],
  },
  {
    id: "prod-boot-6",
    handle: "bottine-desert-belleville",
    title: { fr: "Bottine Desert Belleville", en: "Belleville Desert Boot" },
    description: {
      fr: "Bottines d'été décontractées en cuir suédé souple sans doublure, procurant une sensation de seconde peau. Ultra-légères et idéales pour la mi-saison.\n\nMatière : Cuir de veau velours ultra-souple.\nDoublure : Non doublée pour un maximum de souplesse.\nSemelle : Gomme crêpe naturelle amortissante.\nHauteur : Bottine à 3 oeillets.\nConseil taille : Si vous êtes entre deux tailles, prenez la plus petite.",
      en: "Casual summer desert boots in unlined soft suede, providing a second-skin feel. Ultra-lightweight and perfect for transitional seasons.\n\nMaterial: Ultra-flexible calf suede leather.\nLining: Unlined for maximum softness.\nSole: Shock-absorbing natural crepe rubber sole.\nHeight: 3-eyelet chukka height.\nSizing: If between sizes, size down.",
    },
    price: { amount: "260.00", currencyCode: "EUR" },
    compareAtPrice: { amount: "290.00", currencyCode: "EUR" },
    images: [
      { url: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800", altText: "Bottine Desert Belleville - Sable" },
      { url: "https://images.unsplash.com/photo-1605733513597-a8f8d410f286?q=80&w=800", altText: "Bottine Desert Belleville - Arrière" },
    ],
    tags: ["sale", "bottes", "cuir", "camel"],
    collections: ["bottes", "cuir"],
    options: [
      { name: "Color", values: ["Sable", "Taupe"] },
      { name: "Size", values: ["EU 38", "EU 39", "EU 40", "EU 41", "EU 42"] },
    ],
    variants: [],
  },

  // 2. SANDALS (Sandales) - Minimum 6 products
  {
    id: "prod-sandal-1",
    handle: "sandale-bride-st-germain",
    title: { fr: "Sandale à Brides Saint-Germain", en: "Saint-Germain Strapped Sandal" },
    description: {
      fr: "Sandales plates raffinées ornées de fines lanières croisées qui soulignent avec élégance le coup de pied. Ajustement parfait grâce à une boucle délicate.\n\nMatière : Cuir de chèvre tannage végétal.\nDoublure : Cuir de veau.\nSemelle : Cuir véritable avec talonnette en cuir de 1 cm.\nDétail : Boucle en laiton massif vieilli.\nConseil taille : Prenez votre pointure classique.",
      en: "Refined flat sandals featuring delicate criss-cross straps that trace the foot elegantly. Perfect fit with a subtle, delicate ankle buckle.\n\nMaterial: Vegetable-tanned goat leather.\nLining: Calfskin lining.\nSole: Genuine leather with a 1cm leather heel tab.\nDetail: Solid antiqued brass buckle.\nSizing: Fits true to size.",
    },
    price: { amount: "190.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800", altText: "Sandale Saint-Germain - Naturel" },
      { url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800", altText: "Sandale Saint-Germain - Portée" },
    ],
    tags: ["bestseller", "sandales", "cuir", "naturel"],
    collections: ["sandales", "cuir"],
    options: [
      { name: "Color", values: ["Naturel", "Noir"] },
      { name: "Size", values: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42"] },
    ],
    variants: [],
  },
  {
    id: "prod-sandal-2",
    handle: "sandale-tressee-provence",
    title: { fr: "Sandale Tressée Provence", en: "Provence Woven Sandal" },
    description: {
      fr: "Sandales confortables dotées d'un large bandeau tressé à la main, apportant une texture riche et un charme artisanal unique à vos tenues estivales.\n\nMatière : Cuir de mouton tressé souple.\nDoublure : Cuir de mouton doublé.\nSemelle : Semelle anatomique moussée recouverte de cuir.\nConseil taille : Convient parfaitement aux pieds larges.",
      en: "Comfortable sandals with a hand-woven leather strap, providing rich texture and unique artisanal charm to your summer outfits.\n\nMaterial: Soft braided sheep leather.\nLining: Lined in sheepskin.\nSole: Cushioned anatomical footbed wrapped in leather.\nSizing: Ideal for wide feet.",
    },
    price: { amount: "210.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800", altText: "Sandale Tressée Provence - Cognac" },
      { url: "https://images.unsplash.com/photo-1612548403048-874887abfe2b?q=80&w=800", altText: "Sandale Tressée Provence - Détail tressage" },
    ],
    tags: ["new", "sandales", "cuir", "cognac"],
    collections: ["sandales", "cuir"],
    options: [
      { name: "Color", values: ["Cognac", "Nude"] },
      { name: "Size", values: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41"] },
    ],
    variants: [],
  },
  {
    id: "prod-sandal-3",
    handle: "mule-luxe-vendome",
    title: { fr: "Mule en Cuir Vendôme", en: "Vendôme Leather Slide" },
    description: {
      fr: "Mules minimalistes de créateur dotées d'une découpe géométrique asymétrique épurée. Une pièce maîtresse moderne d'un confort absolu.\n\nMatière : Cuir de veau box rigide de haute qualité.\nDoublure : Cuir de chèvre doux.\nSemelle : Semelle extérieure en cuir pleine fleur.\nConseil taille : Prendre une pointure au-dessus si vous avez le pied fort.",
      en: "Minimalist designer slides featuring an asymmetrical clean geometric cutout. A modern statement piece of absolute comfort.\n\nMaterial: High-grade rigid box calfskin leather.\nLining: Soft goat leather.\nSole: Full grain leather outsole.\nSizing: Size up if you have wide feet.",
    },
    price: { amount: "185.00", currencyCode: "EUR" },
    compareAtPrice: { amount: "220.00", currencyCode: "EUR" },
    images: [
      { url: "https://images.unsplash.com/photo-1612548403048-874887abfe2b?q=80&w=800", altText: "Mule Vendôme - Fauve" },
      { url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800", altText: "Mule Vendôme - Arrière" },
    ],
    tags: ["sale", "sandales", "cuir", "tan"],
    collections: ["sandales", "cuir"],
    options: [
      { name: "Color", values: ["Fauve", "Noir"] },
      { name: "Size", values: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42"] },
    ],
    variants: [],
  },
  {
    id: "prod-sandal-4",
    handle: "spartiate-haute-athenes",
    title: { fr: "Spartiate Haute Athènes", en: "Athènes Gladiateur Sandal" },
    description: {
      fr: "Sandales spartiates montantes s'laçant autour de la cheville et du mollet. Fabriquées à la main dans un cuir épais au tannage végétal qui se patine magnifiquement.\n\nMatière : Collet de vachette végétal épais.\nSemelle : Semelle gomme soudée ultra-résistance.\nFermeture : Lacets cuir à nouer.\nConseil taille : Convient à toutes les largeurs de mollets.",
      en: "High gladiator-style sandals wrapping around the ankle and calf. Handcrafted in thick vegetable-tanned leather that patinas beautifully with wear.\n\nMaterial: Thick vegetable-tanned cowhide shoulders.\nSole: Ultra-durable welded rubber sole.\nClosure: Wrap-around leather laces.\nSizing: Adjustable to fit all calf widths.",
    },
    price: { amount: "225.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800", altText: "Spartiate Athènes - Or" },
      { url: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800", altText: "Spartiate Athènes - Gros plan" },
    ],
    tags: ["sandales", "cuir", "gold"],
    collections: ["sandales", "cuir"],
    options: [
      { name: "Color", values: ["Or", "Noir"] },
      { name: "Size", values: ["EU 37", "EU 38", "EU 39", "EU 40", "EU 41"] },
    ],
    variants: [],
  },
  {
    id: "prod-sandal-5",
    handle: "sandale-talon-rivoli",
    title: { fr: "Sandale à Talon Rivoli", en: "Rivoli Heeled Sandal" },
    description: {
      fr: "Sandales habillées à talon fin de 5,5 cm d'une grande stabilité. Idéales pour vos soirées d'été et événements habillés.\n\nMatière : Cuir de veau métallisé ou suède.\nDoublure : Cuir de chèvre.\nSemelle : Cuir véritable.\nTalon : Talon bobine verni stable.\nConseil taille : Prenez votre pointure habituelle.",
      en: "Elegant dressy sandals with a stable 5.5cm spool heel. Ideal for summer evenings and formal events.\n\nMaterial: Metallic calfskin or suede leather.\nLining: Soft goat leather.\nSole: Genuine leather outsole.\nHeel: Stable varnished spool heel.\nSizing: Fits true to size.",
    },
    price: { amount: "245.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800", altText: "Sandale à Talon Rivoli - Or Champagne" },
      { url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800", altText: "Sandale à Talon Rivoli - Noir" },
    ],
    tags: ["bestseller", "sandales", "cuir", "gold"],
    collections: ["sandales", "cuir"],
    options: [
      { name: "Color", values: ["Or Champagne", "Noir"] },
      { name: "Size", values: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42"] },
    ],
    variants: [],
  },
  {
    id: "prod-sandal-6",
    handle: "sandale-plateforme-palermo",
    title: { fr: "Sandale Plateforme Palerme", en: "Palermo Platform Sandal" },
    description: {
      fr: "Sandales à plateforme compensée légère en corde tressée et semelle liège. Design rétro à brides larges pour une allure bohème chic.\n\nMatière : Cuir de veau grainé souple.\nDoublure : Cuir.\nSemelle : Plateforme liège et corde de 4 cm.\nConseil taille : Si vous êtes entre deux tailles, prenez la plus grande.",
      en: "Platform sandals featuring lightweight braided jute rope and a cork footbed. Retro wide-strap design for a bohemian-chic vibe.\n\nMaterial: Soft pebbled calfskin leather.\nLining: Leather lining.\nSole: 4cm cork and jute platform sole.\nSizing: Size up if between sizes.",
    },
    price: { amount: "215.00", currencyCode: "EUR" },
    compareAtPrice: { amount: "250.00", currencyCode: "EUR" },
    images: [
      { url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800", altText: "Sandale Palerme - Crème" },
      { url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800", altText: "Sandale Palerme - Portée" },
    ],
    tags: ["sale", "sandales", "cuir", "nude"],
    collections: ["sandales", "cuir"],
    options: [
      { name: "Color", values: ["Crème", "Noir"] },
      { name: "Size", values: ["EU 37", "EU 38", "EU 39", "EU 40", "EU 41"] },
    ],
    variants: [],
  },

  // 3. LEATHER BAGS (Sacs en Cuir - Premium) - Minimum 6 models
  {
    id: "prod-bag-1",
    handle: "cabas-grand-opera",
    title: { fr: "Cabas Grand Opéra", en: "Grand Opéra Tote Bag" },
    description: {
      fr: "Un cabas majestueux taillé dans un cuir de vachette double face de qualité exceptionnelle. Son format généreux en fait le compagnon idéal des journées actives.\n\nMatière : Cuir de vachette pleine fleur véritable (tannage végétal).\nDimensions : 42 cm x 30 cm x 15 cm.\nDoublure : Non doublé, intérieur velours brut naturel.\nFermeture : Fermoir magnétique invisible en laiton.\nPoches : Poche intérieure zippée amovible suspendue.\nAnses : Hauteur de passage de 25 cm pour un porté épaule agréable.",
      en: "A majestic tote cut from premium double-sided cowhide leather. Its generous format makes it the ideal companion for active days.\n\nMaterial: Genuine full-grain vegetable-tanned cow leather.\nDimensions: 42 cm x 30 cm x 15 cm.\nLining: Unlined, raw natural suede interior.\nClosure: Invisible brass magnetic clasp.\nPockets: Removable hanging zipped interior pocket.\nStraps: 25 cm drop for comfortable shoulder carry.",
    },
    price: { amount: "480.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "/assets/images/generated/maison_ecorce_bestseller_bag.png", altText: "Cabas Grand Opéra - Cognac" },
      { url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800", altText: "Cabas Grand Opéra - Gros plan coutures" },
    ],
    tags: ["bestseller", "sacs-en-cuir", "sacs", "cuir", "cognac"],
    collections: ["sacs-en-cuir", "sacs", "cuir"],
    options: [{ name: "Color", values: ["Cognac", "Noir", "Camel"] }],
    variants: [],
  },
  {
    id: "prod-bag-2",
    handle: "pochette-soiree-tuileries",
    title: { fr: "Pochette de Soirée Tuileries", en: "Tuileries Evening Clutch" },
    description: {
      fr: "Une pochette enveloppe aux lignes architecturales d'une grande finesse. Portez-la à la main ou à l'épaule pour rehausser une tenue de soirée.\n\nMatière : Cuir de veau lisse ultra-fin véritable.\nDimensions : 24 cm x 14 cm x 4 cm.\nDoublure : Doublure gros-grain soyeux bordeaux.\nFermeture : Rabat aimanté à pression.\nBandoulière : Chaîne métallique fine amovible en laiton doré (110 cm).\nConseil d'entretien : Éviter tout frottement prolongé avec des tissus clairs.",
      en: "An envelope clutch with refined architectural lines. Carry it by hand or slip it over the shoulder to elevate any evening attire.\n\nMaterial: Genuine ultra-fine smooth calfskin leather.\nDimensions: 24 cm x 14 cm x 4 cm.\nLining: Silky burgundy grosgrain lining.\nClosure: Snap magnetic flap.\nChain: Removable fine gold-plated brass metal chain (110 cm).\nCare: Avoid prolonged rubbing against light-colored garments.",
    },
    price: { amount: "280.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800", altText: "Pochette Tuileries - Noir verni" },
      { url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800", altText: "Pochette Tuileries - Vue intérieure" },
    ],
    tags: ["new", "sacs-en-cuir", "sacs", "cuir", "noir"],
    collections: ["sacs-en-cuir", "sacs", "cuir"],
    options: [{ name: "Color", values: ["Noir", "Bordeaux", "Nude"] }],
    variants: [],
  },
  {
    id: "prod-bag-3",
    handle: "sac-besace-marais",
    title: { fr: "Sac Besace Marais", en: "Marais Crossbody Bag" },
    description: {
      fr: "Un sac besace demi-lune d'inspiration rétro, à la fois décontracté et structuré. Parfait pour vos escapades urbaines.\n\nMatière : Cuir grainé de vachette pleine fleur.\nDimensions : 26 cm x 18 cm x 7 cm.\nDoublure : Doublure jacquard sergé résistante.\nFermeture : Zip métallique et boucle décorative.\nBandoulière : Ajustable (de 90 cm à 120 cm) pour un porté croisé confortable.",
      en: "A retro-inspired half-moon saddle bag, blending structured contours with casual charm. Ideal for urban strolls.\n\nMaterial: Full grain pebbled cow leather.\nDimensions: 26 cm x 18 cm x 7 cm.\nLining: Hardwearing custom jacquard twill lining.\nClosure: Heavy metal zipper and decorative brass buckle.\nStrap: Adjustable (90 cm to 120 cm) for comfortable crossbody carry.",
    },
    price: { amount: "350.00", currencyCode: "EUR" },
    compareAtPrice: { amount: "395.00", currencyCode: "EUR" },
    images: [
      { url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800", altText: "Sac Besace Marais - Burgundy" },
      { url: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800", altText: "Sac Besace Marais - Porté" },
    ],
    tags: ["sale", "sacs-en-cuir", "sacs", "cuir", "bordeaux"],
    collections: ["sacs-en-cuir", "sacs", "cuir"],
    options: [{ name: "Color", values: ["Bordeaux", "Noir", "Camel"] }],
    variants: [],
  },
  {
    id: "prod-bag-4",
    handle: "sac-seau-saint-germain",
    title: { fr: "Sac Seau Saint-Germain", en: "Saint-Germain Bucket Bag" },
    description: {
      fr: "Un sac seau élégant au volume ajustable par un cordon de serrage en cuir. Son allure épurée incarne parfaitement le chic parisien.\n\nMatière : Cuir de veau box lisse semi-rigide.\nDimensions : 22 cm x 25 cm x 14 cm.\nDoublure : Doublure en micro-suède toucher doux.\nFermeture : Cordon coulissant en cuir véritable.\nAnse : Anse courte fixe pour un porté main, et bandoulière amovible.",
      en: "A sleek bucket bag with adjustable volume via a leather drawstring. Its minimalist lines perfectly encapsulate Parisian chic.\n\nMaterial: Semi-rigid smooth box calf leather.\nDimensions: 22 cm x 25 cm x 14 cm.\nLining: Soft-touch faux suede lining.\nClosure: Sliding genuine leather drawstring.\nStrap: Removable crossbody strap plus fixed short hand strap.",
    },
    price: { amount: "390.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800", altText: "Sac Seau Saint-Germain - Camel" },
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800", altText: "Sac Seau Saint-Germain - Zoom" },
    ],
    tags: ["sacs-en-cuir", "sacs", "cuir", "camel"],
    collections: ["sacs-en-cuir", "sacs", "cuir"],
    options: [{ name: "Color", values: ["Camel", "Noir"] }],
    variants: [],
  },
  {
    id: "prod-bag-5",
    handle: "sac-week-end-bastille",
    title: { fr: "Sac Week-end Bastille", en: "Bastille Duffle Bag" },
    description: {
      fr: "Le compagnon idéal de vos escapades de 48 heures. Confectionné dans un cuir de buffle grainé épais d'une robustesse exceptionnelle.\n\nMatière : Cuir de buffle pleine fleur grainé robuste.\nDimensions : 52 cm x 32 cm x 24 cm (Taille cabine).\nDoublure : Toile de coton enduite imperméable.\nFermeture : Double fermeture à glissière en laiton YKK.\nAccessoires : Fond renforcé avec 5 pieds de protection en métal.",
      en: "The ultimate companion for your 48-hour getaways. Crafted from heavy, textured buffalo leather of exceptional strength.\n\nMaterial: Robust full grain pebbled buffalo leather.\nDimensions: 52 cm x 32 cm x 24 cm (Cabin-sized).\nLining: Waterproof coated cotton canvas lining.\nClosure: Premium dual YKK brass zippers.\nDetails: Reinforced base with 5 protective brass feet.",
    },
    price: { amount: "550.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800", altText: "Sac Week-end Bastille - Cognac" },
      { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800", altText: "Sac Week-end Bastille - Zoom sur le cuir" },
    ],
    tags: ["bestseller", "sacs-en-cuir", "sacs", "cuir", "cognac"],
    collections: ["sacs-en-cuir", "sacs", "cuir"],
    options: [{ name: "Color", values: ["Cognac", "Noir"] }],
    variants: [],
  },
  {
    id: "prod-bag-6",
    handle: "pochette-telephone-canal",
    title: { fr: "Pochette Téléphone Canal", en: "Canal Phone Pouch" },
    description: {
      fr: "Une petite pochette zippée minimaliste pour transporter votre téléphone et vos cartes essentielles en toute liberté.\n\nMatière : Cuir de vachette lisse tannage végétal.\nDimensions : 11 cm x 18 cm x 2 cm.\nFermeture : Fermeture à glissière en métal.\nBandoulière : Cordon de cuir ajustable à nouer.\nCompartiments : 3 fentes pour cartes à l'arrière.",
      en: "A small, minimalist zipped pouch to carry your phone and essential cards in absolute freedom.\n\nMaterial: Vegetable-tanned smooth cow leather.\nDimensions: 11 cm x 18 cm x 2 cm.\nClosure: Secure metal zipper.\nStrap: Adjustable knotted leather cord.\nCompartments: 3 credit card slots on the back.",
    },
    price: { amount: "120.00", currencyCode: "EUR" },
    compareAtPrice: { amount: "150.00", currencyCode: "EUR" },
    images: [
      { url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800", altText: "Pochette Téléphone Canal - Camel" },
      { url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800", altText: "Pochette Téléphone Canal - Portée" },
    ],
    tags: ["sale", "sacs-en-cuir", "sacs", "cuir", "camel"],
    collections: ["sacs-en-cuir", "sacs", "cuir"],
    options: [{ name: "Color", values: ["Camel", "Noir", "Nude"] }],
    variants: [],
  },

  // 4. BAGS (Sacs - General/Base collection) - Minimum 6 models
  {
    id: "prod-gbag-1",
    handle: "sac-a-dos-voyageur",
    title: { fr: "Sac à Dos Voyageur", en: "Voyageur Backpack" },
    description: {
      fr: "Un sac à dos élégant combinant toile de coton épaisse imperméable et détails en cuir de vachette tannage végétal. Idéal pour le quotidien.\n\nMatière : Toile de coton cirée et cuir véritable.\nDimensions : 30 cm x 45 cm x 12 cm.\nFermeture : Rabat avec sangles magnétiques.\nVolume : 16 Litres, compartiment ordinateur 15 pouces rembourré.",
      en: "A sleek backpack blending heavy waterproof cotton canvas and vegetable-tanned cowhide accents. Ideal for daily commutes.\n\nMaterial: Waxed cotton canvas and genuine leather.\nDimensions: 30 cm x 45 cm x 12 cm.\nClosure: Flap with magnetic strap closures.\nVolume: 16 Liters, padded 15\" laptop sleeve.",
    },
    price: { amount: "220.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800", altText: "Sac à Dos Voyageur - Vert Kaki" },
      { url: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800", altText: "Sac à Dos Voyageur - Dos" },
    ],
    tags: ["bestseller", "sacs", "noir"],
    collections: ["sacs"],
    options: [{ name: "Color", values: ["Vert Kaki", "Charbon"] }],
    variants: [],
  },
  {
    id: "prod-gbag-2",
    handle: "cabas-toile-belleville",
    title: { fr: "Cabas en Toile Belleville", en: "Belleville Canvas Tote" },
    description: {
      fr: "Un grand cabas en toile de lin et coton bio très résistante, orné de notre logo estampé sur un empiècement de cuir.\n\nMatière : 80% Toile de lin durable, 20% Cuir de veau.\nDimensions : 38 cm x 35 cm x 18 cm.\nPoche : Poche suspendue zippée intérieure.\nConseil entretien : Nettoyage localisé à l'éponge humide.",
      en: "A large structured tote crafted in heavy flax-linen and organic cotton canvas, detailed with a leather logo patch.\n\nMaterial: 80% Heavy organic canvas, 20% Calfskin leather.\nDimensions: 38 cm x 35 cm x 18 cm.\nPockets: Internal zipped hanging wallet pocket.\nCare: Spot clean with damp cloth.",
    },
    price: { amount: "160.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1614179924047-e1bf49a0a0cf?q=80&w=800", altText: "Cabas Belleville - Écru" },
      { url: "https://images.unsplash.com/photo-1566150905458-1bf1fc15a630?q=80&w=800", altText: "Cabas Belleville - Porté" },
    ],
    tags: ["new", "sacs", "nude"],
    collections: ["sacs"],
    options: [{ name: "Color", values: ["Écru", "Noir"] }],
    variants: [],
  },
  {
    id: "prod-gbag-3",
    handle: "sac-portefeuille-clichy",
    title: { fr: "Sac Portefeuille Clichy", en: "Clichy Wallet Bag" },
    description: {
      fr: "Un sac compact hybride faisant office de portefeuille et de petit sac à bandoulière, idéal pour voyager léger.\n\nMatière : Cuir de veau saffiano texturé résistant aux rayures.\nDimensions : 19 cm x 11 cm x 3 cm.\nFermeture : Bouton pression.\nIntérieur : 8 fentes cartes, compartiment monnaie zippé.",
      en: "A compact hybrid wallet-on-chain functioning as a wallet and small shoulder bag, designed to travel light.\n\nMaterial: Scratch-resistant saffiano-textured calfskin.\nDimensions: 19 cm x 11 cm x 3 cm.\nClosure: Snap button flap.\nInterior: 8 card slots, zipped currency compartment.",
    },
    price: { amount: "175.00", currencyCode: "EUR" },
    compareAtPrice: { amount: "210.00", currencyCode: "EUR" },
    images: [
      { url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800", altText: "Sac Portefeuille Clichy - Noir" },
      { url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800", altText: "Sac Portefeuille Clichy - Zoom" },
    ],
    tags: ["sale", "sacs", "noir"],
    collections: ["sacs"],
    options: [{ name: "Color", values: ["Noir", "Nude"] }],
    variants: [],
  },
  {
    id: "prod-gbag-4",
    handle: "sac-seau-tressé-palermo",
    title: { fr: "Sac Seau Tressé Palerme", en: "Palermo Woven Bucket Bag" },
    description: {
      fr: "Un sac seau estival tressé en paille naturelle à la main et agrémenté de finitions en cuir cognac.\n\nMatière : Paille naturelle tressée et cuir de vachette.\nDimensions : 20 cm x 22 cm x 12 cm.\nFermeture : Pochon intérieur en lin coulissant protecteur.",
      en: "A summery straw bucket bag hand-woven from natural palm leaves and finished with premium cognac leather trims.\n\nMaterial: Natural hand-braided straw and cowhide leather.\nDimensions: 20 cm x 22 cm x 12 cm.\nClosure: Protective drawstring linen inner pouch.",
    },
    price: { amount: "195.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1566150905458-1bf1fc15a630?q=80&w=800", altText: "Sac Seau Tressé - Paille / Cognac" },
      { url: "https://images.unsplash.com/photo-1614179924047-e1bf49a0a0cf?q=80&w=800", altText: "Sac Seau Tressé - Zoom paille" },
    ],
    tags: ["sacs", "cognac"],
    collections: ["sacs"],
    options: [{ name: "Color", values: ["Paille / Cognac", "Paille / Noir"] }],
    variants: [],
  },
  {
    id: "prod-gbag-5",
    handle: "sac-bandouliere-sorbonne",
    title: { fr: "Sac Bandoulière Sorbonne", en: "Sorbonne Satchel Bag" },
    description: {
      fr: "Un sac besace classique esprit étudiant, idéal pour transporter des documents et un ordinateur portable 13 pouces.\n\nMatière : Cuir de vachette lisse tannage végétal véritable.\nDimensions : 34 cm x 25 cm x 8 cm.\nFermeture : Boucles cartables métalliques sous pattes cuir.",
      en: "A classic academic satchel bag, perfect for carrying A4 folders and a 13-inch laptop.\n\nMaterial: Genuine vegetable-tanned smooth cow leather.\nDimensions: 34 cm x 25 cm x 8 cm.\nClosure: Double metal push-locks concealed under faux buckles.",
    },
    price: { amount: "295.00", currencyCode: "EUR" },
    compareAtPrice: null,
    images: [
      { url: "https://images.unsplash.com/photo-1524498250077-390f9e378db0?q=80&w=800", altText: "Sac Sorbonne - Camel" },
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800", altText: "Sac Sorbonne - Gros plan boucle" },
    ],
    tags: ["sacs", "camel"],
    collections: ["sacs"],
    options: [{ name: "Color", values: ["Camel", "Noir"] }],
    variants: [],
  },
  {
    id: "prod-gbag-6",
    handle: "cabas-shopping-canal",
    title: { fr: "Cabas Shopping Canal", en: "Canal Shopping Bag" },
    description: {
      fr: "Un cabas ultra-léger et repliable en nylon recyclé imperméable avec anses et rabat en cuir de vachette.\n\nMatière : Nylon recyclé écologique et cuir véritable.\nDimensions : 40 cm x 32 cm x 16 cm.\nFermeture : Fermeture éclair YKK et bouton pression.",
      en: "An ultra-lightweight, packable shopper bag in recycled waterproof nylon, trimmed with signature cowhide handles.\n\nMaterial: Eco-friendly recycled nylon and genuine leather.\nDimensions: 40 cm x 32 cm x 16 cm.\nClosure: YKK zipper and snap leather button.",
    },
    price: { amount: "135.00", currencyCode: "EUR" },
    compareAtPrice: { amount: "165.00", currencyCode: "EUR" },
    images: [
      { url: "https://images.unsplash.com/photo-1605733513597-a8f8d410f286?q=80&w=800", altText: "Cabas Shopping Canal - Kaki" },
      { url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800", altText: "Cabas Shopping Canal - Plié" },
    ],
    tags: ["sale", "sacs", "noir"],
    collections: ["sacs"],
    options: [{ name: "Color", values: ["Kaki", "Noir", "Bordeaux"] }],
    variants: [],
  },
];

// Helper to expand options into actual Shopify variants dynamically
const generateVariants = (product: MockProduct): ProductVariant[] => {
  const colorOption = product.options.find((o) => o.name === "Color");
  const sizeOption = product.options.find((o) => o.name === "Size");

  const colors = colorOption ? colorOption.values : ["Standard"];
  const sizes = sizeOption ? sizeOption.values : ["One Size"];

  const variants: ProductVariant[] = [];

  colors.forEach((color, cIdx) => {
    sizes.forEach((size, sIdx) => {
      const selectedOptions = [];
      if (colorOption) selectedOptions.push({ name: "Color", value: color });
      if (sizeOption) selectedOptions.push({ name: "Size", value: size });

      const variantId = `${product.id}-var-${cIdx}-${sIdx}`;

      variants.push({
        id: variantId,
        title: `${product.title.en} - ${color} / ${size}`,
        availableForSale: true,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        selectedOptions,
        image: product.images[cIdx % product.images.length],
      });
    });
  });

  return variants;
};

// Seed variants dynamically for all mock products
export const SEEDED_PRODUCTS = MOCK_PRODUCTS.map((prod) => {
  const variants = generateVariants(prod);
  return {
    ...prod,
    variants,
  };
});
