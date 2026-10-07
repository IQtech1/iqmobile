/* ============================================================
   İQmobil - app.js (النسخة الكاملة مع 140 جهاز)
   الجزء 1 من 3: البيانات + الأدوات
   ============================================================ */

/* ============================================================
   1) الدول
   ============================================================ */

const COUNTRIES = {
    SY: { name: "سوريا", flag: "🇸🇾", currency: "ل.س" },
    SA: { name: "السعودية", flag: "🇸🇦", currency: "ر.س" },
    AE: { name: "الإمارات", flag: "🇦🇪", currency: "د.إ" },
    EG: { name: "مصر", flag: "🇪🇬", currency: "ج.م" },
    IQ: { name: "العراق", flag: "🇮🇶", currency: "د.ع" },
    JO: { name: "الأردن", flag: "🇯🇴", currency: "د.أ" },
    MA: { name: "المغرب", flag: "🇲🇦", currency: "د.م" },
    DZ: { name: "الجزائر", flag: "🇩🇿", currency: "د.ج" }
};

const DEFAULT_COUNTRY = "SY";

/* ============================================================
   2) ألوان الماركات (للصور SVG)
   ============================================================ */

const BRAND_COLORS = {
    "Samsung": ["#1428A0", "#0C1E75"],
    "Apple": ["#555555", "#000000"],
    "Xiaomi": ["#FF6900", "#E65100"],
    "Huawei": ["#FF0033", "#C7002B"],
    "OPPO": ["#1EA366", "#146B42"],
    "Realme": ["#FFC915", "#E5A800"],
    "OnePlus": ["#EB0028", "#B5001F"],
    "Google": ["#4285F4", "#1A73E8"],
    "Vivo": ["#415FFF", "#2A3DCC"],
    "Honor": ["#00B0F0", "#0086B8"],
    "Motorola": ["#0091DA", "#005F8F"],
    "Nokia": ["#124191", "#0A2C63"],
    "Sony": ["#000000", "#333333"],
    "Asus": ["#000063", "#00003D"],
    "Nothing": ["#000000", "#1A1A1A"]
};

/* ============================================================
   3) مولّد صور SVG — بدون حقوق
   ============================================================ */

const SVGGenerator = {
    generate(device, size = 400) {
        const colors = BRAND_COLORS[device.brand] || ["#1a73e8", "#0d47a1"];
        const color1 = colors[0];
        const color2 = colors[1];
        const initial = device.brand.charAt(0).toUpperCase();
        const categoryIcon = this.getCategoryIcon(device.category);
        
        const nameParts = device.name.split(' ');
        const shortName = nameParts.length > 2 
            ? nameParts.slice(0, 2).join(' ') 
            : device.name;

        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="grad-${device.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
    </defs>
    
    <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad-${device.id})"/>
    
    <circle cx="${size * 0.5}" cy="${size * 0.38}" r="${size * 0.13}" fill="rgba(255,255,255,0.15)"/>
    
    <text x="${size * 0.5}" y="${size * 0.44}" 
          font-family="'Cairo', Arial, sans-serif" 
          font-size="${size * 0.16}" 
          font-weight="900" 
          fill="white" 
          text-anchor="middle"
          dominant-baseline="middle">${initial}</text>
    
    <text x="${size * 0.5}" y="${size * 0.68}" 
          font-family="'Cairo', Arial, sans-serif" 
          font-size="${size * 0.085}" 
          font-weight="700" 
          fill="white" 
          text-anchor="middle">${this.escapeXml(shortName)}</text>
    
    <text x="${size * 0.5}" y="${size * 0.82}" 
          font-family="'Cairo', Arial, sans-serif" 
          font-size="${size * 0.06}" 
          font-weight="400" 
          fill="rgba(255,255,255,0.85)" 
          text-anchor="middle">${categoryIcon}</text>
</svg>`;
    },

    getCategoryIcon(category) {
        const icons = {
            phone: "📱 Smartphone",
            tablet: "📲 Tablet",
            watch: "⌚ Smartwatch",
            laptop: "💻 Laptop"
        };
        return icons[category] || "📱 Device";
    },

    escapeXml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    toDataUri(device, size = 400) {
        const svg = this.generate(device, size);
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
};

/* ============================================================
   4) قاعدة بيانات الأجهزة — الجزء الأول (1-40)
   ============================================================ */

const DEVICES_DB = [
    // ============ SAMSUNG (1-7) ============
    {
        id: 1, brand: "Samsung", name: "Galaxy S24 Ultra", image: "📱",
        category: "phone", releaseDate: "2024-01-17", badge: "جديد",
        rating: 4.8, reviewsCount: 245,
        specs: {
            screen: "6.8 بوصة - AMOLED 120Hz", resolution: "1440 × 3120 بكسل",
            processor: "Snapdragon 8 Gen 3", ram: "12 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "200 MP + 50 MP + 12 MP + 10 MP",
            frontCamera: "12 MP", battery: "5000 mAh",
            charging: "45W سلكي / 15W لاسلكي", os: "Android 14", weight: "232 غرام"
        },
        prices: { SY: 12500000, SA: 4850, AE: 4750, EG: 62000, IQ: 1650000, JO: 900, MA: 13000, DZ: 175000 }
    },
    {
        id: 2, brand: "Samsung", name: "Galaxy S24+", image: "📱",
        category: "phone", releaseDate: "2024-01-17", badge: "",
        rating: 4.7, reviewsCount: 178,
        specs: {
            screen: "6.7 بوصة - AMOLED 120Hz", resolution: "1440 × 3120 بكسل",
            processor: "Exynos 2400", ram: "12 GB",
            storage: "256 GB / 512 GB", camera: "50 MP + 12 MP + 10 MP",
            frontCamera: "12 MP", battery: "4900 mAh",
            charging: "45W سلكي / 15W لاسلكي", os: "Android 14", weight: "196 غرام"
        },
        prices: { SY: 9500000, SA: 3699, AE: 3599, EG: 47000, IQ: 1250000, JO: 680, MA: 9800, DZ: 132000 }
    },
    {
        id: 3, brand: "Samsung", name: "Galaxy S23 Ultra", image: "📱",
        category: "phone", releaseDate: "2023-02-17", badge: "",
        rating: 4.8, reviewsCount: 312,
        specs: {
            screen: "6.8 بوصة - AMOLED 120Hz", resolution: "1440 × 3088 بكسل",
            processor: "Snapdragon 8 Gen 2", ram: "8 GB / 12 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "200 MP + 12 MP + 10 MP + 10 MP",
            frontCamera: "12 MP", battery: "5000 mAh",
            charging: "45W سلكي / 15W لاسلكي", os: "Android 13", weight: "234 غرام"
        },
        prices: { SY: 9800000, SA: 3899, AE: 3799, EG: 49000, IQ: 1320000, JO: 720, MA: 10200, DZ: 138000 }
    },
    {
        id: 4, brand: "Samsung", name: "Galaxy A54", image: "📱",
        category: "phone", releaseDate: "2023-03-24", badge: "أفضل قيمة",
        rating: 4.4, reviewsCount: 156,
        specs: {
            screen: "6.4 بوصة - AMOLED 120Hz", resolution: "1080 × 2340 بكسل",
            processor: "Exynos 1380", ram: "6 GB / 8 GB",
            storage: "128 GB / 256 GB", camera: "50 MP + 12 MP + 5 MP",
            frontCamera: "32 MP", battery: "5000 mAh",
            charging: "25W سلكي", os: "Android 13", weight: "202 غرام"
        },
        prices: { SY: 3200000, SA: 1299, AE: 1249, EG: 15500, IQ: 420000, JO: 240, MA: 3400, DZ: 45000 }
    },
    {
        id: 5, brand: "Samsung", name: "Galaxy Z Fold 5", image: "📱",
        category: "phone", releaseDate: "2023-08-11", badge: "",
        rating: 4.6, reviewsCount: 98,
        specs: {
            screen: "7.6 بوصة قابلة للطي", resolution: "1812 × 2176 بكسل",
            processor: "Snapdragon 8 Gen 2", ram: "12 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 12 MP + 10 MP",
            frontCamera: "10 MP + 4 MP", battery: "4400 mAh",
            charging: "25W سلكي / 15W لاسلكي", os: "Android 13", weight: "253 غرام"
        },
        prices: { SY: 14500000, SA: 5699, AE: 5599, EG: 72000, IQ: 1950000, JO: 1050, MA: 15200, DZ: 205000 }
    },
    {
        id: 6, brand: "Samsung", name: "Galaxy Watch 6 Classic", image: "⌚",
        category: "watch", releaseDate: "2023-08-11", badge: "",
        rating: 4.7, reviewsCount: 89,
        specs: {
            screen: "1.47 بوصة - Super AMOLED", resolution: "480 × 480 بكسل",
            processor: "Exynos W930", ram: "2 GB", storage: "16 GB",
            camera: "لا يوجد", frontCamera: "-", battery: "425 mAh",
            charging: "لاسلكي", os: "Wear OS 4", weight: "59 غرام"
        },
        prices: { SY: 3200000, SA: 1299, AE: 1249, EG: 16500, IQ: 420000, JO: 240, MA: 3400, DZ: 45000 }
    },
    {
        id: 7, brand: "Samsung", name: "Galaxy Tab S9 Ultra", image: "📲",
        category: "tablet", releaseDate: "2023-08-11", badge: "",
        rating: 4.7, reviewsCount: 67,
        specs: {
            screen: "14.6 بوصة - AMOLED 120Hz", resolution: "1848 × 2960 بكسل",
            processor: "Snapdragon 8 Gen 2", ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "13 MP + 8 MP",
            frontCamera: "12 MP + 12 MP", battery: "11200 mAh",
            charging: "45W سلكي", os: "Android 13", weight: "737 غرام"
        },
        prices: { SY: 11500000, SA: 4499, AE: 4399, EG: 58000, IQ: 1520000, JO: 840, MA: 12000, DZ: 165000 }
    },

    // ============ APPLE (8-13) ============
    {
        id: 8, brand: "Apple", name: "iPhone 15 Pro Max", image: "📱",
        category: "phone", releaseDate: "2023-09-22", badge: "الأكثر مبيعاً",
        rating: 4.9, reviewsCount: 312,
        specs: {
            screen: "6.7 بوصة - Super Retina XDR", resolution: "1290 × 2796 بكسل",
            processor: "Apple A17 Pro", ram: "8 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "48 MP + 12 MP + 12 MP",
            frontCamera: "12 MP", battery: "4441 mAh",
            charging: "27W سلكي / 15W MagSafe", os: "iOS 17", weight: "221 غرام"
        },
        prices: { SY: 11800000, SA: 4599, AE: 4499, EG: 58000, IQ: 1550000, JO: 850, MA: 12500, DZ: 165000 }
    },
    {
        id: 9, brand: "Apple", name: "iPhone 15 Pro", image: "📱",
        category: "phone", releaseDate: "2023-09-22", badge: "",
        rating: 4.8, reviewsCount: 256,
        specs: {
            screen: "6.1 بوصة - Super Retina XDR", resolution: "1179 × 2556 بكسل",
            processor: "Apple A17 Pro", ram: "8 GB",
            storage: "128 GB / 256 GB / 512 GB / 1 TB", camera: "48 MP + 12 MP + 12 MP",
            frontCamera: "12 MP", battery: "3274 mAh",
            charging: "20W سلكي / 15W MagSafe", os: "iOS 17", weight: "187 غرام"
        },
        prices: { SY: 10200000, SA: 3999, AE: 3899, EG: 50000, IQ: 1350000, JO: 740, MA: 10800, DZ: 142000 }
    },
    {
        id: 10, brand: "Apple", name: "iPhone 15", image: "📱",
        category: "phone", releaseDate: "2023-09-22", badge: "",
        rating: 4.7, reviewsCount: 198,
        specs: {
            screen: "6.1 بوصة - Super Retina XDR", resolution: "1179 × 2556 بكسل",
            processor: "Apple A16 Bionic", ram: "6 GB",
            storage: "128 GB / 256 GB / 512 GB", camera: "48 MP + 12 MP",
            frontCamera: "12 MP", battery: "3349 mAh",
            charging: "20W سلكي / 15W MagSafe", os: "iOS 17", weight: "171 غرام"
        },
        prices: { SY: 7800000, SA: 2999, AE: 2899, EG: 38000, IQ: 1020000, JO: 560, MA: 8200, DZ: 108000 }
    },
    {
        id: 11, brand: "Apple", name: "iPhone 14 Pro Max", image: "📱",
        category: "phone", releaseDate: "2022-09-16", badge: "",
        rating: 4.8, reviewsCount: 289,
        specs: {
            screen: "6.7 بوصة - Super Retina XDR", resolution: "1290 × 2796 بكسل",
            processor: "Apple A16 Bionic", ram: "6 GB",
            storage: "128 GB / 256 GB / 512 GB / 1 TB", camera: "48 MP + 12 MP + 12 MP",
            frontCamera: "12 MP", battery: "4323 mAh",
            charging: "20W سلكي / 15W MagSafe", os: "iOS 16", weight: "240 غرام"
        },
        prices: { SY: 9500000, SA: 3799, AE: 3699, EG: 47000, IQ: 1280000, JO: 700, MA: 10100, DZ: 135000 }
    },
    {
        id: 12, brand: "Apple", name: "iPad Pro 12.9 M2", image: "📲",
        category: "tablet", releaseDate: "2022-10-26", badge: "",
        rating: 4.9, reviewsCount: 178,
        specs: {
            screen: "12.9 بوصة - Liquid Retina XDR", resolution: "2048 × 2732 بكسل",
            processor: "Apple M2", ram: "8 GB / 16 GB",
            storage: "128 GB إلى 2 TB", camera: "12 MP + 10 MP",
            frontCamera: "12 MP", battery: "10758 mAh",
            charging: "18W سلكي", os: "iPadOS 16", weight: "682 غرام"
        },
        prices: { SY: 10500000, SA: 4299, AE: 4199, EG: 55000, IQ: 1420000, JO: 800, MA: 11500, DZ: 152000 }
    },
    {
        id: 13, brand: "Apple", name: "Apple Watch Series 9", image: "⌚",
        category: "watch", releaseDate: "2023-09-22", badge: "جديد",
        rating: 4.8, reviewsCount: 145,
        specs: {
            screen: "1.9 بوصة - LTPO OLED", resolution: "484 × 396 بكسل",
            processor: "Apple S9 SiP", ram: "1 GB", storage: "64 GB",
            camera: "لا يوجد", frontCamera: "-", battery: "308 mAh",
            charging: "لاسلكي سريع", os: "watchOS 10", weight: "51.5 غرام"
        },
        prices: { SY: 4500000, SA: 1799, AE: 1749, EG: 23000, IQ: 590000, JO: 340, MA: 4700, DZ: 62000 }
    },

    // ============ XIAOMI (14-18) ============
    {
        id: 14, brand: "Xiaomi", name: "Xiaomi 14 Pro", image: "📱",
        category: "phone", releaseDate: "2023-10-26", badge: "",
        rating: 4.7, reviewsCount: 189,
        specs: {
            screen: "6.73 بوصة - LTPO AMOLED", resolution: "1440 × 3200 بكسل",
            processor: "Snapdragon 8 Gen 3", ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 50 MP + 50 MP",
            frontCamera: "32 MP", battery: "4880 mAh",
            charging: "120W سلكي / 50W لاسلكي", os: "Android 14 - HyperOS", weight: "223 غرام"
        },
        prices: { SY: 8500000, SA: 3299, AE: 3199, EG: 41000, IQ: 1100000, JO: 620, MA: 8900, DZ: 118000 }
    },
    {
        id: 15, brand: "Xiaomi", name: "Xiaomi 14 Ultra", image: "📱",
        category: "phone", releaseDate: "2024-02-25", badge: "جديد",
        rating: 4.9, reviewsCount: 156,
        specs: {
            screen: "6.73 بوصة - LTPO AMOLED", resolution: "1440 × 3200 بكسل",
            processor: "Snapdragon 8 Gen 3", ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 50 MP + 50 MP + 50 MP",
            frontCamera: "32 MP", battery: "5300 mAh",
            charging: "90W سلكي / 80W لاسلكي", os: "Android 14 - HyperOS", weight: "224 غرام"
        },
        prices: { SY: 11500000, SA: 4499, AE: 4399, EG: 56000, IQ: 1500000, JO: 850, MA: 12000, DZ: 160000 }
    },
    {
        id: 16, brand: "Xiaomi", name: "Redmi Note 13 Pro+", image: "📱",
        category: "phone", releaseDate: "2024-01-04", badge: "أفضل قيمة",
        rating: 4.5, reviewsCount: 234,
        specs: {
            screen: "6.67 بوصة - AMOLED 120Hz", resolution: "1220 × 2712 بكسل",
            processor: "MediaTek Dimensity 7200 Ultra", ram: "8 GB / 12 GB",
            storage: "256 GB / 512 GB", camera: "200 MP + 8 MP + 2 MP",
            frontCamera: "16 MP", battery: "5000 mAh",
            charging: "120W سلكي", os: "Android 13 - MIUI 14", weight: "204.5 غرام"
        },
        prices: { SY: 2400000, SA: 999, AE: 949, EG: 11500, IQ: 320000, JO: 180, MA: 2600, DZ: 34000 }
    },
    {
        id: 17, brand: "Xiaomi", name: "Redmi Note 12", image: "📱",
        category: "phone", releaseDate: "2023-03-23", badge: "",
        rating: 4.3, reviewsCount: 198,
        specs: {
            screen: "6.67 بوصة - AMOLED", resolution: "1080 × 2400 بكسل",
            processor: "Snapdragon 685", ram: "4 GB / 6 GB / 8 GB",
            storage: "64 GB / 128 GB / 256 GB", camera: "50 MP + 8 MP + 2 MP",
            frontCamera: "13 MP", battery: "5000 mAh",
            charging: "33W سلكي", os: "Android 13 - MIUI 14", weight: "188 غرام"
        },
        prices: { SY: 1450000, SA: 599, AE: 579, EG: 6900, IQ: 195000, JO: 110, MA: 1600, DZ: 21000 }
    },
    {
        id: 18, brand: "Xiaomi", name: "POCO F5 Pro", image: "📱",
        category: "phone", releaseDate: "2023-05-09", badge: "",
        rating: 4.6, reviewsCount: 145,
        specs: {
            screen: "6.67 بوصة - AMOLED 120Hz", resolution: "1440 × 3200 بكسل",
            processor: "Snapdragon 8+ Gen 1", ram: "8 GB / 12 GB",
            storage: "256 GB / 512 GB", camera: "64 MP + 8 MP + 2 MP",
            frontCamera: "16 MP", battery: "5160 mAh",
            charging: "67W سلكي / 30W لاسلكي", os: "Android 13 - MIUI 14", weight: "204 غرام"
        },
        prices: { SY: 3400000, SA: 1399, AE: 1349, EG: 17000, IQ: 450000, JO: 260, MA: 3700, DZ: 49000 }
    },

    // ============ HUAWEI (19-22) ============
    {
        id: 19, brand: "Huawei", name: "Huawei P60 Pro", image: "📱",
        category: "phone", releaseDate: "2023-03-23", badge: "",
        rating: 4.6, reviewsCount: 156,
        specs: {
            screen: "6.67 بوصة - OLED 120Hz", resolution: "1220 × 2700 بكسل",
            processor: "Snapdragon 8+ Gen 1", ram: "8 GB / 12 GB",
            storage: "256 GB / 512 GB", camera: "48 MP + 48 MP + 13 MP",
            frontCamera: "13 MP", battery: "4815 mAh",
            charging: "88W سلكي / 50W لاسلكي", os: "HarmonyOS 3.1", weight: "200 غرام"
        },
        prices: { SY: 9200000, SA: 3599, AE: 3499, EG: 45000, IQ: 1200000, JO: 680, MA: 9500, DZ: 128000 }
    },
    {
        id: 20, brand: "Huawei", name: "Huawei Mate 60 Pro", image: "📱",
        category: "phone", releaseDate: "2023-09-25", badge: "جديد",
        rating: 4.7, reviewsCount: 89,
        specs: {
            screen: "6.82 بوصة - LTPO OLED", resolution: "1260 × 2720 بكسل",
            processor: "Kirin 9000S", ram: "12 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 48 MP + 12 MP",
            frontCamera: "13 MP + 3D", battery: "5000 mAh",
            charging: "88W سلكي / 50W لاسلكي", os: "HarmonyOS 4.0", weight: "225 غرام"
        },
        prices: { SY: 11500000, SA: 4499, AE: 4399, EG: 56000, IQ: 1520000, JO: 850, MA: 12200, DZ: 165000 }
    },
    {
        id: 21, brand: "Huawei", name: "Huawei Nova 11", image: "📱",
        category: "phone", releaseDate: "2023-04-17", badge: "",
        rating: 4.4, reviewsCount: 112,
        specs: {
            screen: "6.7 بوصة - OLED 120Hz", resolution: "1084 × 2412 بكسل",
            processor: "Snapdragon 778G 4G", ram: "8 GB",
            storage: "128 GB / 256 GB", camera: "50 MP + 8 MP",
            frontCamera: "60 MP", battery: "4500 mAh",
            charging: "66W سلكي", os: "HarmonyOS 3.1", weight: "168 غرام"
        },
        prices: { SY: 2900000, SA: 1199, AE: 1149, EG: 14500, IQ: 380000, JO: 220, MA: 3100, DZ: 41000 }
    },
    {
        id: 22, brand: "Huawei", name: "Huawei Watch GT 4", image: "⌚",
        category: "watch", releaseDate: "2023-09-14", badge: "",
        rating: 4.6, reviewsCount: 98,
        specs: {
            screen: "1.43 بوصة - AMOLED", resolution: "466 × 466 بكسل",
            processor: "غير محدد", ram: "32 MB", storage: "4 GB",
            camera: "لا يوجد", frontCamera: "-", battery: "524 mAh",
            charging: "لاسلكي", os: "HarmonyOS", weight: "48 غرام"
        },
        prices: { SY: 2100000, SA: 849, AE: 819, EG: 10500, IQ: 280000, JO: 160, MA: 2300, DZ: 30000 }
    },

    // ============ OPPO (23-25) ============
    {
        id: 23, brand: "OPPO", name: "OPPO Find X6 Pro", image: "📱",
        category: "phone", releaseDate: "2023-03-21", badge: "",
        rating: 4.5, reviewsCount: 132,
        specs: {
            screen: "6.82 بوصة - LTPO AMOLED", resolution: "1440 × 3168 بكسل",
            processor: "Snapdragon 8 Gen 2", ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB", camera: "50 MP + 50 MP + 50 MP",
            frontCamera: "32 MP", battery: "5000 mAh",
            charging: "100W سلكي / 50W لاسلكي", os: "Android 13 - ColorOS", weight: "216 غرام"
        },
        prices: { SY: 8800000, SA: 3399, AE: 3299, EG: 42000, IQ: 1150000, JO: 640, MA: 9100, DZ: 122000 }
    },
    {
        id: 24, brand: "OPPO", name: "OPPO Find N3 Flip", image: "📱",
        category: "phone", releaseDate: "2023-10-19", badge: "",
        rating: 4.5, reviewsCount: 78,
        specs: {
            screen: "6.8 بوصة قابلة للطي", resolution: "1080 × 2520 بكسل",
            processor: "MediaTek Dimensity 9200", ram: "12 GB",
            storage: "256 GB / 512 GB", camera: "50 MP + 48 MP + 32 MP",
            frontCamera: "32 MP", battery: "4300 mAh",
            charging: "44W سلكي", os: "Android 13 - ColorOS", weight: "198 غرام"
        },
        prices: { SY: 11500000, SA: 4499, AE: 4399, EG: 55000, IQ: 1500000, JO: 830, MA: 12000, DZ: 160000 }
    },
    {
        id: 25, brand: "OPPO", name: "OPPO Reno 10 Pro", image: "📱",
        category: "phone", releaseDate: "2023-07-12", badge: "",
        rating: 4.4, reviewsCount: 145,
        specs: {
            screen: "6.74 بوصة - AMOLED 120Hz", resolution: "1240 × 2772 بكسل",
            processor: "Snapdragon 778G", ram: "8 GB / 12 GB",
            storage: "128 GB / 256 GB", camera: "50 MP + 32 MP + 8 MP",
            frontCamera: "32 MP", battery: "4600 mAh",
            charging: "80W سلكي", os: "Android 13 - ColorOS", weight: "185 غرام"
        },
        prices: { SY: 3300000, SA: 1349, AE: 1299, EG: 16500, IQ: 440000, JO: 250, MA: 3500, DZ: 46000 }
    },

    // ============ REALME (26-28) ============
    {
        id: 26, brand: "Realme", name: "Realme GT 5 Pro", image: "📱",
        category: "phone", releaseDate: "2023-12-07", badge: "أفضل قيمة",
        rating: 4.6, reviewsCount: 98,
        specs: {
            screen: "6.78 بوصة - AMOLED", resolution: "1264 × 2780 بكسل",
            processor: "Snapdragon 8 Gen 3", ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 8 MP + 50 MP",
            frontCamera: "32 MP", battery: "5400 mAh",
            charging: "100W سلكي", os: "Android 14 - Realme UI", weight: "218 غرام"
        },
        prices: { SY: 6200000, SA: 2499, AE: 2399, EG: 29000, IQ: 820000, JO: 460, MA: 6500, DZ: 88000 }
    },
    {
        id: 27, brand: "Realme", name: "Realme 11 Pro+", image: "📱",
        category: "phone", releaseDate: "2023-05-10", badge: "",
        rating: 4.4, reviewsCount: 167,
        specs: {
            screen: "6.7 بوصة - AMOLED 120Hz", resolution: "1080 × 2412 بكسل",
            processor: "MediaTek Dimensity 7050", ram: "8 GB / 12 GB",
            storage: "256 GB / 512 GB", camera: "200 MP + 8 MP + 2 MP",
            frontCamera: "32 MP", battery: "5000 mAh",
            charging: "100W سلكي", os: "Android 13 - Realme UI", weight: "189 غرام"
        },
        prices: { SY: 2400000, SA: 999, AE: 949, EG: 11500, IQ: 320000, JO: 180, MA: 2600, DZ: 34000 }
    },
    {
        id: 28, brand: "Realme", name: "Realme GT Neo 5", image: "📱",
        category: "phone", releaseDate: "2023-02-09", badge: "",
        rating: 4.5, reviewsCount: 134,
        specs: {
            screen: "6.74 بوصة - AMOLED 144Hz", resolution: "1240 × 2772 بكسل",
            processor: "Snapdragon 8+ Gen 1", ram: "8 GB / 12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 8 MP + 2 MP",
            frontCamera: "16 MP", battery: "4600 mAh",
            charging: "240W سلكي", os: "Android 13 - Realme UI", weight: "199 غرام"
        },
        prices: { SY: 3900000, SA: 1599, AE: 1549, EG: 19000, IQ: 510000, JO: 290, MA: 4200, DZ: 55000 }
    },

    // ============ GOOGLE (29-31) ============
    {
        id: 29, brand: "Google", name: "Google Pixel 8 Pro", image: "📱",
        category: "phone", releaseDate: "2023-10-12", badge: "جديد",
        rating: 4.7, reviewsCount: 178,
        specs: {
            screen: "6.7 بوصة - LTPO OLED 120Hz", resolution: "1344 × 2992 بكسل",
            processor: "Google Tensor G3", ram: "12 GB",
            storage: "128 GB / 256 GB / 512 GB / 1 TB", camera: "50 MP + 48 MP + 48 MP",
            frontCamera: "10.5 MP", battery: "5050 mAh",
            charging: "30W سلكي / 23W لاسلكي", os: "Android 14", weight: "213 غرام"
        },
        prices: { SY: 9800000, SA: 3799, AE: 3699, EG: 48000, IQ: 1300000, JO: 720, MA: 10200, DZ: 135000 }
    },
    {
        id: 30, brand: "Google", name: "Google Pixel 8", image: "📱",
        category: "phone", releaseDate: "2023-10-12", badge: "",
        rating: 4.6, reviewsCount: 145,
        specs: {
            screen: "6.2 بوصة - OLED 120Hz", resolution: "1080 × 2400 بكسل",
            processor: "Google Tensor G3", ram: "8 GB",
            storage: "128 GB / 256 GB", camera: "50 MP + 12 MP",
            frontCamera: "10.5 MP", battery: "4575 mAh",
            charging: "27W سلكي / 18W لاسلكي", os: "Android 14", weight: "187 غرام"
        },
        prices: { SY: 7200000, SA: 2799, AE: 2699, EG: 35000, IQ: 950000, JO: 520, MA: 7500, DZ: 100000 }
    },
    {
        id: 31, brand: "Google", name: "Google Pixel Watch 2", image: "⌚",
        category: "watch", releaseDate: "2023-10-12", badge: "",
        rating: 4.5, reviewsCount: 78,
        specs: {
            screen: "1.2 بوصة - AMOLED", resolution: "450 × 450 بكسل",
            processor: "Qualcomm 5100", ram: "2 GB", storage: "32 GB",
            camera: "لا يوجد", frontCamera: "-", battery: "306 mAh",
            charging: "لاسلكي", os: "Wear OS 4", weight: "31 غرام"
        },
        prices: { SY: 3700000, SA: 1499, AE: 1449, EG: 19000, IQ: 490000, JO: 280, MA: 3900, DZ: 51000 }
    },

    // ============ ONEPLUS (32-34) ============
    {
        id: 32, brand: "OnePlus", name: "OnePlus 12", image: "📱",
        category: "phone", releaseDate: "2023-12-11", badge: "جديد",
        rating: 4.8, reviewsCount: 167,
        specs: {
            screen: "6.82 بوصة - LTPO AMOLED 120Hz", resolution: "1440 × 3168 بكسل",
            processor: "Snapdragon 8 Gen 3", ram: "12 GB / 16 GB / 24 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 64 MP + 48 MP",
            frontCamera: "32 MP", battery: "5400 mAh",
            charging: "100W سلكي / 50W لاسلكي", os: "Android 14 - OxygenOS", weight: "220 غرام"
        },
        prices: { SY: 7600000, SA: 2999, AE: 2899, EG: 37000, IQ: 1000000, JO: 560, MA: 8100, DZ: 108000 }
    },
    {
        id: 33, brand: "OnePlus", name: "OnePlus 11", image: "📱",
        category: "phone", releaseDate: "2023-02-07", badge: "",
        rating: 4.6, reviewsCount: 189,
        specs: {
            screen: "6.7 بوصة - LTPO3 AMOLED", resolution: "1440 × 3216 بكسل",
            processor: "Snapdragon 8 Gen 2", ram: "8 GB / 12 GB / 16 GB",
            storage: "128 GB / 256 GB / 512 GB", camera: "50 MP + 48 MP + 32 MP",
            frontCamera: "16 MP", battery: "5000 mAh",
            charging: "100W سلكي", os: "Android 13 - OxygenOS", weight: "205 غرام"
        },
        prices: { SY: 5800000, SA: 2299, AE: 2249, EG: 28500, IQ: 780000, JO: 440, MA: 6200, DZ: 84000 }
    },
    {
        id: 34, brand: "OnePlus", name: "OnePlus Nord 3", image: "📱",
        category: "phone", releaseDate: "2023-07-05", badge: "",
        rating: 4.4, reviewsCount: 134,
        specs: {
            screen: "6.74 بوصة - AMOLED 120Hz", resolution: "1240 × 2772 بكسل",
            processor: "MediaTek Dimensity 9000", ram: "8 GB / 16 GB",
            storage: "128 GB / 256 GB", camera: "50 MP + 8 MP + 2 MP",
            frontCamera: "16 MP", battery: "5000 mAh",
            charging: "80W سلكي", os: "Android 13 - OxygenOS", weight: "193.5 غرام"
        },
        prices: { SY: 3300000, SA: 1349, AE: 1299, EG: 16500, IQ: 440000, JO: 250, MA: 3500, DZ: 46000 }
    },

    // ============ VIVO (35-36) ============
    {
        id: 35, brand: "Vivo", name: "Vivo X100 Pro", image: "📱",
        category: "phone", releaseDate: "2023-11-13", badge: "جديد",
        rating: 4.7, reviewsCount: 123,
        specs: {
            screen: "6.78 بوصة - LTPO AMOLED 120Hz", resolution: "1260 × 2800 بكسل",
            processor: "MediaTek Dimensity 9300", ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 50 MP + 50 MP",
            frontCamera: "32 MP", battery: "5400 mAh",
            charging: "100W سلكي / 50W لاسلكي", os: "Android 14 - OriginOS", weight: "221 غرام"
        },
        prices: { SY: 8900000, SA: 3499, AE: 3399, EG: 43000, IQ: 1180000, JO: 660, MA: 9300, DZ: 125000 }
    },
    {
        id: 36, brand: "Vivo", name: "Vivo V29 Pro", image: "📱",
        category: "phone", releaseDate: "2023-09-07", badge: "",
        rating: 4.4, reviewsCount: 145,
        specs: {
            screen: "6.78 بوصة - AMOLED 120Hz", resolution: "1260 × 2800 بكسل",
            processor: "MediaTek Dimensity 8200", ram: "8 GB / 12 GB",
            storage: "256 GB / 512 GB", camera: "50 MP + 8 MP + 12 MP",
            frontCamera: "50 MP", battery: "4600 mAh",
            charging: "80W سلكي", os: "Android 13 - Funtouch OS", weight: "188 غرام"
        },
        prices: { SY: 3900000, SA: 1599, AE: 1549, EG: 19000, IQ: 510000, JO: 290, MA: 4200, DZ: 55000 }
    },

    // ============ HONOR (37-38) ============
    {
        id: 37, brand: "Honor", name: "Honor Magic6 Pro", image: "📱",
        category: "phone", releaseDate: "2024-01-11", badge: "جديد",
        rating: 4.6, reviewsCount: 98,
        specs: {
            screen: "6.8 بوصة - LTPO AMOLED 120Hz", resolution: "1280 × 2800 بكسل",
            processor: "Snapdragon 8 Gen 3", ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB", camera: "50 MP + 180 MP + 50 MP",
            frontCamera: "50 MP", battery: "5600 mAh",
            charging: "80W سلكي / 66W لاسلكي", os: "Android 14 - MagicOS 8", weight: "229 غرام"
        },
        prices: { SY: 8700000, SA: 3399, AE: 3299, EG: 42000, IQ: 1150000, JO: 640, MA: 9100, DZ: 122000 }
    },
    {
        id: 38, brand: "Honor", name: "Honor 90", image: "📱",
        category: "phone", releaseDate: "2023-05-29", badge: "",
        rating: 4.3, reviewsCount: 134,
        specs: {
            screen: "6.7 بوصة - AMOLED 120Hz", resolution: "1200 × 2664 بكسل",
            processor: "Snapdragon 7 Gen 1", ram: "8 GB / 12 GB / 16 GB",
            storage: "256 GB / 512 GB", camera: "200 MP + 12 MP + 2 MP",
            frontCamera: "50 MP", battery: "5000 mAh",
            charging: "66W سلكي", os: "Android 13 - MagicOS 7.1", weight: "183 غرام"
        },
        prices: { SY: 2700000, SA: 1099, AE: 1049, EG: 13000, IQ: 350000, JO: 200, MA: 2900, DZ: 38000 }
    },

    // ============ NOKIA (39-40) ============
    {
        id: 39, brand: "Nokia", name: "Nokia XR21", image: "📱",
        category: "phone", releaseDate: "2023-06-01", badge: "",
        rating: 4.2, reviewsCount: 67,
        specs: {
            screen: "6.49 بوصة - IPS LCD 120Hz", resolution: "1080 × 2400 بكسل",
            processor: "Snapdragon 695", ram: "6 GB / 8 GB",
            storage: "128 GB / 256 GB", camera: "64 MP + 8 MP",
            frontCamera: "16 MP", battery: "4800 mAh",
            charging: "33W سلكي", os: "Android 13", weight: "231 غرام"
        },
        prices: { SY: 2400000, SA: 999, AE: 949, EG: 11500, IQ: 320000, JO: 180, MA: 2600, DZ: 34000 }
    },
    {
        id: 40, brand: "Nokia", name: "Nokia G42 5G", image: "📱",
        category: "phone", releaseDate: "2023-06-28", badge: "",
        rating: 4.0, reviewsCount: 89,
        specs: {
            screen: "6.56 بوصة - IPS LCD 90Hz", resolution: "720 × 1612 بكسل",
            processor: "Snapdragon 480+", ram: "6 GB / 8 GB",
            storage: "128 GB / 256 GB", camera: "50 MP + 2 MP + 2 MP",
            frontCamera: "8 MP", battery: "5000 mAh",
            charging: "20W سلكي", os: "Android 13", weight: "193.8 غرام"
        },
        prices: { SY: 1300000, SA: 549, AE: 529, EG: 6300, IQ: 175000, JO: 100, MA: 1400, DZ: 19000 }
    }
// ⚠️ الأجهزة 41-140 ستُضاف في الردود التالية
];

/* ============================================================
   5) المراجعات الافتراضية
   ============================================================ */

const REVIEWS_DB = {
    1: [
        { user: "أحمد م.", rating: 5, text: "هاتف ممتاز، الكاميرا خارقة! أنصح به بشدة.", date: "2024-02-15" },
        { user: "سارة ع.", rating: 5, text: "الأفضل في السوق حالياً، يستحق السعر.", date: "2024-02-10" },
        { user: "خالد ر.", rating: 4, text: "قوي جداً لكن حجمه كبير بعض الشيء.", date: "2024-02-05" }
    ],
    8: [
        { user: "محمد س.", rating: 5, text: "آيفون بمعنى الكلمة، أداء لا يوصف.", date: "2024-02-12" },
        { user: "نور ح.", rating: 5, text: "الكاميرا رهيبة والبطارية ممتازة.", date: "2024-02-08" }
    ],
    14: [{ user: "علي ك.", rating: 5, text: "أفضل قيمة مقابل السعر في فئته.", date: "2024-02-14" }],
    19: [{ user: "لينا ف.", rating: 4, text: "كاميرا رائعة لكن بدون خدمات جوجل.", date: "2024-02-11" }],
    23: [{ user: "يوسف ط.", rating: 5, text: "شاشة مذهلة وشحن سريع جداً.", date: "2024-02-13" }],
    26: [{ user: "هدى ب.", rating: 5, text: "سعر لا يُقاوم مقابل هذه المواصفات!", date: "2024-02-16" }]
};

/* ============================================================
   6) Storage
   ============================================================ */

const Storage = {
    KEYS: {
        COUNTRY: 'iqmobil_country',
        COMPARE: 'iqmobil_compare',
        FAVORITES: 'iqmobil_favorites',
        CUSTOM_DEVICES: 'iqmobil_custom_devices',
        REVIEWS_PREFIX: 'iqmobil_reviews_',
        SESSION: 'iqmobil_session',
        ATTEMPTS: 'iqmobil_login_attempts',
        THEME: 'iqmobil_theme'
    },

    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            if (value === null) return defaultValue;
            return JSON.parse(value);
        } catch (e) { return defaultValue; }
    },

    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); return true; }
        catch (e) { return false; }
    },

    remove(key) {
        try { localStorage.removeItem(key); return true; }
        catch (e) { return false; }
    },

    getCountry() { return this.get(this.KEYS.COUNTRY, DEFAULT_COUNTRY); },
    setCountry(code) { this.set(this.KEYS.COUNTRY, code); },
    getCompare() { return this.get(this.KEYS.COMPARE, []); },
    setCompare(list) { this.set(this.KEYS.COMPARE, list); },
    getFavorites() { return this.get(this.KEYS.FAVORITES, []); },
    setFavorites(list) { this.set(this.KEYS.FAVORITES, list); },
    getCustomDevices() { return this.get(this.KEYS.CUSTOM_DEVICES, []); },
    setCustomDevices(devices) { this.set(this.KEYS.CUSTOM_DEVICES, devices); },
    getDeviceReviews(deviceId) { return this.get(this.KEYS.REVIEWS_PREFIX + deviceId, []); },
    setDeviceReviews(deviceId, reviews) { this.set(this.KEYS.REVIEWS_PREFIX + deviceId, reviews); },
    getTheme() { return this.get(this.KEYS.THEME, null); },
    setTheme(theme) { this.set(this.KEYS.THEME, theme); }
};

/* ============================================================
   7) Helpers
   ============================================================ */

const Helpers = {
    formatPrice(amount, countryCode) {
        const country = COUNTRIES[countryCode];
        if (!country) return amount + " USD";
        if (!amount && amount !== 0) return "-";
        const formatted = new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 }).format(amount);
        return `${formatted} ${country.currency}`;
    },

    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch (e) { return dateString; }
    },

    today() { return new Date().toISOString().split('T')[0]; },
    generateId() { return Date.now() + Math.floor(Math.random() * 1000); },

    escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, m => map[m]);
    },

    debounce(fn, delay = 300) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    matchesSearch(device, query) {
        if (!query || query.trim() === '') return true;
        const q = query.toLowerCase().trim();
        return (
            device.name.toLowerCase().includes(q) ||
            device.brand.toLowerCase().includes(q) ||
            (device.specs.processor && device.specs.processor.toLowerCase().includes(q))
        );
    },

    getAllDevices() {
        return [...DEVICES_DB, ...Storage.getCustomDevices()];
    },

    getDeviceById(id) {
        return this.getAllDevices().find(d => d.id === parseInt(id));
    },

    getReviews(deviceId) {
        const defaults = REVIEWS_DB[deviceId] || [];
        const custom = Storage.getDeviceReviews(deviceId);
        return [...defaults, ...custom];
    },

    getDeviceImage(device, size = 400) {
        const dataUri = SVGGenerator.toDataUri(device, size);
        return `<img src="${dataUri}" alt="${this.escapeHtml(device.name)}" loading="lazy">`;
    },

    getDeviceMiniImage(device) {
        return this.getDeviceImage(device, 200);
    }
};

/* ============================================================
   8) State
   ============================================================ */

const State = {
    currentPage: 'home',
    filters: {
        category: 'all', brand: 'all', search: '',
        minPrice: null, maxPrice: null,
        year: 'all', rating: 0, sortBy: 'default'
    },
    currentDevice: null,
    compareList: [],
    favorites: [],
    visibleDevices: 12,

    setCategory(cat) { this.filters.category = cat; },
    setBrand(brand) { this.filters.brand = brand; },
    setSearch(query) { this.filters.search = query; },
    setFilters(newFilters) { Object.assign(this.filters, newFilters); },

    resetFilters() {
        this.filters = {
            category: this.filters.category,
            brand: this.filters.brand,
            search: '', minPrice: null, maxPrice: null,
            year: 'all', rating: 0, sortBy: 'default'
        };
    },

    countActiveFilters() {
        let count = 0;
        if (this.filters.minPrice !== null && this.filters.minPrice !== '') count++;
        if (this.filters.maxPrice !== null && this.filters.maxPrice !== '') count++;
        if (this.filters.year && this.filters.year !== 'all') count++;
        if (this.filters.rating && this.filters.rating > 0) count++;
        if (this.filters.sortBy && this.filters.sortBy !== 'default') count++;
        return count;
    },

    loadCompare() { this.compareList = Storage.getCompare(); return this.compareList; },

    addToCompare(id) {
        if (this.compareList.includes(id)) return { success: false, message: 'الجهاز مضاف بالفعل' };
        if (this.compareList.length >= 3) return { success: false, message: 'يمكنك مقارنة 3 أجهزة كحد أقصى' };
        this.compareList.push(id);
        Storage.setCompare(this.compareList);
        return { success: true };
    },

    removeFromCompare(id) {
        this.compareList = this.compareList.filter(x => x !== id);
        Storage.setCompare(this.compareList);
    },

    loadFavorites() { this.favorites = Storage.getFavorites(); return this.favorites; },
    isFavorite(id) { return this.favorites.includes(id); },

    toggleFavorite(id) {
        if (this.favorites.includes(id)) {
            this.favorites = this.favorites.filter(x => x !== id);
            Storage.setFavorites(this.favorites);
            return false;
        } else {
            this.favorites.push(id);
            Storage.setFavorites(this.favorites);
            return true;
        }
    }
};

/* ============================================================
   9) Auth
   ============================================================ */

const Auth = {
    CONFIG: {
        passwordHash: 'aXFtb2JpbDIwMjY=',
        sessionKey: 'iqmobil_session',
        attemptsKey: 'iqmobil_login_attempts',
        sessionDuration: 2 * 60 * 60 * 1000,
        maxAttempts: 5,
        lockDuration: 15 * 60 * 1000
    },

    encode(str) {
        try { return btoa(unescape(encodeURIComponent(str))); }
        catch (e) { return btoa(str); }
    },

    verifyPassword(input) { return this.encode(input.trim()) === this.CONFIG.passwordHash; },

    createSession() {
        const session = {
            token: 'tk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16),
            createdAt: Date.now(),
            expiresAt: Date.now() + this.CONFIG.sessionDuration
        };
        Storage.set(this.CONFIG.sessionKey, session);
        return session;
    },

    isLoggedIn() {
        const session = Storage.get(this.CONFIG.sessionKey);
        if (!session) return false;
        if (Date.now() > session.expiresAt) { this.logout(); return false; }
        return true;
    },

    logout() { Storage.remove(this.CONFIG.sessionKey); },

    getAttempts() { return Storage.get(this.CONFIG.attemptsKey, { count: 0, lockedUntil: 0 }); },
    setAttempts(data) { Storage.set(this.CONFIG.attemptsKey, data); },

    isLocked() {
        const { lockedUntil } = this.getAttempts();
        return lockedUntil > Date.now();
    },

    getRemainingLockTime() {
        const { lockedUntil } = this.getAttempts();
        return Math.max(0, Math.ceil((lockedUntil - Date.now()) / 60000));
    },

    registerFailedAttempt() {
        const attempts = this.getAttempts();
        attempts.count = (attempts.count || 0) + 1;
        if (attempts.count >= this.CONFIG.maxAttempts) {
            attempts.lockedUntil = Date.now() + this.CONFIG.lockDuration;
            attempts.count = 0;
        }
        this.setAttempts(attempts);
        return attempts;
    },

    resetAttempts() { this.setAttempts({ count: 0, lockedUntil: 0 }); },

    getRemainingAttempts() {
        const attempts = this.getAttempts();
        return Math.max(0, this.CONFIG.maxAttempts - (attempts.count || 0));
    }
};

/* ============================================================
   10) Theme
   ============================================================ */

const Theme = {
    LIGHT: 'light',
    DARK: 'dark',

    get() {
        const saved = Storage.getTheme();
        if (saved === this.LIGHT || saved === this.DARK) return saved;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return this.DARK;
        return this.LIGHT;
    },

    apply(theme) {
        const body = document.body;
        const html = document.documentElement;
        
        if (theme === this.DARK) {
            body.classList.add('dark-mode');
            html.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            html.classList.remove('dark-mode');
        }
        
        this.updateIcon(theme);
        
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.setAttribute('content', theme === this.DARK ? '#121212' : '#1a73e8');
    },

    updateIcon(theme) {
        const icon = document.querySelector('.theme-icon');
        if (!icon) return;
        icon.textContent = theme === this.DARK ? '☀️' : '🌙';
    },

    toggle() {
        const current = this.get();
        const next = current === this.DARK ? this.LIGHT : this.DARK;
        Storage.setTheme(next);
        this.apply(next);
    },

    init() {
        this.apply(this.get());
        const btn = document.getElementById('themeToggle');
        if (btn && !btn.dataset.bound) {
            btn.dataset.bound = 'true';
            btn.addEventListener('click', () => this.toggle());
        }
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!Storage.getTheme()) this.apply(e.matches ? this.DARK : this.LIGHT);
            });
        }
    }
};