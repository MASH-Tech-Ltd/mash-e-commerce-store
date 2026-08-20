import { Category } from "../modules/category/category.model";
import { Product } from "../modules/product/product.model";
import { Theme } from "../modules/theme/theme.model";
import { deleteCloudinary } from "../helpers/cloudinary";

// ─── Category Image Map ────────────────────────────────────────────
const categoryImages: Record<string, { img1: string; img2: string }> = {
  ল্যাপটপ: {
    img1: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
  },
  স্মার্টফোন: {
    img1: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800",
  },
  "হেডফোন ও ইয়ারবাড": {
    img1: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800",
  },
  ট্যাবলেট: {
    img1: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1542751110-97427bbecfd8?auto=format&fit=crop&q=80&w=800",
  },
  স্মার্টওয়াচ: {
    img1: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800",
  },
  গেমিং: {
    img1: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800",
  },
  আনুষঙ্গিক: {
    img1: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?auto=format&fit=crop&q=80&w=800",
  },
  ক্যামেরা: {
    img1: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1502920917128-1aa500764b10?auto=format&fit=crop&q=80&w=800",
  },
  প্রিন্টার: {
    img1: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1633514879654-c63f5b3fc34c?auto=format&fit=crop&q=80&w=800",
  },
  টেলিভিশন: {
    img1: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
  },
  "রাউটার ও নেটওয়ার্ক": {
    img1: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
  },
  "স্টোরেজ ও ড্রাইভ": {
    img1: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&q=80&w=800",
  },
  "কীবোর্ড ও মাউস": {
    img1: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&q=80&w=800",
  },
  মনিটর: {
    img1: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800",
  },
  স্পিকার: {
    img1: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800",
  },
  "পাওয়ার ব্যাংক": {
    img1: "https://images.unsplash.com/photo-1609592806596-b3d8f9c1ec1a?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
  },
  "চার্জার ও কেবল": {
    img1: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
  },
  "ওয়েবক্যাম ও মাইক্রোফোন": {
    img1: "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800",
  },
  "গেমিং চেয়ার": {
    img1: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800",
  },
  ড্রোন: {
    img1: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800",
  },
  "স্মার্ট হোম": {
    img1: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
  },
  প্রজেক্টর: {
    img1: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1601933470096-0e34634ffcde?auto=format&fit=crop&q=80&w=800",
  },
  "গ্রাফিক্স কার্ড": {
    img1: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800",
  },
  "র‍্যাম ও প্রসেসর": {
    img1: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1562976540-1502c2145851?auto=format&fit=crop&q=80&w=800",
  },
  "কুলিং ফ্যান": {
    img1: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1601233749202-d91b5cdde1e1?auto=format&fit=crop&q=80&w=800",
  },
  "ই-রিডার": {
    img1: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=800",
  },
  "ইউপিএস ও স্ট্যাবিলাইজার": {
    img1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
  },
  "সিসিটিভি ও নিরাপত্তা": {
    img1: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
  },
  "লেজার পয়েন্টার ও উপস্থাপনা": {
    img1: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
  },
  "মেমোরি কার্ড ও পেনড্রাইভ": {
    img1: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=800",
    img2: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800",
  },
};

// ─── Product Templates per Category ───────────────────────────────
const productTemplates: Record<
  string,
  {
    name: string;
    brand: string;
    isVariant: boolean;
    variantType: "color" | "storage" | "size" | "none";
  }[]
> = {
  ল্যাপটপ: [
    {
      name: "স্যামসাং গ্যালাক্সি বুক ৩ প্রো",
      brand: "Samsung",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "অ্যাপেল ম্যাকবুক এয়ার এম৩",
      brand: "Apple",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "ডেল এক্সপিএস ১৫",
      brand: "Dell",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "এইচপি ভিক্টাস গেমিং ল্যাপটপ",
      brand: "HP",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "আসুস রগ জেফাইরাস জি১৪",
      brand: "Asus",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "লেনোভো থিংকপ্যাড এক্স১ কার্বন",
      brand: "Lenovo",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "মাইক্রোসফট সারফেস ল্যাপটপ ৫",
      brand: "Microsoft",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "অ্যাপেল ম্যাকবুক প্রো ১৬ এম৩ ম্যাক্স",
      brand: "Apple",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "আসুস জেনবুক প্রো ডুও",
      brand: "Asus",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এলজি গ্রাম ১৭",
      brand: "LG",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রেজার ব্লেড ১৬",
      brand: "Razer",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "এমএসআই গেমিং ল্যাপটপ জিই৭৬",
      brand: "MSI",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "হুয়াওয়ে ম্যাটবুক ডি১৫",
      brand: "Huawei",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "সনি ভায়ো এফই ১৬",
      brand: "Sony",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "গিগাবাইট এওরাস ১৫",
      brand: "Gigabyte",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ডেল ইন্সপায়রন ১৬ প্লাস",
      brand: "Dell",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এইচপি এলিটবুক ৮৪০ জি১০",
      brand: "HP",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "লেনোভো আইডিয়াপ্যাড গেমিং ৩",
      brand: "Lenovo",
      isVariant: true,
      variantType: "storage",
    },
  ],
  স্মার্টফোন: [
    {
      name: "স্যামসাং গ্যালাক্সি এস২৪ আল্ট্রা",
      brand: "Samsung",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "অ্যাপেল আইফোন ১৫ প্রো ম্যাক্স",
      brand: "Apple",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "শাওমি ১৪ প্রো",
      brand: "Xiaomi",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "ওয়ানপ্লাস ১২",
      brand: "OnePlus",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "গুগল পিক্সেল ৮ প্রো",
      brand: "Google",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "অপো ফাইন্ড এক্স৭ আল্ট্রা",
      brand: "OPPO",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ভিভো এক্স১০০ প্রো",
      brand: "Vivo",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "রিয়েলমি জিটি৫ প্রো",
      brand: "Realme",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "শাওমি রেডমি নোট ১৩ প্রো",
      brand: "Xiaomi",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "স্যামসাং গ্যালাক্সি এ৫৫",
      brand: "Samsung",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "অ্যাপেল আইফোন ১৫",
      brand: "Apple",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "মোটোরোলা এজ ৪০ প্রো",
      brand: "Motorola",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "নোকিয়া জি৬০ ৫জি",
      brand: "Nokia",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ইনফিনিক্স নোট ৩০ প্রো",
      brand: "Infinix",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "টেকনো ফ্যান্টম ভি ফোল্ড",
      brand: "Tecno",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ওয়ানপ্লাস নর্ড সিই৩ লাইট",
      brand: "OnePlus",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "স্যামসাং গ্যালাক্সি জেড ফ্লিপ ৫",
      brand: "Samsung",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "শাওমি পকো এক্স৬ প্রো",
      brand: "Xiaomi",
      isVariant: false,
      variantType: "none",
    },
  ],
  "হেডফোন ও ইয়ারবাড": [
    {
      name: "সনি ডব্লিউএইচ-১০০০এক্সএম৫ নয়েজ ক্যান্সেলিং",
      brand: "Sony",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "বোজ কোয়াইটকমফোর্ট ৪৫",
      brand: "Bose",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "অ্যাপেল এয়ারপডস প্রো ২য় প্রজন্ম",
      brand: "Apple",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "স্যামসাং গ্যালাক্সি বাডস ২ প্রো",
      brand: "Samsung",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "জেবিএল ট্যুর প্রো ২",
      brand: "JBL",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "সেনহাইজার এমডি ৬৬০এস বিটি",
      brand: "Sennheiser",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অডিও-টেকনিকা এটিএইচ-এম৫০এক্সবিটি",
      brand: "Audio-Technica",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "শাওমি রেডমি বাডস ৫ প্রো",
      brand: "Xiaomi",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "ওয়ানপ্লাস বাডস প্রো ২",
      brand: "OnePlus",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "হার্মান কার্ডন ওভাটা স্টুডিও",
      brand: "Harman Kardon",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "বিটস স্টুডিও প্রো",
      brand: "Beats",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "বোজ কোয়াইটকমফোর্ট ইয়ারবাডস",
      brand: "Bose",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "জেবিএল লাইভ ৬৬০এনসি",
      brand: "JBL",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "সনি ডব্লিউএফ-১০০০এক্সএম৫",
      brand: "Sony",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "আনকার সাউন্ডকোর কিউ৪৫",
      brand: "Anker",
      isVariant: true,
      variantType: "color",
    },
  ],
  ট্যাবলেট: [
    {
      name: 'অ্যাপেল আইপ্যাড প্রো ১২.৯" এম২',
      brand: "Apple",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "স্যামসাং গ্যালাক্সি ট্যাব এস৯ আল্ট্রা",
      brand: "Samsung",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "শাওমি পড ৬ প্রো",
      brand: "Xiaomi",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অ্যামাজন ফায়ার এইচডি ১০",
      brand: "Amazon",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "লেনোভো ট্যাব পি১২ প্রো",
      brand: "Lenovo",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অ্যাপেল আইপ্যাড এয়ার ৫ম প্রজন্ম",
      brand: "Apple",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "স্যামসাং গ্যালাক্সি ট্যাব এ৯ প্লাস",
      brand: "Samsung",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "মাইক্রোসফট সারফেস প্রো ৯",
      brand: "Microsoft",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "হুয়াওয়ে ম্যাটিপ্যাড প্রো ১১",
      brand: "Huawei",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রিয়েলমি প্যাড ২",
      brand: "Realme",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অনার প্যাড ৮",
      brand: "Honor",
      isVariant: false,
      variantType: "none",
    },
  ],
  স্মার্টওয়াচ: [
    {
      name: "অ্যাপেল ওয়াচ সিরিজ ৯",
      brand: "Apple",
      isVariant: true,
      variantType: "size",
    },
    {
      name: "স্যামসাং গ্যালাক্সি ওয়াচ ৬ ক্লাসিক",
      brand: "Samsung",
      isVariant: true,
      variantType: "size",
    },
    {
      name: "গার্মিন ফেনিক্স ৭ সোলার",
      brand: "Garmin",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "শাওমি মি ব্যান্ড ৮ প্রো",
      brand: "Xiaomi",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "হুয়াওয়ে ওয়াচ জিটি৪",
      brand: "Huawei",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "ফিটবিট সেন্স ২",
      brand: "Fitbit",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "অনার ওয়াচ ম্যাজিক ৪ প্রো",
      brand: "Honor",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রিয়েলমি ওয়াচ ৩ প্রো",
      brand: "Realme",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "অ্যামাজফিট জিটিআর ৪",
      brand: "Amazfit",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "বোল্ট ফিটনেস ব্যান্ড",
      brand: "Bolt",
      isVariant: false,
      variantType: "none",
    },
  ],
  গেমিং: [
    {
      name: "প্লেস্টেশন ৫ কনসোল",
      brand: "Sony",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এক্সবক্স সিরিজ এক্স",
      brand: "Microsoft",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "নিন্টেন্ডো সুইচ ওলেড",
      brand: "Nintendo",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "রেজার ডেথঅ্যাডার ভি৩ গেমিং মাউস",
      brand: "Razer",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "লজিটেক জি৯১৫ মেকানিকাল কীবোর্ড",
      brand: "Logitech",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "স্টিলসিরিজ আর্কটিস নোভা প্রো গেমিং হেডসেট",
      brand: "SteelSeries",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এইচওআরআই ফাইটিং স্টিক আলফা",
      brand: "Hori",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রেজার হান্টসম্যান ভি৩ প্রো কীবোর্ড",
      brand: "Razer",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "কর্সায়ার এইচএস৮০ আরজিবি হেডসেট",
      brand: "Corsair",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "অ্যাসটেল সি৪০ কনট্রোলার",
      brand: "Astel",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এলিট কনট্রোলার সিরিজ ২",
      brand: "Microsoft",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "পিএস৫ ডুয়ালসেন্স এজ",
      brand: "Sony",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "লজিটেক জি প্রো এক্স সুপারলাইট ২",
      brand: "Logitech",
      isVariant: true,
      variantType: "color",
    },
  ],
  আনুষঙ্গিক: [
    {
      name: "অ্যাপেল ম্যাগসেফ চার্জার",
      brand: "Apple",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "স্যামসাং ৪৫ওয়াট সুপার ফাস্ট চার্জার",
      brand: "Samsung",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "টোটলিং টাইপ-সি হাব ৭ ইন ১",
      brand: "Totaling",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "বেলকিন বুস্টচার্জ ওয়্যারলেস চার্জিং প্যাড",
      brand: "Belkin",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "স্যামসাং ৩৫ওয়াট ডুয়াল চার্জার",
      brand: "Samsung",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ফোনিক্স ব্র্যান্ড স্ক্রিন প্রটেক্টর",
      brand: "Phoenix",
      isVariant: true,
      variantType: "size",
    },
    {
      name: "ইউনিভার্সাল ল্যাপটপ স্ট্যান্ড",
      brand: "Universal",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "কেনসিংটন ল্যাপটপ লক",
      brand: "Kensington",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ক্যাবল ম্যানেজমেন্ট সেট",
      brand: "Generic",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এলিগেটো কী লাইট এয়ার",
      brand: "Elgato",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "স্পিজেন রাগড আর্মার কেস",
      brand: "Spigen",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "অ্যানকার ৬৫ওয়াট পিডি নানো চার্জার",
      brand: "Anker",
      isVariant: false,
      variantType: "none",
    },
  ],
  ক্যামেরা: [
    {
      name: "সনি আলফা ৭৪ মিরোরলেস ক্যামেরা",
      brand: "Sony",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ক্যানন ইওএস আর৬ মার্ক ২",
      brand: "Canon",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "নিকন জেড৮",
      brand: "Nikon",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ফুজিফিল্ম এক্স-টি৫",
      brand: "Fujifilm",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "গোপ্রো হিরো ১২ ব্ল্যাক",
      brand: "GoPro",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ডিজেআই পকেট ৩",
      brand: "DJI",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ইন্সটাক্স মিনি ১২ ইনস্ট্যান্ট ক্যামেরা",
      brand: "Fujifilm",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "ক্যানন পাওয়ারশট ভি১০ ভ্লগ ক্যামেরা",
      brand: "Canon",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "সনি জেডভি-ই১০ ভ্লগ ক্যামেরা",
      brand: "Sony",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রিকো থেটা এক্স ৩৬০ ক্যামেরা",
      brand: "Ricoh",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "লাইকা কিউ৩",
      brand: "Leica",
      isVariant: false,
      variantType: "none",
    },
  ],
  প্রিন্টার: [
    {
      name: "এপসন ইকোট্যাংক এল৩২১০ অল-ইন-ওয়ান",
      brand: "Epson",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ক্যানন পিক্সমা জি৭০৮০",
      brand: "Canon",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এইচপি লেজারজেট প্রো এম৪২৮এফডব্লিউ",
      brand: "HP",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ব্রাদার এইচএল-এল২৩৭০ডিডব্লিউ লেজার প্রিন্টার",
      brand: "Brother",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এপসন এল৬৫৯০ ওয়াই-ফাই প্রিন্টার",
      brand: "Epson",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ক্যানন সেলফি স্কোয়ার কিউএক্স১০",
      brand: "Canon",
      isVariant: true,
      variantType: "color",
    },
  ],
  টেলিভিশন: [
    {
      name: 'স্যামসাং ৫৫" কিউএলইডি ৪কে স্মার্ট টিভি',
      brand: "Samsung",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'এলজি ৬৫" ওলেড ইভো সি৩ টিভি',
      brand: "LG",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'সনি ব্রাভিয়া ৭৫" ৪কে গুগল টিভি',
      brand: "Sony",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'টিসিএল ৫০" কিউলেড ৫জি স্মার্ট টিভি',
      brand: "TCL",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'শাওমি মি টিভি ৫ প্রো ৫৫"',
      brand: "Xiaomi",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'ওয়ালটন ডব্লিউডি৪৩ইউএইচ ৪৩" স্মার্ট টিভি',
      brand: "Walton",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'হাইসেন্স ৫৮" ৪কে আলইয়েড টিভি',
      brand: "Hisense",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'ভিইজিড ৪৫" স্মার্ট এলইডি টিভি',
      brand: "VIZIO",
      isVariant: false,
      variantType: "none",
    },
  ],
  "রাউটার ও নেটওয়ার্ক": [
    {
      name: "টিপিলিংক আর্চার এক্স৯০ ওয়াইফাই ৬ রাউটার",
      brand: "TP-Link",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "আসুস আরটি-এক্সই৭৮০০ ট্রাই-ব্যান্ড রাউটার",
      brand: "Asus",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "নেটগিয়ার নাইটহক আরএস৭০০ ওয়াইফাই ৭",
      brand: "Netgear",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "গ্লোবালিংক মেশ ওয়াইফাই ৬ সিস্টেম",
      brand: "GlobalLink",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "টিপিলিংক ডেকো এক্সই৭৫ মেশ সিস্টেম",
      brand: "TP-Link",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "মিক্রোটিক হাপ এসি৩ রাউটারবোর্ড",
      brand: "MikroTik",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ডি-লিংক ডিআইআর-৮৬০এল রাউটার",
      brand: "D-Link",
      isVariant: false,
      variantType: "none",
    },
  ],
  "স্টোরেজ ও ড্রাইভ": [
    {
      name: "স্যামসাং ৯৯০ প্রো ২টিবি এনভিএমই এসএসডি",
      brand: "Samsung",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "ওয়েস্টার্ন ডিজিটাল ব্ল্যাক ৪টিবি হার্ড ড্রাইভ",
      brand: "WD",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "সিগেট ব্যারাকুডা ২টিবি এইচডিডি",
      brand: "Seagate",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "স্যামসাং পোর্টেবল এক্স৫ ২টিবি",
      brand: "Samsung",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "লেক্সার ৫১২জিবি প্রফেশনাল এসএসডি",
      brand: "Lexar",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ক্রুসিয়াল পি৫ প্লাস ১টিবি এনভিএমই",
      brand: "Crucial",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "ওয়েস্টার্ন ডিজিটাল পোর্টেবল ২টিবি",
      brand: "WD",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "সিগেট এক্সপানশন ৫টিবি ডেস্কটপ",
      brand: "Seagate",
      isVariant: false,
      variantType: "none",
    },
  ],
  "কীবোর্ড ও মাউস": [
    {
      name: "লজিটেক এমএক্স কিজ ওয়্যারলেস কীবোর্ড",
      brand: "Logitech",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "রেজার হান্টসম্যান এলিট মেকানিকাল",
      brand: "Razer",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "লজিটেক এমএক্স মাস্টার ৩এস মাউস",
      brand: "Logitech",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "স্টিলসিরিজ এপেক্স প্রো মিনি",
      brand: "SteelSeries",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "কর্সায়ার কে৭০ আরজিবি প্রো",
      brand: "Corsair",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রক্যাট কোন এয়ার ওয়্যারলেস মাউস",
      brand: "Roccat",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "মাইক্রোসফট ব্লুটুথ কীবোর্ড ও মাউস কম্বো",
      brand: "Microsoft",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অ্যানকার এ৭৭২৬ মেকানিকাল কীবোর্ড",
      brand: "Anker",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "হাইপারএক্স অ্যালয় অরিজিনস ৬০",
      brand: "HyperX",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "গ্লোরিয়াস মডেল ডি- ওয়্যারলেস",
      brand: "Glorious",
      isVariant: true,
      variantType: "color",
    },
  ],
  মনিটর: [
    {
      name: 'স্যামসাং ২৭" ওলেড ৪কে গেমিং মনিটর',
      brand: "Samsung",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'এলজি ৩৪" আল্ট্রাওয়াইড কার্ভড মনিটর',
      brand: "LG",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এসুস প্রোআর্ট পিএ৩২ইউসিএক্স প্রো মনিটর",
      brand: "Asus",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'ডেল আলিয়েনওয়্যার ২৭" গেমিং মনিটর',
      brand: "Dell",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'এওসি ২৪" ফুলএইচডি ১৪৪হার্জ মনিটর',
      brand: "AOC",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "বেনকিউ পিডি৩২২০ ফটো ভিডিও মনিটর",
      brand: "BenQ",
      isVariant: false,
      variantType: "none",
    },
    {
      name: 'ফিলিপস ২৭" পাওয়ারসেন্সার মনিটর',
      brand: "Philips",
      isVariant: false,
      variantType: "none",
    },
  ],
  স্পিকার: [
    {
      name: "সনি এসআরএস-এক্সবি৪৩ ব্লুটুথ স্পিকার",
      brand: "Sony",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "বোজ সাউন্ডলিংক ম্যাক্স",
      brand: "Bose",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "জেবিএল প্যারিজ ৩১০",
      brand: "JBL",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "মার্শাল স্ট্যান্টন ব্লুটুথ স্পিকার",
      brand: "Marshall",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "আলটিমেট ইয়ার্স হাইপারবুম",
      brand: "UE",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "হার্মান কার্ডন অনিক্স স্টুডিও ৮",
      brand: "Harman Kardon",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "শাওমি স্মার্ট স্পিকার",
      brand: "Xiaomi",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অ্যামাজন ইকো (৪র্থ প্রজন্ম)",
      brand: "Amazon",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "গুগল নেস্ট অডিও স্মার্ট স্পিকার",
      brand: "Google",
      isVariant: true,
      variantType: "color",
    },
  ],
  "পাওয়ার ব্যাংক": [
    {
      name: "অ্যানকার ২৪,০০০মাহ ম্যাগসেফ পাওয়ার ব্যাংক",
      brand: "Anker",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "শাওমি ৩৩ওয়াট ২০০০০ মাহ পাওয়ার ব্যাংক",
      brand: "Xiaomi",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "স্যামসাং ২৫ওয়াট ১০০০০মাহ পাওয়ার ব্যাংক",
      brand: "Samsung",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "বেসিউস গেনসোলার ৬৫ওয়াট পাওয়ার ব্যাংক",
      brand: "Baseus",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অ্যানকার ৬৫৭ পাওয়ারকোর ২৪,০০০",
      brand: "Anker",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "জেনব্লেড ৩৫ওয়াট ১৫০০০মাহ ম্যাগনেটিক",
      brand: "Zendure",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ভেগার পোর্টো ক্যু পাওয়ার ব্যাংক",
      brand: "Veger",
      isVariant: false,
      variantType: "none",
    },
  ],
  "চার্জার ও কেবল": [
    {
      name: "অ্যানকার ৭৩৬ ন্যানো ২ ৬৫ওয়াট চার্জার",
      brand: "Anker",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "বেলকিন ৩৬ওয়াট ডুয়াল পোর্ট চার্জার",
      brand: "Belkin",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অ্যাপেল ৬১ওয়াট ইউএসবি-সি পাওয়ার অ্যাডাপ্টার",
      brand: "Apple",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "স্যামসাং সুপার ফাস্ট কেবল টাইপ-সি",
      brand: "Samsung",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অ্যানকার ৬ফুট লাইটনিং কেবল",
      brand: "Anker",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "বেসিউস ১০০ওয়াট টাইপ-সি কেবল",
      brand: "Baseus",
      isVariant: false,
      variantType: "none",
    },
  ],
  "ওয়েবক্যাম ও মাইক্রোফোন": [
    {
      name: "লজিটেক সি৯২০ এইচডি প্রো ওয়েবক্যাম",
      brand: "Logitech",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রেজার কিয়ো প্রো ওয়েবক্যাম",
      brand: "Razer",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ব্লু ইয়েটি ইউএসবি মাইক্রোফোন",
      brand: "Blue",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "রোডে নটকাস্টার ইউএসবি মাইক্রোফোন",
      brand: "Rode",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এলগাটো ওয়েভ ৩ মাইক্রোফোন",
      brand: "Elgato",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "লজিটেক মিআর পোর্টেবল ক্যামেরা",
      brand: "Logitech",
      isVariant: false,
      variantType: "none",
    },
  ],
  "গেমিং চেয়ার": [
    {
      name: "রেজার আইশা প্রো গেমিং চেয়ার",
      brand: "Razer",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "সেক্রেটল্যাব টাইটান ইভো ২০২২",
      brand: "Secretlab",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "ডিএক্সরেসার ফর্মুলা সিরিজ চেয়ার",
      brand: "DXRacer",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "অ্যান্ড্রা রেসিং গেমিং চেয়ার",
      brand: "AndaSeat",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "ওবাস্কু রোকার গেমিং চেয়ার",
      brand: "Obash",
      isVariant: true,
      variantType: "color",
    },
  ],
  ড্রোন: [
    {
      name: "ডিজেআই মিনি ৩ প্রো",
      brand: "DJI",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ডিজেআই এয়ার ৩",
      brand: "DJI",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ডিজেআই ম্যাভিক ৩ ক্লাসিক",
      brand: "DJI",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অটেলো ইভো ন্যানো+ ড্রোন",
      brand: "Autel",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ডিজেআই ফপ ৪ প্রো",
      brand: "DJI",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "হলিস্টোন এইচএস৭২০ই ফোল্ডেবল ড্রোন",
      brand: "Holiston",
      isVariant: false,
      variantType: "none",
    },
  ],
  "স্মার্ট হোম": [
    {
      name: "আমাজন ইকো ডট (৫ম প্রজন্ম)",
      brand: "Amazon",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "গুগল নেস্ট হাব ম্যাক্স",
      brand: "Google",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ফিলিপস হিউ কালার স্টার্টার কিট",
      brand: "Philips",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "স্যামসাং স্মার্টথিংস হাব",
      brand: "Samsung",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রিং ভিডিও ডোরবেল প্রো",
      brand: "Ring",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "আমাজন সার্ভিলেন্স ক্যামেরা",
      brand: "Amazon",
      isVariant: false,
      variantType: "none",
    },
  ],
  প্রজেক্টর: [
    {
      name: "এপসন ইএইচ-টিডব্লিউ৭৮২০ ৪কে প্রজেক্টর",
      brand: "Epson",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "বেনকিউ ডব্লিউ২৭০০আই ৪কে প্রজেক্টর",
      brand: "BenQ",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এলজি সিনেবিম হ্যালো প্রজেক্টর",
      brand: "LG",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "আনকার নেবুলা সোলার পোর্টেবল",
      brand: "Anker",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "সনি ভিপিএল-ভিডব্লিউ৮৯০ইএস প্রজেক্টর",
      brand: "Sony",
      isVariant: false,
      variantType: "none",
    },
  ],
  "গ্রাফিক্স কার্ড": [
    {
      name: "এনভিডিয়া জিফোর্স আরটিএক্স ৪০৯০",
      brand: "Nvidia",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এএমডি রেডিওন আরএক্স ৭৯০০ এক্সটিএক্স",
      brand: "AMD",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এনভিডিয়া জিফোর্স আরটিএক্স ৪০৮০ সুপার",
      brand: "Nvidia",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এএমডি রেডিওন আরএক্স ৭৮০০ এক্সটি",
      brand: "AMD",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এনভিডিয়া আরটিএক্স ৪০৭০ টাই",
      brand: "Nvidia",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এএসইউএস ডুয়াল আরটিএক্স ৪০৬০ টাই",
      brand: "Asus",
      isVariant: false,
      variantType: "none",
    },
  ],
  "র‍্যাম ও প্রসেসর": [
    {
      name: "ইন্টেল কোর আই৯-১৪৯০০কে",
      brand: "Intel",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এএমডি রাইজেন ৯ ৭৯৫০এক্স",
      brand: "AMD",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "কিংস্টন ফিউরি বিস্ট ডিডিআর৫ ৩২জিবি",
      brand: "Kingston",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "কর্সায়ার ভেঞ্জেন্স আরজিবি ডিডিআর৫",
      brand: "Corsair",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "জি.স্কিল ট্রাইডেন্ট জেড৫ আরজিবি",
      brand: "G.Skill",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "ইন্টেল কোর আই৭-১৪৭০০কে",
      brand: "Intel",
      isVariant: false,
      variantType: "none",
    },
  ],
  "কুলিং ফ্যান": [
    {
      name: "নক্টুয়া এনএইচ-ডি১৫ সিপিইউ কুলার",
      brand: "Noctua",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "কর্সায়ার আইকিউ এলিট ৩৬০ লিকুইড কুলার",
      brand: "Corsair",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এনজেডএক্সটি ক্রাকেন এক্স৬৩ আরজিবি",
      brand: "NZXT",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "বি কুল হাইপার ২১২ ব্ল্যাক কুলার",
      brand: "Cooler Master",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "লিয়ান লি ইউনিফ্যান এসএল ১২০",
      brand: "Lian Li",
      isVariant: true,
      variantType: "color",
    },
  ],
  "ই-রিডার": [
    {
      name: "অ্যামাজন কিন্ডেল পেপারহোয়াইট ১১ম প্রজন্ম",
      brand: "Amazon",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "কোবো সাগা ই-রিডার",
      brand: "Kobo",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "অ্যামাজন কিন্ডেল ওসিস",
      brand: "Amazon",
      isVariant: true,
      variantType: "color",
    },
    {
      name: "রিমার্কেবল ২ পেপার ট্যাবলেট",
      brand: "reMarkable",
      isVariant: false,
      variantType: "none",
    },
  ],
  "ইউপিএস ও স্ট্যাবিলাইজার": [
    {
      name: "এপিসি ব্যাক-ইউপিএস ৬৫০ভিএ",
      brand: "APC",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "এপিসি স্মার্ট-ইউপিএস ১৫০০ভিএ",
      brand: "APC",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ইস্টার ইউপিএস ১২০০ভিএ",
      brand: "Easter",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "মাইক্রোটেক ইউপিএস ৬০০ভিএ",
      brand: "Microtech",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রহিমআফরোজ ভোল্টেজ স্ট্যাবিলাইজার",
      brand: "Rahimafrooz",
      isVariant: false,
      variantType: "none",
    },
  ],
  "সিসিটিভি ও নিরাপত্তা": [
    {
      name: "হিকভিশন ৪মেগাপিক্সেল আইপি ক্যামেরা",
      brand: "Hikvision",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ডাহুয়া ২মেগাপিক্সেল আইপি ক্যামেরা",
      brand: "Dahua",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "টিপিলিংক তাপো সি৫০০ ওয়্যারলেস ক্যামেরা",
      brand: "TP-Link",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "শাওমি মি হোম সিকিউরিটি ক্যামেরা",
      brand: "Xiaomi",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "নাইটওয়াচ এনভিআর ৮ চ্যানেল",
      brand: "Nightwatch",
      isVariant: false,
      variantType: "none",
    },
  ],
  "লেজার পয়েন্টার ও উপস্থাপনা": [
    {
      name: "লজিটেক স্পটলাইট প্রেজেন্টেশন রিমোট",
      brand: "Logitech",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "কেনসিংটন প্রেজেন্টার এক্সপার্ট",
      brand: "Kensington",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "রেজার টার্টার গ্রীন লেজার পয়েন্টার",
      brand: "Razer",
      isVariant: false,
      variantType: "none",
    },
    {
      name: "ডিজিটাল পয়েন্টার পেন সেট",
      brand: "Digital",
      isVariant: false,
      variantType: "none",
    },
  ],
  "মেমোরি কার্ড ও পেনড্রাইভ": [
    {
      name: "স্যামসাং প্রো আল্টিমেট ২৫৬জিবি মাইক্রোএসডি",
      brand: "Samsung",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "স্যানডিস্ক এক্সট্রিম প্রো ১২৮জিবি মাইক্রোএসডি",
      brand: "SanDisk",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "লেক্সার প্রফেশনাল ৬৪জিবি ইউএইচএস-আই",
      brand: "Lexar",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "স্যানডিস্ক এক্সট্রিম ৬৪জিবি ইউএসবি ৩.২",
      brand: "SanDisk",
      isVariant: true,
      variantType: "storage",
    },
    {
      name: "কিংস্টন ডেটাট্রাভেলার ৩৫০ ১২৮জিবি পেনড্রাইভ",
      brand: "Kingston",
      isVariant: true,
      variantType: "storage",
    },
  ],
};

// Variant value generators
const colorVariants = [
  { bn: "মিডনাইট ব্ল্যাক", en: "midnight-black" },
  { bn: "ফ্যান্টম হোয়াইট", en: "phantom-white" },
  { bn: "কসমিক গ্রে", en: "cosmic-gray" },
  { bn: "আর্কটিক সিলভার", en: "arctic-silver" },
  { bn: "রয়্যাল ব্লু", en: "royal-blue" },
  { bn: "ফরেস্ট গ্রিন", en: "forest-green" },
  { bn: "সানরাইজ গোল্ড", en: "sunrise-gold" },
  { bn: "ক্রিমসন রেড", en: "crimson-red" },
  { bn: "ডিপ পার্পল", en: "deep-purple" },
  { bn: "পাউডার ব্লু", en: "powder-blue" },
];
const storageVariants = [
  { bn: "৬৪ জিবি", en: "64gb" },
  { bn: "১২৮ জিবি", en: "128gb" },
  { bn: "২৫৬ জিবি", en: "256gb" },
  { bn: "৫১২ জিবি", en: "512gb" },
  { bn: "১ টিবি", en: "1tb" },
  { bn: "২ টিবি", en: "2tb" },
];
const sizeVariants = [
  { bn: "৩৮ মিমি", en: "38mm" },
  { bn: "৪১ মিমি", en: "41mm" },
  { bn: "৪৪ মিমি", en: "44mm" },
  { bn: "৪৫ মিমি", en: "45mm" },
  { bn: "৪৯ মিমি", en: "49mm" },
];

function getBanglaSpecifications(
  categoryName: string,
  brand: string,
  model: string,
) {
  const specs: { group: string; entries: { name: string; value: string }[] }[] =
    [
      {
        group: "সাধারণ তথ্য",
        entries: [
          { name: "ব্র্যান্ড", value: brand },
          { name: "মডেল", value: model },
          { name: "প্রকাশকাল", value: "২০২৫" },
          { name: "উৎপত্তি দেশ", value: "দক্ষিণ কোরিয়া / জাপান" },
        ],
      },
      {
        group: "শারীরিক বৈশিষ্ট্য",
        entries: [
          {
            name: "ওজন",
            value: `${(Math.random() * 1.5 + 0.2).toFixed(1)} কেজি`,
          },
          { name: "উপাদান", value: "অ্যালুমিনিয়াম অ্যালয় ও গ্লাস" },
          { name: "সুরক্ষা রেটিং", value: "আইপি৬৮" },
        ],
      },
      {
        group: "পারফরম্যান্স",
        entries: [
          { name: "প্রসেসর", value: "নেক্সট-জেন নিউরাল ইঞ্জিন" },
          { name: "ব্যাটারি লাইফ", value: "সর্বোচ্চ ২৪ ঘণ্টা" },
          { name: "সংযোগ", value: "ওয়াই-ফাই ৬ই, ব্লুটুথ ৫.৩" },
        ],
      },
      {
        group: "ওয়ারেন্টি",
        entries: [
          { name: "ওয়ারেন্টি মেয়াদ", value: "১ বছর অফিসিয়াল ওয়ারেন্টি" },
          { name: "সার্ভিস", value: "বাংলাদেশ সার্ভিস সেন্টার সহ" },
        ],
      },
    ];
  return specs;
}

function getBanglaDescription(
  productName: string,
  categoryName: string,
  brand: string,
) {
  return `<h2>${productName} - সেরা পছন্দ</h2><p>বাংলাদেশের বাজারে ${brand}-এর সর্বশেষ ${productName} এখন পাওয়া যাচ্ছে। এটি ${categoryName} বিভাগের একটি উন্নত পণ্য যা সর্বাধুনিক প্রযুক্তি ব্যবহার করে তৈরি। দৈনন্দিন জীবনে এটি আপনার উৎপাদনশীলতা এবং বিনোদনকে নতুন মাত্রা দেবে।</p><h3>মূল বৈশিষ্ট্যসমূহ</h3><ul><li>অত্যাধুনিক প্রযুক্তি ও পারফরম্যান্স</li><li>দীর্ঘস্থায়ী ব্যাটারি লাইফ</li><li>প্রিমিয়াম বিল্ড কোয়ালিটি</li><li>ব্যবহারকারীবান্ধব ইন্টারফেস</li><li>অফিসিয়াল ওয়ারেন্টি সহ</li></ul><p>আজই আপনার ডিজিটাল জীবনকে আরও উন্নত করুন। সঠিক পছন্দ করুন, সেরা মানের পণ্য বেছে নিন।</p>`;
}

function getBanglaFeatures(categoryName: string): string[] {
  const featureMap: Record<string, string[]> = {
    ল্যাপটপ: [
      "অতি-দ্রুত প্রসেসর ও গ্রাফিক্স",
      "সারাদিনের ব্যাটারি ব্যাকআপ",
      "আলট্রা-এইচডি ডিসপ্লে",
      "লাইটওয়েট ও প্রিমিয়াম ডিজাইন",
      "ব্যাকলিট কীবোর্ড সহ",
    ],
    স্মার্টফোন: [
      "প্রো-লেভেল ক্যামেরা সিস্টেম",
      "দ্রুত চার্জিং প্রযুক্তি",
      "৫জি সংযোগ সমর্থন",
      "শক্তিশালী প্রসেসর ও র‍্যাম",
      "দীর্ঘস্থায়ী ব্যাটারি",
    ],
    "হেডফোন ও ইয়ারবাড": [
      "নয়েজ ক্যান্সেলিং প্রযুক্তি",
      "প্রিমিয়াম সাউন্ড কোয়ালিটি",
      "দীর্ঘস্থায়ী ব্যাটারি লাইফ",
      "আরামদায়ক ইয়ার কাপ",
      "মাল্টি-ডিভাইস সংযোগ",
    ],
    ট্যাবলেট: [
      "বড় এবং উজ্জ্বল ডিসপ্লে",
      "মাল্টিটাস্কিং সমর্থন",
      "পাতলা ও হালকা ডিজাইন",
      "পেন সাপোর্ট",
      "দ্রুত চার্জিং",
    ],
    স্মার্টওয়াচ: [
      "স্বাস্থ্য পর্যবেক্ষণ সেন্সর",
      "জিপিএস ট্র্যাকিং",
      "ওয়াটারপ্রুফ ডিজাইন",
      "ঘুম বিশ্লেষণ",
      "কাস্টমাইজযোগ্য ওয়াচ ফেস",
    ],
    গেমিং: [
      "হাই-পারফরম্যান্স কম্পোনেন্ট",
      "আরজিবি লাইটিং",
      "প্রফেশনাল গেমিং ডিজাইন",
      "লো-লেটেন্সি রেসপন্স",
      "এরগোনোমিক ডিজাইন",
    ],
    ক্যামেরা: [
      "প্রফেশনাল ইমেজ সেন্সর",
      "৪কে ভিডিও রেকর্ডিং",
      "অপটিক্যাল ইমেজ স্টেবিলাইজেশন",
      "রাতের আলোয় উন্নত ছবি",
      "ফাস্ট অটোফোকাস",
    ],
    default: [
      "উন্নত মানের পণ্য",
      "টেকসই ও নির্ভরযোগ্য",
      "ব্যবহারে সহজ",
      "অফিসিয়াল ওয়ারেন্টি",
      "সাশ্রয়ী মূল্যে প্রিমিয়াম মান",
    ],
  };
  return featureMap[categoryName] || featureMap["default"]!;
}

function getBanglaShortDesc(
  productName: string,
  categoryName: string,
  brand: string,
): string {
  return `${brand}-এর ${productName} হলো ${categoryName} বিভাগের একটি উন্নত ও প্রিমিয়াম পণ্য। অত্যাধুনিক প্রযুক্তি এবং দীর্ঘস্থায়ী পারফরম্যান্সের জন্য আদর্শ।`;
}

function buildVariants(
  variantType: "color" | "storage" | "size" | "none",
  basePrice: number,
) {
  if (variantType === "none") return [];
  let pool: { bn: string; en: string }[];
  if (variantType === "color") pool = colorVariants;
  else if (variantType === "storage") pool = storageVariants;
  else pool = sizeVariants;

  // pick 2–3 random variants
  const count = Math.floor(Math.random() * 2) + 2;
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((v, i) => {
    const priceMultiplier = 1 + i * 0.18;
    const discounted = Math.round(basePrice * priceMultiplier);
    const original = Math.round(discounted * (1 + Math.random() * 0.25 + 0.05));
    return {
      variantName: v.bn,
      originalPrice: original,
      discountedPrice: discounted,
      stock: Math.floor(Math.random() * 80) + 10,
      sku: `SKU-${v.en.toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    };
  });
}

const badges = [
  "সেরা বিক্রয়",
  "নতুন আগমন",
  "ট্রেন্ডিং",
  "সীমিত সংস্করণ",
  "শীর্ষ রেটেড",
  "হট ডিল",
  "একচেটিয়া অফার",
];

const categoryPriceRanges: Record<string, [number, number]> = {
  ল্যাপটপ: [40000, 250000],
  স্মার্টফোন: [15000, 150000],
  "হেডফোন ও ইয়ারবাড": [1500, 35000],
  ট্যাবলেট: [20000, 120000],
  স্মার্টওয়াচ: [2500, 80000],
  গেমিং: [5000, 80000],
  আনুষঙ্গিক: [500, 5000],
  ক্যামেরা: [35000, 350000],
  প্রিন্টার: [8000, 45000],
  টেলিভিশন: [20000, 300000],
  "রাউটার ও নেটওয়ার্ক": [1200, 25000],
  "স্টোরেজ ও ড্রাইভ": [1500, 20000],
  "কীবোর্ড ও মাউস": [500, 15000],
  মনিটর: [8000, 80000],
  স্পিকার: [1500, 50000],
  "পাওয়ার ব্যাংক": [1000, 8000],
  "চার্জার ও কেবল": [300, 5000],
  "ওয়েবক্যাম ও মাইক্রোফোন": [1500, 25000],
  "গেমিং চেয়ার": [10000, 45000],
  ড্রোন: [25000, 250000],
  "স্মার্ট হোম": [1500, 35000],
  প্রজেক্টর: [15000, 150000],
  "গ্রাফিক্স কার্ড": [20000, 250000],
  "র‍্যাম ও প্রসেসর": [3000, 70000],
  "কুলিং ফ্যান": [500, 15000],
  "ই-রিডার": [10000, 30000],
  "ইউপিএস ও স্ট্যাবিলাইজার": [3000, 50000],
  "সিসিটিভি ও নিরাপত্তা": [1500, 25000],
  "লেজার পয়েন্টার ও উপস্থাপনা": [500, 5000],
  "মেমোরি কার্ড ও পেনড্রাইভ": [400, 8000],
  default: [1000, 10000],
};

export const seedDemoStorefront = async () => {
  try {
    console.log("🧹 বিদ্যমান ডেটা মুছে নতুন সিড শুরু হচ্ছে...");
    // ── Step 0: Delete real Cloudinary assets before wiping DB ───────
    console.log("☁️  Cloudinary থেকে পুরনো ছবি মুছে ফেলা হচ্ছে...");

    // Collect product image public_ids
    const productDocs = await Product.find(
      {},
      { "images.public_id": 1, _id: 0 }
    ).lean();

    const productPublicIds: string[] = productDocs
      .flatMap((p: any) =>
        (p.images ?? []).map((img: any) => img?.public_id).filter(Boolean)
      )
      // Skip fake seeder ids (prod-N-N pattern)
      .filter((id: string) => !/^prod-\d+-\d+$/.test(id));

    // Collect category image public_ids
    const categoryDocs = await Category.find(
      {},
      { "image.public_id": 1, _id: 0 }
    ).lean();

    const categoryPublicIds: string[] = categoryDocs
      .map((c: any) => c?.image?.public_id)
      .filter(Boolean)
      // Skip fake seeder ids (cat_N pattern)
      .filter((id: string) => !/^cat_\d+$/.test(id));

    const allPublicIds = [...productPublicIds, ...categoryPublicIds];

    if (allPublicIds.length > 0) {
      // Delete in batches of 100 to stay within Cloudinary rate limits
      const BATCH = 100;
      for (let i = 0; i < allPublicIds.length; i += BATCH) {
        const batch = allPublicIds.slice(i, i + BATCH);
        await Promise.allSettled(
          batch.map((id) =>
            deleteCloudinary(id, "image").catch((err) =>
              console.warn(`⚠️  Cloudinary delete skipped for ${id}:`, err?.message)
            )
          )
        );
        console.log(
          `🗑️  ${Math.min(i + BATCH, allPublicIds.length)}/${allPublicIds.length} ছবি Cloudinary থেকে মুছা হয়েছে`
        );
      }
      console.log("✅ Cloudinary ক্লিনআপ সম্পন্ন।");
    } else {
      console.log("ℹ️  মুছার মতো কোনো Cloudinary ছবি পাওয়া যায়নি।");
    }
    // ─────────────────────────────────────────────────────────────────

    await Product.deleteMany({});
    await Category.deleteMany({});
    await Theme.deleteMany({});

    // 1. Create Theme
    const theme = new Theme({
      themeId: "light",
      primaryColor: "#0ea5e9",
      fontFamily: "Outfit",
    });
    await theme.save();

    // 2. Create 30 Categories
    const categoriesData = Object.entries(categoryImages).map(
      ([name, imgs], index) => ({
        name,
        slug:
          name
            .toLowerCase()
            .replace(/[^\u0980-\u09FFa-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") +
          "-" +
          (index + 1),
        description: `${name} বিভাগে পাচ্ছেন সেরা মানের ইলেকট্রনিক্স পণ্য সমূহ। সকল পণ্যে অফিসিয়াল ওয়ারেন্টি এবং ফ্রি ডেলিভারি।`,
        image: { secure_url: imgs.img1, public_id: `cat_${index + 1}` },
        status: "ACTIVE",
      }),
    );

    const savedCategories = await Category.insertMany(categoriesData);
    const categoryMap: Record<string, any> = {};
    savedCategories.forEach((cat) => {
      categoryMap[cat.name] = cat;
    });

    console.log(`✅ ${savedCategories.length}টি ক্যাটাগরি তৈরি হয়েছে।`);

    // 3. Build 500 products from templates
    const products: any[] = [];
    const usedSlugs = new Set<string>();
    let productCount = 0;
    const TARGET = 500;

    const allCategories = Object.keys(productTemplates);
    let templateCycleIndex = 0;

    while (productCount < TARGET) {
      const catName =
        allCategories[templateCycleIndex % allCategories.length] ?? "";
      templateCycleIndex++;

      const categoryDoc = categoryMap[catName];
      if (!categoryDoc) continue;

      const catImages = categoryImages[catName];
      if (!catImages) continue;

      const templates = productTemplates[catName];
      if (!templates || templates.length === 0) continue;

      const templateIndex = productCount % templates.length;
      const template = templates[templateIndex];
      if (!template) continue;

      // Build unique slug
      const baseSlug = `${template.name}-${productCount + 1}`
        .toLowerCase()
        .replace(/[^\u0980-\u09FFa-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      let slug = baseSlug;
      let slugSuffix = 1;
      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${slugSuffix++}`;
      }
      usedSlugs.add(slug);

      const priceRange = categoryPriceRanges[catName] ||
        categoryPriceRanges["default"] || [1000, 5000];
      const basePrice =
        Math.floor(Math.random() * (priceRange[1] - priceRange[0])) +
        priceRange[0];
      const isVariant = template.isVariant && Math.random() > 0.3;
      const variants = isVariant
        ? buildVariants(template.variantType, basePrice)
        : [];

      const originalPrice = isVariant
        ? 0
        : Math.round(basePrice * (1 + Math.random() * 0.3 + 0.05));
      const discountedPrice = isVariant ? 0 : basePrice;
      const saveAmount = isVariant ? 0 : originalPrice - discountedPrice;

      const prodImages = [
        {
          secure_url: Math.random() > 0.5 ? catImages.img1 : catImages.img2,
          public_id: `prod-${productCount + 1}-1`,
        },
        {
          secure_url: Math.random() > 0.5 ? catImages.img2 : catImages.img1,
          public_id: `prod-${productCount + 1}-2`,
        },
      ];

      products.push({
        title: template.name,
        slug,
        shortDescription: getBanglaShortDesc(
          template.name,
          catName,
          template.brand,
        ),
        description: getBanglaDescription(
          template.name,
          catName,
          template.brand,
        ),
        images: prodImages,
        specifications: getBanglaSpecifications(
          catName,
          template.brand,
          template.name,
        ),
        originalPrice,
        discountedPrice,
        saveAmount,
        badgeText:
          Math.random() > 0.55
            ? badges[Math.floor(Math.random() * badges.length)]
            : undefined,
        features: getBanglaFeatures(catName),
        videos: [],
        isAuthentic: Math.random() > 0.2,
        brand: template.brand,
        weight: parseFloat((Math.random() * 2 + 0.2).toFixed(2)),
        dimensions: {
          length: Math.floor(Math.random() * 30) + 10,
          width: Math.floor(Math.random() * 20) + 5,
          height: Math.floor(Math.random() * 5) + 1,
        },
        condition: Math.random() > 0.92 ? "Refurbished" : "New",
        status: "ACTIVE",
        sku: `SKU-${template.brand.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        unit: "পিস",
        stock: isVariant ? 0 : Math.floor(Math.random() * 150) + 10,
        salesCount: Math.floor(Math.random() * 800),
        categoryId: categoryDoc._id,
        productType: isVariant && variants.length > 0 ? "VARIANT" : "SINGLE",
        variants: isVariant && variants.length > 0 ? variants : [],
      });

      productCount++;
    }

    // Insert in batches of 100
    for (let i = 0; i < products.length; i += 100) {
      await Product.insertMany(products.slice(i, i + 100));
      console.log(
        `📦 ${Math.min(i + 100, products.length)}/${TARGET} পণ্য সংরক্ষিত...`,
      );
    }

    console.log(
      `✅ ${TARGET}টি বাংলা পণ্য ও ${savedCategories.length}টি ক্যাটাগরি সফলভাবে সিড করা হয়েছে!`,
    );
  } catch (error) {
    console.error("❌ সিড করতে ব্যর্থ:", error);
    throw error;
  }
};
