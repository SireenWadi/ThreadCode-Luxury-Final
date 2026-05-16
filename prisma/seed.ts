// prisma/seed.ts
// 24 modern & trendy items — 12 Men / 12 Women
// Each imageUrl is a transparent PNG of a floating front-view garment
// Each detailImageUrl is a close-up fabric texture PNG (-detail.png)

import { PrismaClient, Category, Occasion } from "@prisma/client";

const prisma = new PrismaClient();

/*
 * ─── AI Image Generation Prompts ────────────────────────────────────────────
 * Template:
 *   "floating front-view [GARMENT], [COLOR], product photography,
 *    isolated on pure white background, no shadow, no model, no floor,
 *    ultra-sharp, 4k, fashion editorial" → export transparent PNG
 * Detail:
 *   "macro close-up of [MATERIAL] texture, [COLOR], studio lighting, white bg"
 */

const products = [

  // ══════════════════════════════════════════════════════════════════════════
  //   MEN — 12 ITEMS
  // ══════════════════════════════════════════════════════════════════════════

  // ── JOB INTERVIEW — MEN (4) ───────────────────────────────────────────────
  {
    name: "Structured Wool Blazer",
    brand: "Loro Piana",
    price: 2850,
    category: Category.OUTERWEAR,
    occasion: Occasion.JOB_INTERVIEW,
    description: "Masterfully tailored single-breasted blazer in pure Storm System® wool. Notched lapels, dual vents, and a silhouette engineered for authoritative presence.",
    imageUrl: "/images/men/lp-wool-blazer.png",
    detailImageUrl: "/images/men/lp-wool-blazer-detail.png",
    // aiPrompt: "floating front-view structured navy wool blazer, single-breasted, notched lapels, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "blazer,wool,tailored,interview,navy",
    bodyShapes: "rectangle,invertedTriangle,hourglass",
    styleTags: "Structured,Minimalist,Monochrome",
    gender: "men",
    inStock: true,
  },
  {
    name: "Slim-Fit Wool Trousers",
    brand: "Canali",
    price: 890,
    category: Category.BOTTOM,
    occasion: Occasion.JOB_INTERVIEW,
    description: "Italian-crafted slim-fit trousers in stretch wool-blend. Clean front, tapered leg, and a mid-rise cut that pairs flawlessly with structured outerwear.",
    imageUrl: "/images/men/canali-trousers.png",
    detailImageUrl: "/images/men/canali-trousers-detail.png",
    // aiPrompt: "floating front-view slim-fit charcoal wool trousers, clean front, tapered leg, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "trousers,slim,wool,charcoal,interview",
    bodyShapes: "rectangle,invertedTriangle",
    styleTags: "Minimalist,Structured,Monochrome",
    gender: "men",
    inStock: true,
  },
  {
    name: "Egyptian Cotton Dress Shirt",
    brand: "Brioni",
    price: 620,
    category: Category.TOP,
    occasion: Occasion.JOB_INTERVIEW,
    description: "Pure Egyptian cotton poplin shirt with hand-stitched collar stays and mother-of-pearl buttons. Understated perfection.",
    imageUrl: "/images/men/brioni-shirt.png",
    detailImageUrl: "/images/men/brioni-shirt-detail.png",
    // aiPrompt: "floating front-view white Egyptian cotton dress shirt, spread collar, mother-of-pearl buttons, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "shirt,poplin,white,cotton,formal",
    bodyShapes: "rectangle,invertedTriangle,hourglass",
    styleTags: "Minimalist,Structured",
    gender: "men",
    inStock: true,
  },
  {
    name: "Oxford Cap-Toe Derby",
    brand: "Edward Green",
    price: 1450,
    category: Category.FOOTWEAR,
    occasion: Occasion.JOB_INTERVIEW,
    description: "Goodyear-welted cap-toe derby on the 202 last. Museum calf leather with a burnished antique finish. The definitive formal shoe.",
    imageUrl: "/images/men/eg-oxford.png",
    detailImageUrl: "/images/men/eg-oxford-detail.png",
    // aiPrompt: "floating front-view pair of black Oxford cap-toe derby shoes, Goodyear-welted, museum calf leather, burnished, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "oxford,leather,formal,shoes,black",
    bodyShapes: "rectangle,invertedTriangle,hourglass",
    styleTags: "Minimalist,Structured,Monochrome",
    gender: "men",
    inStock: true,
  },

  // ── GYM — MEN (4) ─────────────────────────────────────────────────────────
  {
    name: "Technical Training Short",
    brand: "Satisfy Running",
    price: 190,
    category: Category.BOTTOM,
    occasion: Occasion.GYM,
    description: "CommaCotton™ 5-inch short with internal compression liner. Light, breezy, and deceptively technical. Earthy olive finish with raw hem detail.",
    imageUrl: "/images/men/satisfy-short.png",
    detailImageUrl: "/images/men/satisfy-short-detail.png",
    // aiPrompt: "floating front-view olive green athletic training shorts, 5-inch inseam, CommaCotton, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "short,gym,cotton,olive,running",
    bodyShapes: "invertedTriangle,rectangle",
    styleTags: "Earth Tones,Relaxed Fit,Minimalist",
    gender: "men",
    inStock: true,
  },
  {
    name: "Merino Quarter-Zip",
    brand: "Vuori",
    price: 168,
    category: Category.TOP,
    occasion: Occasion.GYM,
    description: "Heavyweight merino quarter-zip with anti-odor finish and temperature regulation. Navy. Performance with quiet authority.",
    imageUrl: "/images/men/vuori-qzip.png",
    detailImageUrl: "/images/men/vuori-qzip-detail.png",
    // aiPrompt: "floating front-view navy merino wool quarter-zip pullover, athletic fit, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "zip,gym,merino,navy,quarter-zip",
    bodyShapes: "rectangle,invertedTriangle",
    styleTags: "Minimalist,Structured,Monochrome",
    gender: "men",
    inStock: true,
  },
  {
    name: "Cloudtec Knit Trainer",
    brand: "On Running",
    price: 185,
    category: Category.FOOTWEAR,
    occasion: Occasion.GYM,
    description: "Engineered knit upper with CloudTec® cushioning pods. Performance that looks as considered as it feels. White/Glacier colorway.",
    imageUrl: "/images/men/on-sneaker.png",
    detailImageUrl: "/images/men/on-sneaker-detail.png",
    // aiPrompt: "floating front-view white On Running sneakers, CloudTec sole, engineered knit upper, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "sneaker,gym,running,knit,white",
    bodyShapes: "rectangle,invertedTriangle,hourglass",
    styleTags: "Minimalist,Monochrome",
    gender: "men",
    inStock: true,
  },
  {
    name: "Titanium GPS Sport Watch",
    brand: "Garmin",
    price: 549,
    category: Category.ACCESSORY,
    occasion: Occasion.GYM,
    description: "Thin-bezel titanium case with sapphire lens. GPS, HRV, and recovery tracking with a 14-day battery. Function as aesthetic.",
    imageUrl: "/images/men/garmin-watch.png",
    detailImageUrl: "/images/men/garmin-watch-detail.png",
    // aiPrompt: "floating front-view titanium GPS sport watch, thin bezel, sapphire crystal, sport silicone band, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "watch,gym,titanium,fitness,tracker",
    bodyShapes: "rectangle,invertedTriangle,hourglass",
    styleTags: "Minimalist,Structured",
    gender: "men",
    inStock: true,
  },

  // ── DINNER NIGHT — MEN (4) ────────────────────────────────────────────────
  {
    name: "Velvet Smoking Blazer",
    brand: "Tom Ford",
    price: 3600,
    category: Category.OUTERWEAR,
    occasion: Occasion.DINNER_NIGHT,
    description: "Midnight-navy velvet single-button smoking jacket. Peak lapels faced in silk satin. The garment of considered excess.",
    imageUrl: "/images/men/tf-velvet-blazer.png",
    detailImageUrl: "/images/men/tf-velvet-blazer-detail.png",
    // aiPrompt: "floating front-view midnight navy velvet smoking blazer, peak satin lapels, single-button, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "blazer,velvet,smoking,navy,dinner,satin",
    bodyShapes: "rectangle,invertedTriangle",
    styleTags: "Bold,Structured,Monochrome",
    gender: "men",
    inStock: true,
  },
  {
    name: "Pure Cashmere Turtleneck",
    brand: "Brunello Cucinelli",
    price: 1890,
    category: Category.TOP,
    occasion: Occasion.DINNER_NIGHT,
    description: "12-gauge pure cashmere turtleneck in mink brown. Relaxed, refined, inherently luxurious. The anti-statement statement.",
    imageUrl: "/images/men/bc-turtleneck.png",
    detailImageUrl: "/images/men/bc-turtleneck-detail.png",
    // aiPrompt: "floating front-view mink brown cashmere turtleneck sweater, relaxed fit, fine 12-gauge knit, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "turtleneck,cashmere,dinner,mink,luxury",
    bodyShapes: "rectangle,hourglass,invertedTriangle",
    styleTags: "Earth Tones,Minimalist,Relaxed Fit",
    gender: "men",
    inStock: true,
  },
  {
    name: "Wide-Leg Silk Trousers",
    brand: "The Row",
    price: 1340,
    category: Category.BOTTOM,
    occasion: Occasion.DINNER_NIGHT,
    description: "Double-pleated wide-leg trousers in heavyweight silk-crepe. The proportions are studied. The drape, immaculate.",
    imageUrl: "/images/men/therow-trousers.png",
    detailImageUrl: "/images/men/therow-trousers-detail.png",
    // aiPrompt: "floating front-view cream wide-leg double-pleated silk trousers, men's formal, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "trousers,wide-leg,silk,pleated,dinner,cream",
    bodyShapes: "rectangle,invertedTriangle",
    styleTags: "Minimalist,Earth Tones,Relaxed Fit",
    gender: "men",
    inStock: true,
  },
  {
    name: "Patent Leather Derby",
    brand: "Berluti",
    price: 1680,
    category: Category.FOOTWEAR,
    occasion: Occasion.DINNER_NIGHT,
    description: "Hand-painted Venezia leather derby in black with a mirror-polished toe cap. A shoe that makes silence audible.",
    imageUrl: "/images/men/berluti-derby.png",
    detailImageUrl: "/images/men/berluti-derby-detail.png",
    // aiPrompt: "floating front-view black patent Berluti derby shoes, hand-painted Venezia leather, mirror-polished toe, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "derby,leather,patent,black,dinner,formal",
    bodyShapes: "rectangle,hourglass,invertedTriangle",
    styleTags: "Bold,Monochrome,Structured",
    gender: "men",
    inStock: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //   WOMEN — 12 ITEMS
  // ══════════════════════════════════════════════════════════════════════════

  // ── JOB INTERVIEW — WOMEN (4) ─────────────────────────────────────────────
  {
    name: "Tailored Crepe Blazer",
    brand: "Max Mara",
    price: 1680,
    category: Category.OUTERWEAR,
    occasion: Occasion.JOB_INTERVIEW,
    description: "Precision-cut single-breasted blazer in double-faced virgin wool crepe. Ivory. A silhouette that commands without effort.",
    imageUrl: "/images/women/mm-crepe-blazer.png",
    detailImageUrl: "/images/women/mm-crepe-blazer-detail.png",
    // aiPrompt: "floating front-view ivory tailored women's blazer, single-breasted, double-faced virgin wool crepe, structured shoulders, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "blazer,crepe,ivory,tailored,interview,women",
    bodyShapes: "hourglass,rectangle,invertedTriangle",
    styleTags: "Structured,Minimalist,Earth Tones",
    gender: "women",
    inStock: true,
  },
  {
    name: "Straight-Leg Cigarette Trouser",
    brand: "Toteme",
    price: 520,
    category: Category.BOTTOM,
    occasion: Occasion.JOB_INTERVIEW,
    description: "Tailored straight cigarette trouser in pressed wool-blend. Mid-rise, clean front. The most versatile bottom in the working wardrobe.",
    imageUrl: "/images/women/toteme-cigarette.png",
    detailImageUrl: "/images/women/toteme-cigarette-detail.png",
    // aiPrompt: "floating front-view black women's straight-leg cigarette trousers, mid-rise, tailored, clean front, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "trouser,cigarette,straight,black,interview,women",
    bodyShapes: "rectangle,invertedTriangle,hourglass",
    styleTags: "Minimalist,Structured,Monochrome",
    gender: "women",
    inStock: true,
  },
  {
    name: "Ribbed Silk Bow Blouse",
    brand: "Toteme",
    price: 480,
    category: Category.TOP,
    occasion: Occasion.JOB_INTERVIEW,
    description: "Fluid ribbed silk blouse with an understated bow at the collar. Effortless authority. Ivory cream.",
    imageUrl: "/images/women/toteme-silk-blouse.png",
    detailImageUrl: "/images/women/toteme-silk-blouse-detail.png",
    // aiPrompt: "floating front-view cream ivory ribbed silk blouse, bow collar, long sleeves, women's formal, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "blouse,silk,ribbed,bow,cream,interview,women",
    bodyShapes: "hourglass,rectangle,invertedTriangle",
    styleTags: "Minimalist,Earth Tones,Structured",
    gender: "women",
    inStock: true,
  },
  {
    name: "Pointed-Toe Kitten Heel",
    brand: "The Row",
    price: 990,
    category: Category.FOOTWEAR,
    occasion: Occasion.JOB_INTERVIEW,
    description: "Clean pointed-toe pump on a 45mm kitten heel in polished calfskin. The most precise shoe in any room.",
    imageUrl: "/images/women/therow-kitten.png",
    detailImageUrl: "/images/women/therow-kitten-detail.png",
    // aiPrompt: "floating front-view nude beige pointed-toe kitten heel pumps, women's shoes, polished calfskin leather, 45mm heel, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "pump,kitten-heel,pointed,nude,tan,interview,women",
    bodyShapes: "hourglass,rectangle,invertedTriangle",
    styleTags: "Minimalist,Earth Tones,Structured",
    gender: "women",
    inStock: true,
  },

  // ── GYM — WOMEN (4) ───────────────────────────────────────────────────────
  {
    name: "Ribbed Longline Sports Bra",
    brand: "Alo Yoga",
    price: 94,
    category: Category.TOP,
    occasion: Occasion.GYM,
    description: "Ribbed modal-cotton longline sports bra with built-in shelf bra. Minimal coverage, maximal support. Cream.",
    imageUrl: "/images/women/alo-sportsbra.png",
    detailImageUrl: "/images/women/alo-sportsbra-detail.png",
    // aiPrompt: "floating front-view cream ribbed modal longline sports bra, built-in shelf bra, women's activewear, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "sportsbra,gym,ribbed,cream,modal,longline",
    bodyShapes: "hourglass,rectangle,invertedTriangle",
    styleTags: "Minimalist,Earth Tones",
    gender: "women",
    inStock: true,
  },
  {
    name: "High-Rise Flare Legging",
    brand: "Lululemon",
    price: 138,
    category: Category.BOTTOM,
    occasion: Occasion.GYM,
    description: "Nulu™ fabric high-rise flare legging. The wide-leg silhouette that transitions from studio to street. Black.",
    imageUrl: "/images/women/ll-flare.png",
    detailImageUrl: "/images/women/ll-flare-detail.png",
    // aiPrompt: "floating front-view black high-rise flare leggings, Lululemon Nulu fabric, wide flared hem, women's activewear, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "legging,flare,gym,black,nulu,high-rise",
    bodyShapes: "hourglass,rectangle",
    styleTags: "Minimalist,Monochrome,Bold",
    gender: "women",
    inStock: true,
  },
  {
    name: "Ultraboost 22 Knit",
    brand: "Adidas",
    price: 190,
    category: Category.FOOTWEAR,
    occasion: Occasion.GYM,
    description: "Primeknit+ upper with responsive Boost midsole. Heel counter for lockdown. Cloud white. A training shoe that earns every glance.",
    imageUrl: "/images/women/adidas-ultraboost.png",
    detailImageUrl: "/images/women/adidas-ultraboost-detail.png",
    // aiPrompt: "floating front-view white Adidas Ultraboost women's running sneakers, Primeknit upper, Boost sole, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "sneaker,gym,primeknit,white,running,boost",
    bodyShapes: "rectangle,hourglass,invertedTriangle",
    styleTags: "Minimalist,Monochrome",
    gender: "women",
    inStock: true,
  },
  {
    name: "Apple Watch Sport",
    brand: "Apple",
    price: 399,
    category: Category.ACCESSORY,
    occasion: Occasion.GYM,
    description: "Slim aluminium case in starlight. Sport band in blush pink. Activity rings, ECG, and crash detection. Beauty in precision.",
    imageUrl: "/images/women/apple-watch.png",
    detailImageUrl: "/images/women/apple-watch-detail.png",
    // aiPrompt: "floating front-view Apple Watch, starlight aluminum case, pink sport silicone band, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "watch,gym,apple,sport,smartwatch,pink",
    bodyShapes: "rectangle,hourglass,invertedTriangle",
    styleTags: "Minimalist,Structured",
    gender: "women",
    inStock: true,
  },

  // ── DINNER NIGHT — WOMEN (4) ──────────────────────────────────────────────
  {
    name: "Asymmetric Shoulder Dress",
    brand: "Jacquemus",
    price: 980,
    category: Category.TOP,
    occasion: Occasion.DINNER_NIGHT,
    description: "Structured asymmetric one-shoulder mini dress in ecru cotton poplin. Architectural form, effortless drama.",
    imageUrl: "/images/women/jac-shoulder-dress.png",
    detailImageUrl: "/images/women/jac-shoulder-dress-detail.png",
    // aiPrompt: "floating front-view ecru off-white asymmetric one-shoulder mini dress, structured cotton poplin, Jacquemus style, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "dress,asymmetric,one-shoulder,ecru,dinner,mini",
    bodyShapes: "hourglass,invertedTriangle",
    styleTags: "Bold,Minimalist,Earth Tones",
    gender: "women",
    inStock: true,
  },
  {
    name: "Silk Slip Skirt",
    brand: "Vince",
    price: 395,
    category: Category.BOTTOM,
    occasion: Occasion.DINNER_NIGHT,
    description: "Bias-cut silk charmeuse slip skirt in champagne. A garment of pure movement. Pairs with everything elevated.",
    imageUrl: "/images/women/vince-slip-skirt.png",
    detailImageUrl: "/images/women/vince-slip-skirt-detail.png",
    // aiPrompt: "floating front-view champagne gold silk charmeuse midi slip skirt, bias-cut, women's dinner, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "skirt,slip,silk,bias-cut,champagne,dinner,midi",
    bodyShapes: "hourglass,rectangle",
    styleTags: "Minimalist,Earth Tones,Relaxed Fit",
    gender: "women",
    inStock: true,
  },
  {
    name: "Strappy Kitten-Heel Mule",
    brand: "The Row",
    price: 890,
    category: Category.FOOTWEAR,
    occasion: Occasion.DINNER_NIGHT,
    description: "Minimal leather strappy mule on a 40mm kitten heel. Barely-there elegance. Nude beige calfskin.",
    imageUrl: "/images/women/therow-mule.png",
    detailImageUrl: "/images/women/therow-mule-detail.png",
    // aiPrompt: "floating front-view nude beige strappy leather kitten-heel mule sandals, 40mm heel, minimal, women's dinner shoes, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "mule,kitten-heel,strappy,nude,beige,dinner,women",
    bodyShapes: "hourglass,rectangle,invertedTriangle",
    styleTags: "Minimalist,Earth Tones",
    gender: "women",
    inStock: true,
  },
  {
    name: "Sculptural Silver Cuff",
    brand: "Sophie Buhai",
    price: 460,
    category: Category.ACCESSORY,
    occasion: Occasion.DINNER_NIGHT,
    description: "Sterling silver sculptural wide cuff. Polished, architectural, and deeply wearable. Makes everything better.",
    imageUrl: "/images/women/sb-cuff.png",
    detailImageUrl: "/images/women/sb-cuff-detail.png",
    // aiPrompt: "floating front-view sterling silver sculptural wide cuff bracelet, polished architectural jewelry, product photography, isolated pure white background, no shadow, no model, transparent PNG"
    tags: "cuff,bracelet,silver,sculptural,dinner,jewelry",
    bodyShapes: "rectangle,hourglass,invertedTriangle",
    styleTags: "Bold,Minimalist,Monochrome",
    gender: "women",
    inStock: true,
  },
];

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  ThreadCode — Virtual Fitting Room Seed v2.0");
  console.log("  24 Modern Items · 12 Men / 12 Women");
  console.log("═══════════════════════════════════════════════════════\n");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  console.log("  Cleared existing records.\n");

  const counts: Record<string, number> = {
    JOB_INTERVIEW: 0, GYM: 0, DINNER_NIGHT: 0,
  };
  const genderCounts: Record<string, number> = { men: 0, women: 0, unisex: 0 };

  for (const product of products) {
    const created = await prisma.product.create({ data: product });
    counts[created.occasion]++;
    genderCounts[created.gender] = (genderCounts[created.gender] ?? 0) + 1;
    const occ = created.occasion.replace(/_/g, " ").padEnd(15);
    const gen = created.gender.padEnd(6);
    console.log(`  ✓  [${occ}] [${gen}]  ${created.brand} — ${created.name}`);
  }

  console.log(`
  ─────────────────────────────────────────────────────
  By Occasion:
    Job Interview  : ${counts.JOB_INTERVIEW} pieces
    Gym            : ${counts.GYM} pieces
    Dinner Night   : ${counts.DINNER_NIGHT} pieces

  By Gender:
    Men    : ${genderCounts.men ?? 0}
    Women  : ${genderCounts.women ?? 0}
    Unisex : ${genderCounts.unisex ?? 0}

  Total  : ${products.length} items seeded.
  ─────────────────────────────────────────────────────`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
