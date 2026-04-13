const PRODUCTS = [
  {
    id: "rgg-001",
    name: "Cabretta Leather Golf Glove",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 29.99,
    originalPrice: null,
    badge: "Best Seller",
    description: "Premium cabretta leather palm for superior grip and feel. Breathable lycra back keeps your hand cool in warm conditions. Reinforced thumb and index finger for extended durability. Available in multiple sizes for the perfect fit.",
    images: ["https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80"],
    variants: {
      size: ["Small", "Medium", "Large", "XL"],
      hand: ["Left Hand (RH Golfer)", "Right Hand (LH Golfer)"]
    },
    stock: 99,
    featured: true,
    aliexpressUrl: "https://www.alibaba.com/trade/search?SearchText=CANLEO+cabretta+leather+golf+glove"
  },
  {
    id: "rgg-002",
    name: "Premium Golf Balls (12 Pack)",
    category: "balls",
    categoryLabel: "Balls",
    price: 34.99,
    originalPrice: null,
    badge: null,
    description: "High-performance OEM golf balls engineered for distance and control. Consistent flight path and exceptional feel around the greens. Perfect for all skill levels. Pack of 12.",
    images: ["https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&q=80"],
    variants: {},
    stock: 99,
    featured: true,
    aliexpressUrl: "https://www.alibaba.com/trade/search?SearchText=new+gaopin+golf+balls+OEM+bulk"
  },
  {
    id: "rgg-003",
    name: "Golf Tees (100 Pack)",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 9.99,
    originalPrice: null,
    badge: null,
    description: "Pack of 100 premium golf tees. Consistent height for repeatable tee shots. Durable construction that won't snap on mis-hits. Compatible with all driver and wood sizes. Every serious golfer's bag essential.",
    images: ["https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80"],
    variants: {
      size: ["Standard (70mm)", "Short (54mm)", "Mixed Pack"]
    },
    stock: 99,
    featured: false,
    aliexpressUrl: "https://www.alibaba.com/trade/search?SearchText=toproadpins+golf+tees+bulk+wholesale"
  },
  {
    id: "rgg-004",
    name: "Laser Rangefinder Pro",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 149.99,
    originalPrice: 199.99,
    badge: "Sale",
    description: "Professional-grade laser rangefinder with pin-seeking technology. Accurate to within 1 yard up to 600 metres. Slope compensation mode for precise distance calculation on uneven terrain. Compact, lightweight design fits in any golf bag. Free shipping included.",
    images: ["https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80"],
    variants: {},
    stock: 30,
    featured: true,
    aliexpressUrl: "https://www.alibaba.com/trade/search?SearchText=lango+golf+rangefinder+laser+OEM"
  },
  {
    id: "rgg-005",
    name: "Golf Ball Finder Glasses",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 34.99,
    originalPrice: null,
    badge: "New",
    description: "Never lose a golf ball again. Special blue lens technology filters out background colours and makes white golf balls stand out instantly — even in deep rough. Lightweight frame, UV400 protection. The ultimate course companion and a perfect gift for any golfer.",
    images: ["https://images.unsplash.com/photo-1576766742800-0e0e7f3c7f26?w=800&q=80"],
    variants: {},
    stock: 50,
    featured: true,
    aliexpressUrl: "https://www.alibaba.com/trade/search?SearchText=anlorr+golf+ball+finder+glasses+blue+lens"
  },
  {
    id: "rgg-006",
    name: "UV Protection Arm Sleeves",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 19.99,
    originalPrice: null,
    badge: null,
    description: "Stay protected and comfortable on the course with UPF50+ arm sleeves. Moisture-wicking fabric keeps you cool in the Australian sun. Non-slip grip stays in place through your entire round. Available in multiple colours. Sold as a pair.",
    images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"],
    variants: {
      color: ["Black", "White", "Navy", "Grey"],
      size: ["S/M", "L/XL"]
    },
    stock: 99,
    featured: false,
    aliexpressUrl: "https://www.alibaba.com/trade/search?SearchText=yiwu+rock+golf+arm+sleeve+UV+protection"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "clubs", label: "Clubs" },
  { id: "balls", label: "Balls" },
  { id: "apparel", label: "Apparel" },
  { id: "accessories", label: "Accessories" }
];
