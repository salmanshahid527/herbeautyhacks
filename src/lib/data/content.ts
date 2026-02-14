import type { Author, Category, Post, ShopItem, SiteConfig, WebStory } from "@/lib/types/content";

export const siteConfig: SiteConfig = {
  brandName: "HerBeautyHacks",
  domain: "herbeautyhacks.com",
  tagline: "Smart, modern beauty advice for everyday routines.",
  announcement: "New: Build your Spring Reset routine with our fresh editorial guide.",
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/herbeautyhacks" },
    { label: "Pinterest", href: "https://pinterest.com/herbeautyhacks" },
    { label: "YouTube", href: "https://youtube.com/@herbeautyhacks" },
    { label: "TikTok", href: "https://tiktok.com/@herbeautyhacks" },
  ],
};

export const categories: Category[] = [
  {
    id: "cat-skincare",
    slug: "skincare",
    name: "Skincare",
    description: "Ingredient-aware routines for healthy, balanced skin in every season.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    accentClass: "from-rose-500/20 to-orange-400/20",
  },
  {
    id: "cat-makeup",
    slug: "makeup",
    name: "Makeup",
    description: "Long-wear techniques, color stories, and effortless everyday glam.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    accentClass: "from-fuchsia-500/20 to-violet-500/20",
  },
  {
    id: "cat-haircare",
    slug: "haircare",
    name: "Haircare",
    description: "Scalp-first care, damage repair, and styling guides for all textures.",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80",
    accentClass: "from-amber-500/20 to-yellow-400/20",
  },
  {
    id: "cat-wellness",
    slug: "wellness",
    name: "Wellness",
    description: "Beauty from within with sleep, stress, hydration, and mindful habits.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    accentClass: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: "cat-style",
    slug: "style",
    name: "Style",
    description: "Outfit formulas, closet edits, and accessories that elevate basics.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    accentClass: "from-indigo-500/20 to-blue-500/20",
  },
  {
    id: "cat-routines",
    slug: "routines",
    name: "Routines",
    description: "Step-by-step beauty schedules designed for real-life consistency.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    accentClass: "from-teal-500/20 to-lime-500/20",
  },
];

export const authors: Author[] = [
  {
    id: "author-maya",
    name: "Maya Sinclair",
    slug: "maya-sinclair",
    role: "Editorial Director",
    bio: "Maya leads HerBeautyHacks with a practical lens, translating trend-heavy beauty advice into realistic, repeatable systems.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com/mayasinclair" },
      { label: "LinkedIn", href: "https://linkedin.com/in/mayasinclair" },
    ],
  },
  {
    id: "author-zoe",
    name: "Zoe Patel",
    slug: "zoe-patel",
    role: "Beauty Features Writer",
    bio: "Zoe covers ingredient deep dives, product workflows, and simple makeup techniques that perform in daily life.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=640&q=80",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com/zoepatel" },
      { label: "Pinterest", href: "https://pinterest.com/zoepatel" },
    ],
  },
  {
    id: "author-lina",
    name: "Lina Morales",
    slug: "lina-morales",
    role: "Lifestyle & Wellness Editor",
    bio: "Lina focuses on routines, wellness habits, and confidence-building style systems with an inclusive perspective.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80",
    socialLinks: [
      { label: "X", href: "https://x.com/linamorales" },
      { label: "Instagram", href: "https://instagram.com/linamorales" },
    ],
  },
];

export const posts: Post[] = [
  {
    id: "post-glass-skin",
    slug: "glass-skin-morning-routine",
    title: "The 5-Step Glass Skin Morning Routine for Busy Schedules",
    excerpt:
      "A realistic glow routine that layers hydration, SPF, and makeup prep in under 12 minutes.",
    coverImage:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "skincare",
    tagSlugs: ["hydration", "spf", "morning-routine"],
    authorId: "author-maya",
    publishedAt: "2026-01-18T08:00:00.000Z",
    updatedAt: "2026-01-26T09:00:00.000Z",
    readTimeMinutes: 9,
    trendingScore: 98,
    featured: true,
    sections: [
      {
        id: "cleanse",
        heading: "Step 1: Start with a gentle cleanse",
        content: [
          "A low-foam cleanser removes overnight sweat and oil without stripping your barrier. Use lukewarm water and cleanse for 30-45 seconds.",
          "If your skin feels tight after cleansing, reduce your cleanser amount before swapping products.",
        ],
      },
      {
        id: "hydrate",
        heading: "Step 2: Layer lightweight hydration",
        content: [
          "Use one humectant-rich toner or essence and one serum with niacinamide or panthenol. Keep layers thin so makeup sits smoothly.",
          "Press products in with your palms for better absorption and less pilling.",
        ],
      },
      {
        id: "seal-protect",
        heading: "Step 3: Seal and protect",
        content: [
          "Apply a barrier-supporting moisturizer, then finish with broad-spectrum SPF 50. Let sunscreen set for at least two minutes before makeup.",
          "This final wait time is the simplest way to improve both longevity and glow.",
        ],
      },
    ],
  },
  {
    id: "post-blush-placement",
    slug: "blush-placement-guide",
    title: "A Blush Placement Guide That Works for Every Face Shape",
    excerpt: "Lift, sculpt, or soften your look with placement maps and easy blending cues.",
    coverImage:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "makeup",
    tagSlugs: ["blush", "face-shape", "technique"],
    authorId: "author-zoe",
    publishedAt: "2026-01-10T11:30:00.000Z",
    readTimeMinutes: 8,
    trendingScore: 92,
    sections: [
      {
        id: "choose-zone",
        heading: "Pick your lift zone first",
        content: [
          "Apply higher and back toward the temples when you want a lifted finish. Keep placement centered for a soft, youthful flush.",
          "Using this single rule prevents over-blending and keeps your structure intentional.",
        ],
      },
      {
        id: "formula-match",
        heading: "Match formula to your base",
        content: [
          "Cream blush blends best over cream bases. Powder blush lasts longest over set foundation.",
          "Mixing textures can work, but apply with a tapping motion instead of swiping.",
        ],
      },
      {
        id: "blend-balance",
        heading: "Blend in micro circles",
        content: [
          "Use tiny circular motions and pull color outward, not downward. Add color slowly in two layers rather than one heavy pass.",
          "If you overapply, a clean sponge with leftover foundation can tone things down quickly.",
        ],
      },
    ],
  },
  {
    id: "post-scalp-reset",
    slug: "weekly-scalp-reset",
    title: "How to Do a Weekly Scalp Reset Without Over-Drying",
    excerpt:
      "Clarify, hydrate, and rebalance your scalp using a low-irritation method for all hair types.",
    coverImage:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "haircare",
    tagSlugs: ["scalp-care", "wash-day", "clarifying"],
    authorId: "author-lina",
    publishedAt: "2025-12-29T10:00:00.000Z",
    readTimeMinutes: 10,
    trendingScore: 89,
    sections: [
      {
        id: "pre-wash",
        heading: "Pre-wash strategy",
        content: [
          "Apply a lightweight scalp serum 15 minutes before washing to loosen buildup and reduce friction during cleansing.",
          "Focus on roots and avoid saturating your lengths with scalp-focused products.",
        ],
      },
      {
        id: "double-cleanse",
        heading: "Use a gentle double cleanse",
        content: [
          "The first cleanse breaks down buildup. The second cleanse can be shorter and more targeted at the crown and nape.",
          "Choose sulfate-light cleansers if your scalp is reactive or color-treated.",
        ],
      },
      {
        id: "post-care",
        heading: "Rehydrate and protect",
        content: [
          "Finish with a lightweight scalp mist and avoid heavy oils on freshly clarified roots.",
          "Heat-protectant at the roots matters if you blow-dry frequently.",
        ],
      },
    ],
  },
  {
    id: "post-sleep-beauty",
    slug: "night-routine-for-better-skin-sleep",
    title: "A Night Routine That Improves Skin and Sleep Quality",
    excerpt:
      "A practical evening routine that supports recovery, hydration, and deeper rest.",
    coverImage:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "wellness",
    tagSlugs: ["sleep", "night-routine", "recovery"],
    authorId: "author-lina",
    publishedAt: "2026-02-05T07:30:00.000Z",
    readTimeMinutes: 7,
    trendingScore: 96,
    sections: [
      {
        id: "wind-down",
        heading: "Create a 30-minute wind-down buffer",
        content: [
          "Lower overhead lighting and avoid high-stimulus scrolling right before bed. This simple reset helps your body transition to rest mode.",
          "Pair your final skincare step with a fixed bedtime cue, like herbal tea or journaling.",
        ],
      },
      {
        id: "pm-skincare",
        heading: "Keep PM skincare short and strategic",
        content: [
          "Use one active at a time, then lock hydration with a ceramide-focused moisturizer.",
          "Complex routines can backfire when consistency drops, so choose repeatable over perfect.",
        ],
      },
      {
        id: "bedroom-environment",
        heading: "Optimize your environment",
        content: [
          "A cool room, breathable pillowcase, and clean hairline can reduce overnight irritation.",
          "Consistency across all seven nights is more effective than occasional long routines.",
        ],
      },
    ],
  },
  {
    id: "post-capsule-wardrobe",
    slug: "beauty-friendly-capsule-wardrobe",
    title: "Build a Beauty-Friendly Capsule Wardrobe in 10 Pieces",
    excerpt:
      "A simplified closet strategy that pairs with your beauty routine and reduces decision fatigue.",
    coverImage:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "style",
    tagSlugs: ["capsule-wardrobe", "style-hacks", "essentials"],
    authorId: "author-maya",
    publishedAt: "2025-12-15T09:45:00.000Z",
    readTimeMinutes: 6,
    trendingScore: 79,
    sections: [
      {
        id: "core-neutrals",
        heading: "Pick your core neutrals",
        content: [
          "Choose two neutrals that complement your makeup palette and skin undertone. This keeps daily styling cohesive.",
          "A consistent base wardrobe also makes accessorizing more expressive.",
        ],
      },
      {
        id: "hero-pieces",
        heading: "Add two hero pieces",
        content: [
          "Select one structured layer and one statement accessory. These do the visual heavy lifting on low-energy days.",
          "Balance elevated items with soft basics for an effortless look.",
        ],
      },
      {
        id: "rotation-system",
        heading: "Use a weekly rotation plan",
        content: [
          "Pre-build five outfits each Sunday and pair them with matching beauty looks.",
          "This method saves time and helps reduce morning stress.",
        ],
      },
    ],
  },
  {
    id: "post-sunday-reset",
    slug: "sunday-beauty-reset-checklist",
    title: "Your Sunday Beauty Reset Checklist for a Smoother Week",
    excerpt: "A short, repeatable ritual to prep skin, hair, wardrobe, and mindset for Monday.",
    coverImage:
      "https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "routines",
    tagSlugs: ["weekly-routine", "sunday-reset", "planning"],
    authorId: "author-zoe",
    publishedAt: "2026-01-30T13:15:00.000Z",
    readTimeMinutes: 8,
    trendingScore: 94,
    sections: [
      {
        id: "prep-skin-hair",
        heading: "Prep skin and hair first",
        content: [
          "Do one treatment mask, one scalp care step, and set out your weekday essentials.",
          "Keeping these tasks together creates momentum and prevents skipped steps.",
        ],
      },
      {
        id: "organize-tools",
        heading: "Reset your tools",
        content: [
          "Clean brushes and sanitize high-touch makeup tools once weekly to reduce skin stress.",
          "Store your top products in one visible zone for faster mornings.",
        ],
      },
      {
        id: "week-ahead",
        heading: "Plan your beauty week",
        content: [
          "Assign themes by day, like hydration Monday or low-heat Tuesday, to simplify choices.",
          "A light framework outperforms a rigid routine long-term.",
        ],
      },
    ],
  },
  {
    id: "post-sunscreen-layering",
    slug: "sunscreen-under-makeup-no-pilling",
    title: "How to Layer Sunscreen Under Makeup Without Pilling",
    excerpt: "Fix texture clashes and improve wear-time with smart layer timing.",
    coverImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "skincare",
    tagSlugs: ["sunscreen", "makeup-prep", "texture"],
    authorId: "author-zoe",
    publishedAt: "2026-01-05T08:15:00.000Z",
    readTimeMinutes: 7,
    trendingScore: 91,
    sections: [
      {
        id: "thin-layers",
        heading: "Keep layers thin and intentional",
        content: [
          "Avoid stacking multiple silicone-heavy primers over dense sunscreen textures.",
          "A lightweight moisturizer and one sunscreen layer are often enough.",
        ],
      },
      {
        id: "set-time",
        heading: "Use proper set time",
        content: [
          "Wait at least two minutes before foundation and press your base on with a sponge.",
          "Rushing this step causes most mid-day separation issues.",
        ],
      },
      {
        id: "touch-ups",
        heading: "Handle touch-ups strategically",
        content: [
          "Blot first, then reapply coverage where needed. Do not pile product over oil.",
          "For long days, carry a compact sunscreen cushion for practical reapplication.",
        ],
      },
    ],
  },
  {
    id: "post-concealer-guide",
    slug: "concealer-brightening-vs-spot-correcting",
    title: "Concealer 101: Brightening vs Spot Correcting Techniques",
    excerpt:
      "Use two shades and placement logic to avoid heavy, over-concealed skin.",
    coverImage:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "makeup",
    tagSlugs: ["concealer", "base", "makeup-technique"],
    authorId: "author-maya",
    publishedAt: "2025-12-20T10:20:00.000Z",
    readTimeMinutes: 9,
    trendingScore: 83,
    sections: [
      {
        id: "shade-map",
        heading: "Create a shade map",
        content: [
          "Choose one concealer that matches your skin tone and one slightly brighter for strategic lift.",
          "This separates coverage from highlighting and keeps results natural.",
        ],
      },
      {
        id: "application",
        heading: "Apply in dots, not swipes",
        content: [
          "Use minimal dots where darkness or redness is strongest, then tap to blend outward.",
          "Swiping too much product at once creates creasing and patchiness.",
        ],
      },
      {
        id: "set-smart",
        heading: "Set only where needed",
        content: [
          "Set under-eyes lightly and leave drier spots unset for a more skin-like finish.",
          "Choose a fine-milled powder and press, never drag.",
        ],
      },
    ],
  },
  {
    id: "post-heatless-curls",
    slug: "heatless-curls-that-last",
    title: "Heatless Curls That Last All Day: Prep and Setting Formula",
    excerpt: "A humidity-resistant method for soft curls without thermal damage.",
    coverImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "haircare",
    tagSlugs: ["heatless", "styling", "curl-routine"],
    authorId: "author-lina",
    publishedAt: "2026-01-14T06:30:00.000Z",
    readTimeMinutes: 8,
    trendingScore: 87,
    sections: [
      {
        id: "damp-balance",
        heading: "Start with balanced dampness",
        content: [
          "Hair should feel 70% dry before wrapping. Too wet and curls drop; too dry and they won't set.",
          "A pea-size styling cream helps hold shape while staying touchable.",
        ],
      },
      {
        id: "wrapping-method",
        heading: "Wrap with consistent tension",
        content: [
          "Keep each section equal and wrap away from your face for a lifted effect.",
          "Loose ends can be secured with a soft scrunchie to prevent dents.",
        ],
      },
      {
        id: "finish",
        heading: "Lock in shape without stiffness",
        content: [
          "After releasing curls, separate with a few drops of lightweight oil and mist flexible spray.",
          "Avoid heavy brushing until late day to preserve definition.",
        ],
      },
    ],
  },
  {
    id: "post-hydration-habits",
    slug: "hydration-habits-for-glow",
    title: "7 Hydration Habits That Improve Skin Texture in 2 Weeks",
    excerpt:
      "Small daily upgrades that support barrier function and consistent glow.",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "wellness",
    tagSlugs: ["hydration", "habit-stacking", "skin-health"],
    authorId: "author-lina",
    publishedAt: "2025-12-08T09:10:00.000Z",
    readTimeMinutes: 7,
    trendingScore: 80,
    sections: [
      {
        id: "timing",
        heading: "Anchor hydration to existing routines",
        content: [
          "Drink water at routine moments: after brushing, before lunch, and before your afternoon reset.",
          "Habit stacking beats relying on memory alone.",
        ],
      },
      {
        id: "electrolyte-balance",
        heading: "Include electrolyte balance",
        content: [
          "Hydration quality matters as much as quantity, especially after workouts or high-caffeine days.",
          "A low-sugar electrolyte option can reduce dehydration headaches.",
        ],
      },
      {
        id: "skin-support",
        heading: "Pair internal and topical hydration",
        content: [
          "Use humectants in skincare and support with consistent fluid intake to improve skin comfort.",
          "Track skin changes weekly rather than daily to see real progress.",
        ],
      },
    ],
  },
  {
    id: "post-accessory-rules",
    slug: "accessory-rules-to-upgrade-outfits",
    title: "3 Accessory Rules That Instantly Upgrade Simple Outfits",
    excerpt:
      "Use scale, contrast, and repetition to build polished looks in minutes.",
    coverImage:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "style",
    tagSlugs: ["accessories", "style-hacks", "outfit-formula"],
    authorId: "author-maya",
    publishedAt: "2026-01-02T11:00:00.000Z",
    readTimeMinutes: 6,
    trendingScore: 77,
    sections: [
      {
        id: "scale-rule",
        heading: "Balance by scale",
        content: [
          "If your outfit is oversized, use one structured accessory to sharpen the silhouette.",
          "If your outfit is sleek and minimal, choose one statement piece with texture.",
        ],
      },
      {
        id: "color-echo",
        heading: "Echo one color twice",
        content: [
          "Repeat one accent color in two separate places, like shoes and earrings, for visual cohesion.",
          "This trick makes basics look intentionally styled.",
        ],
      },
      {
        id: "finish-mix",
        heading: "Mix finishes thoughtfully",
        content: [
          "Combine matte and shine to create dimension without clutter.",
          "Aim for one hero finish and let supporting pieces stay quiet.",
        ],
      },
    ],
  },
  {
    id: "post-10-minute-am",
    slug: "10-minute-am-beauty-system",
    title: "The 10-Minute AM Beauty System That Actually Sticks",
    excerpt:
      "A compressed morning plan that keeps skin protected and makeup polished on tight schedules.",
    coverImage:
      "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=1400&q=80",
    categorySlug: "routines",
    tagSlugs: ["morning-routine", "time-saving", "beauty-system"],
    authorId: "author-zoe",
    publishedAt: "2026-02-10T07:10:00.000Z",
    readTimeMinutes: 8,
    trendingScore: 97,
    sections: [
      {
        id: "minute-map",
        heading: "Map your minutes",
        content: [
          "Allocate specific minutes per step: cleanse (1), hydrate (2), SPF (2), base + blush (3), brows + lips (2).",
          "Visible time boxes reduce overthinking and help you stay consistent.",
        ],
      },
      {
        id: "product-zone",
        heading: "Build a one-zone product setup",
        content: [
          "Store your entire AM routine in one tray organized by sequence.",
          "Physical friction is often the biggest blocker to routine adherence.",
        ],
      },
      {
        id: "fallback-plan",
        heading: "Use a fallback version",
        content: [
          "Have a 4-minute version for busy mornings with cleanse, moisturizer, SPF, and one complexion product.",
          "A fallback keeps your routine alive even on chaotic days.",
        ],
      },
    ],
  },
];

export const shopItems: ShopItem[] = [
  {
    id: "shop-1",
    slug: "daily-barrier-moisturizer",
    title: "Daily Barrier Moisturizer",
    description: "Fragrance-free cream with ceramides and squalane.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    categorySlug: "skincare",
    brand: "LumaLab",
    price: 28,
    originalPrice: 34,
    rating: 4.8,
    featured: true,
    affiliateUrl: "https://herbeautyhacks.com/go/daily-barrier-moisturizer",
  },
  {
    id: "shop-2",
    slug: "soft-focus-skin-tint",
    title: "Soft Focus Skin Tint",
    description: "Buildable tint with natural satin finish.",
    image:
      "https://images.unsplash.com/photo-1599733589046-10c0057390d2?auto=format&fit=crop&w=900&q=80",
    categorySlug: "makeup",
    brand: "Veil Theory",
    price: 32,
    rating: 4.7,
    featured: true,
    affiliateUrl: "https://herbeautyhacks.com/go/soft-focus-skin-tint",
  },
  {
    id: "shop-3",
    slug: "scalp-balance-shampoo",
    title: "Scalp Balance Shampoo",
    description: "Clarifying formula designed for weekly reset days.",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
    categorySlug: "haircare",
    brand: "Root Ritual",
    price: 24,
    rating: 4.6,
    affiliateUrl: "https://herbeautyhacks.com/go/scalp-balance-shampoo",
  },
  {
    id: "shop-4",
    slug: "hydration-electrolyte-sticks",
    title: "Hydration Electrolyte Sticks",
    description: "Low-sugar hydration packets with balanced minerals.",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=80",
    categorySlug: "wellness",
    brand: "Flow Fuel",
    price: 19,
    rating: 4.5,
    affiliateUrl: "https://herbeautyhacks.com/go/hydration-electrolyte-sticks",
  },
  {
    id: "shop-5",
    slug: "thermal-protect-mist",
    title: "Thermal Protect Mist",
    description: "Lightweight heat protectant with humidity defense.",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80",
    categorySlug: "haircare",
    brand: "Root Ritual",
    price: 22,
    rating: 4.4,
    affiliateUrl: "https://herbeautyhacks.com/go/thermal-protect-mist",
  },
  {
    id: "shop-6",
    slug: "cream-blush-duo",
    title: "Cream Blush Duo",
    description: "Two-stack compact for sculpt + flush looks.",
    image:
      "https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?auto=format&fit=crop&w=900&q=80",
    categorySlug: "makeup",
    brand: "Veil Theory",
    price: 26,
    rating: 4.6,
    affiliateUrl: "https://herbeautyhacks.com/go/cream-blush-duo",
  },
  {
    id: "shop-7",
    slug: "silk-pillowcase-set",
    title: "Silk Pillowcase Set",
    description: "Breathable pair designed for skin and hair comfort.",
    image:
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=900&q=80",
    categorySlug: "wellness",
    brand: "Night Theory",
    price: 39,
    rating: 4.7,
    affiliateUrl: "https://herbeautyhacks.com/go/silk-pillowcase-set",
  },
  {
    id: "shop-8",
    slug: "uv-shield-fluid-spf50",
    title: "UV Shield Fluid SPF 50",
    description: "Weightless broad-spectrum protection for daily wear.",
    image:
      "https://images.unsplash.com/photo-1556229174-fd6a6ff82eb0?auto=format&fit=crop&w=900&q=80",
    categorySlug: "skincare",
    brand: "LumaLab",
    price: 29,
    rating: 4.9,
    featured: true,
    affiliateUrl: "https://herbeautyhacks.com/go/uv-shield-fluid-spf50",
  },
  {
    id: "shop-9",
    slug: "capsule-wardrobe-tote",
    title: "Capsule Wardrobe Tote",
    description: "Structured everyday tote with organizer inserts.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    categorySlug: "style",
    brand: "Atelier East",
    price: 58,
    rating: 4.5,
    affiliateUrl: "https://herbeautyhacks.com/go/capsule-wardrobe-tote",
  },
  {
    id: "shop-10",
    slug: "weekly-reset-planner",
    title: "Weekly Reset Planner",
    description: "Minimal planner for routines, meals, and beauty goals.",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80",
    categorySlug: "routines",
    brand: "Quiet Grid",
    price: 18,
    rating: 4.3,
    affiliateUrl: "https://herbeautyhacks.com/go/weekly-reset-planner",
  },
  {
    id: "shop-11",
    slug: "precision-concealer-brush",
    title: "Precision Concealer Brush",
    description: "Dense micro-brush for spot correcting and blending.",
    image:
      "https://images.unsplash.com/photo-1585232350734-9748c7dc7f2f?auto=format&fit=crop&w=900&q=80",
    categorySlug: "makeup",
    brand: "Studio North",
    price: 16,
    rating: 4.2,
    affiliateUrl: "https://herbeautyhacks.com/go/precision-concealer-brush",
  },
  {
    id: "shop-12",
    slug: "overnight-lip-mask",
    title: "Overnight Lip Mask",
    description: "Nourishing overnight balm with peptide support.",
    image:
      "https://images.unsplash.com/photo-1608051312931-a7f8ecf72c27?auto=format&fit=crop&w=900&q=80",
    categorySlug: "skincare",
    brand: "LumaLab",
    price: 21,
    rating: 4.6,
    affiliateUrl: "https://herbeautyhacks.com/go/overnight-lip-mask",
  },
];

export const webStories: WebStory[] = [
  {
    id: "story-1",
    slug: "3-minute-glow-check",
    title: "3-Minute Glow Check Before You Leave",
    excerpt: "A fast mirror routine for skin, brows, and lip balance.",
    coverImage:
      "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?auto=format&fit=crop&w=900&q=80",
    categorySlug: "routines",
    publishedAt: "2026-02-12T08:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "story-2",
    slug: "spf-layering-mistakes",
    title: "SPF Layering Mistakes to Stop Making",
    excerpt: "Three texture clashes that cause makeup pilling.",
    coverImage:
      "https://images.unsplash.com/photo-1556229174-fd6a6ff82eb0?auto=format&fit=crop&w=900&q=80",
    categorySlug: "skincare",
    publishedAt: "2026-02-09T08:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "story-3",
    slug: "blush-placement-map",
    title: "Blush Placement Map in 5 Slides",
    excerpt: "Lift, sculpt, or soften with simple placement shifts.",
    coverImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    categorySlug: "makeup",
    publishedAt: "2026-02-06T08:00:00.000Z",
    readTimeMinutes: 3,
  },
  {
    id: "story-4",
    slug: "scalp-reset-timeline",
    title: "Your Weekly Scalp Reset Timeline",
    excerpt: "Exactly what to do pre-wash, wash, and post-wash.",
    coverImage:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
    categorySlug: "haircare",
    publishedAt: "2026-02-01T08:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "story-5",
    slug: "sleep-routine-for-skin",
    title: "Sleep Routine Tweaks for Better Skin",
    excerpt: "Environment and habits that improve overnight recovery.",
    coverImage:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    categorySlug: "wellness",
    publishedAt: "2026-01-28T08:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "story-6",
    slug: "capsule-closet-color-rules",
    title: "Capsule Closet Color Rules",
    excerpt: "How to match wardrobe tones to your beauty palette.",
    coverImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    categorySlug: "style",
    publishedAt: "2026-01-22T08:00:00.000Z",
    readTimeMinutes: 3,
  },
  {
    id: "story-7",
    slug: "desk-to-dinner-touch-up",
    title: "Desk-to-Dinner Touch-Up Formula",
    excerpt: "Refresh your look in under four minutes.",
    coverImage:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=900&q=80",
    categorySlug: "makeup",
    publishedAt: "2026-01-19T08:00:00.000Z",
    readTimeMinutes: 2,
  },
  {
    id: "story-8",
    slug: "morning-routine-speed-build",
    title: "Build a Faster Morning Routine",
    excerpt: "A 10-minute sequence that stays consistent all week.",
    coverImage:
      "https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=900&q=80",
    categorySlug: "routines",
    publishedAt: "2026-01-15T08:00:00.000Z",
    readTimeMinutes: 3,
  },
  {
    id: "story-9",
    slug: "hydration-habits-scorecard",
    title: "Hydration Habits Scorecard",
    excerpt: "Track your glow-supporting habits for seven days.",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
    categorySlug: "wellness",
    publishedAt: "2026-01-11T08:00:00.000Z",
    readTimeMinutes: 2,
  },
];
