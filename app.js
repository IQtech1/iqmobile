/* ============================================================
   İQmobil - app.js (النسخة النهائية)
   40 جهاز + صور SVG + كل الإصلاحات
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
   2) مولّد الصور SVG — بدون حقوق
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

const SVGGenerator = {
    // ===== توليد صورة SVG لجهاز =====
    generate(device, size = 400) {
        const colors = BRAND_COLORS[device.brand] || ["#1a73e8", "#0d47a1"];
        const color1 = colors[0];
        const color2 = colors[1];
        const initial = device.brand.charAt(0).toUpperCase();
        const categoryIcon = this.getCategoryIcon(device.category);
        
        // نص مختصر لاسم الجهاز
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
        <filter id="shadow-${device.id}">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.2"/>
        </filter>
    </defs>
    
    <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad-${device.id})" filter="url(#shadow-${device.id})"/>
    
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

    // ===== أيقونة الفئة =====
    getCategoryIcon(category) {
        const icons = {
            phone: "📱 Smartphone",
            tablet: "📲 Tablet",
            watch: "⌚ Smartwatch",
            laptop: "💻 Laptop"
        };
        return icons[category] || "📱 Device";
    },

    // ===== تأمين XML =====
    escapeXml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    // ===== تحويل لـ Data URI =====
    toDataUri(device, size = 400) {
        const svg = this.generate(device, size);
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
};

/* ============================================================
   3) قاعدة بيانات الأجهزة — 40 جهاز
   ============================================================ */

const DEVICES_DB = [
    // ============ SAMSUNG (7 أجهزة) ============
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

    // ============ APPLE (6 أجهزة) ============
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

    // ============ XIAOMI (5 أجهزة) ============
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

    // ============ HUAWEI (4 أجهزة) ============
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

    // ============ OPPO (3 أجهزة) ============
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

    // ============ REALME (3 أجهزة) ============
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

    // ============ GOOGLE (3 أجهزة) ============
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

    // ============ ONEPLUS (3 أجهزة) ============
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

    // ============ VIVO (2 أجهزة) ============
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

    // ============ HONOR (2 أجهزة) ============
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

    // ============ NOKIA (2 أجهزة) ============
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
];

/* ============================================================
   4) المراجعات الافتراضية
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
    14: [
        { user: "علي ك.", rating: 5, text: "أفضل قيمة مقابل السعر في فئته.", date: "2024-02-14" }
    ],
    19: [
        { user: "لينا ف.", rating: 4, text: "كاميرا رائعة لكن بدون خدمات جوجل.", date: "2024-02-11" }
    ],
    23: [
        { user: "يوسف ط.", rating: 5, text: "شاشة مذهلة وشحن سريع جداً.", date: "2024-02-13" }
    ],
    26: [
        { user: "هدى ب.", rating: 5, text: "سعر لا يُقاوم مقابل هذه المواصفات!", date: "2024-02-16" }
    ]
};

/* ============================================================
   5) Storage
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
   6) Helpers
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

    // ===== صورة الجهاز (SVG) =====
    getDeviceImage(device, size = 400) {
        const dataUri = SVGGenerator.toDataUri(device, size);
        return `<img src="${dataUri}" alt="${this.escapeHtml(device.name)}" loading="lazy">`;
    },

    getDeviceMiniImage(device) {
        return this.getDeviceImage(device, 200);
    }
};

/* ============================================================
   7) State
   ============================================================ */

const State = {
    currentPage: 'home',
    filters: {
        category: 'all',
        brand: 'all',
        search: '',
        minPrice: null,
        maxPrice: null,
        year: 'all',
        rating: 0,
        sortBy: 'default'
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
            search: '',
            minPrice: null,
            maxPrice: null,
            year: 'all',
            rating: 0,
            sortBy: 'default'
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
   8) Auth
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
   9) Theme
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

/* ============================================================
   10) Router
   ============================================================ */

const Router = {
    protectedPages: ['admin'],

    go(pageName, params = null) {
        if (this.protectedPages.includes(pageName) && !Auth.isLoggedIn()) {
            this.showPage('login');
            if (typeof Login !== 'undefined') Login.render();
            return;
        }

        this.updateHash(pageName, params);

        if (pageName === 'device' && params && params.id) {
            const device = Helpers.getDeviceById(params.id);
            if (device) {
                State.currentDevice = device;
                Device.render();
            } else {
                this.showPage('home');
                return;
            }
        }

        this.showPage(pageName);
        this.onPageLoad(pageName, params);
    },

    updateHash(page, params) {
        let hash = '#' + page;
        if (params && params.id) hash += '/' + params.id;
        try { history.replaceState(null, '', hash); }
        catch (e) { window.location.hash = hash; }
    },

    showPage(pageName) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const target = document.getElementById('page-' + pageName);
        if (target) target.classList.add('active');

        document.querySelectorAll('#mainNav a').forEach(a => a.classList.remove('active'));
        const navTarget = document.querySelector(`#mainNav a[data-nav="${pageName}"]`);
        if (navTarget) navTarget.classList.add('active');

        State.currentPage = pageName;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    onPageLoad(pageName, params) {
        switch (pageName) {
            case 'home': Home.render(); break;
            case 'compare': Compare.render(); break;
            case 'favorites': Favorites.render(); break;
            case 'admin': Admin.render(); break;
            case 'login': Login.render(); break;
        }
    },

    parseHash() {
        const hash = window.location.hash.substring(1);
        if (!hash) return { page: 'home', params: null };
        const parts = hash.split('/');
        const page = parts[0];
        if (page === 'device' && parts[1]) {
            return { page: 'device', params: { id: parseInt(parts[1]) } };
        }
        return { page, params: null };
    },

    handleHashChange() {
        const { page, params } = this.parseHash();
        
        if (page === 'device' && params) {
            const device = Helpers.getDeviceById(params.id);
            if (device) {
                State.currentDevice = device;
                Device.render();
                this.showPage('device');
                return;
            }
        }
        
        if (page === 'admin' && !Auth.isLoggedIn()) {
            this.showPage('login');
            Login.render();
            return;
        }
        
        this.showPage(page);
        this.onPageLoad(page, params);
    },

    init() {
        document.querySelectorAll('[data-nav]').forEach(el => {
            if (el.dataset.bound === 'true') return;
            el.dataset.bound = 'true';
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.go(el.dataset.nav);
            });
        });

        document.querySelectorAll('[data-category]').forEach(el => {
            if (el.dataset.bound === 'true') return;
            el.dataset.bound = 'true';
            el.addEventListener('click', (e) => {
                e.preventDefault();
                Home.filterCategory(el.dataset.category);
                this.go('home');
            });
        });

        window.addEventListener('hashchange', () => this.handleHashChange());
    }
};

/* ============================================================
   11) Home
   ============================================================ */

const Home = {
    render() {
        this.renderStats();
        this.renderSection();
        this.renderDevicesGrid();
        this.bindEvents();
        this.updateFilterBadge();
    },

    renderStats() {
        const container = document.getElementById('statsContainer');
        if (!container) return;
        const totalDevices = Helpers.getAllDevices().length;
        const totalReviews = Helpers.getAllDevices().reduce((s, d) => s + (d.reviewsCount || 0), 0);
        const totalCountries = Object.keys(COUNTRIES).length;

        container.innerHTML = `
            <div class="stat-card"><span class="number">${totalDevices}</span><span class="label">جهاز في قاعدة البيانات</span></div>
            <div class="stat-card"><span class="number">${totalCountries}</span><span class="label">دول عربية</span></div>
            <div class="stat-card"><span class="number">${totalReviews}+</span><span class="label">مراجعة وتقييم</span></div>
            <div class="stat-card"><span class="number">يومياً</span><span class="label">تحديث الأسعار</span></div>
        `;
    },

    renderSection() {
        const title = document.getElementById('sectionTitle');
        if (!title) return;
        const titles = {
            all: 'أحدث الأجهزة', phone: 'الهواتف الذكية',
            tablet: 'الأجهزة اللوحية', watch: 'الساعات الذكية', laptop: 'اللابتوب'
        };
        title.textContent = titles[State.filters.category] || 'أحدث الأجهزة';
    },

    applyAllFilters(devices) {
        const country = Storage.getCountry();
        const f = State.filters;

        if (f.category !== 'all') devices = devices.filter(d => d.category === f.category);
        if (f.brand !== 'all') devices = devices.filter(d => d.brand === f.brand);
        if (f.search && f.search.trim()) devices = devices.filter(d => Helpers.matchesSearch(d, f.search));

        if (f.minPrice !== null && f.minPrice !== '' && f.minPrice !== undefined) {
            devices = devices.filter(d => {
                const price = d.prices[country] || d.prices.SY || 0;
                return price >= parseFloat(f.minPrice);
            });
        }
        if (f.maxPrice !== null && f.maxPrice !== '' && f.maxPrice !== undefined) {
            devices = devices.filter(d => {
                const price = d.prices[country] || d.prices.SY || 0;
                return price <= parseFloat(f.maxPrice);
            });
        }

        if (f.year && f.year !== 'all') {
            devices = devices.filter(d => {
                const year = d.releaseDate ? d.releaseDate.split('-')[0] : '';
                return year === f.year;
            });
        }

        if (f.rating && f.rating > 0) {
            devices = devices.filter(d => d.rating >= parseFloat(f.rating));
        }

        if (f.sortBy && f.sortBy !== 'default') {
            devices = [...devices];
            switch (f.sortBy) {
                case 'price-asc': devices.sort((a, b) => (a.prices[country] || 0) - (b.prices[country] || 0)); break;
                case 'price-desc': devices.sort((a, b) => (b.prices[country] || 0) - (a.prices[country] || 0)); break;
                case 'rating': devices.sort((a, b) => b.rating - a.rating); break;
                case 'newest': devices.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)); break;
                case 'name': devices.sort((a, b) => a.name.localeCompare(b.name, 'ar')); break;
            }
        }

        return devices;
    },

    renderDevicesGrid() {
        const grid = document.getElementById('devicesGrid');
        if (!grid) return;

        const country = Storage.getCountry();
        let devices = Helpers.getAllDevices();
        devices = this.applyAllFilters(devices);

        const countEl = document.getElementById('resultsCount');
        if (countEl) countEl.textContent = `${devices.length} جهاز`;

        if (devices.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <div class="icon">🔍</div>
                    <h3>لا توجد نتائج مطابقة</h3>
                    <p>جرّب تعديل الفلاتر أو كلمة البحث</p>
                </div>
            `;
            const loadBtn = document.getElementById('loadMoreBtn');
            if (loadBtn) loadBtn.style.display = 'none';
            return;
        }

        const visible = devices.slice(0, State.visibleDevices);
        grid.innerHTML = visible.map(d => this.renderCard(d, country)).join('');

        const loadBtn = document.getElementById('loadMoreBtn');
        if (loadBtn) {
            if (devices.length > State.visibleDevices) {
                loadBtn.style.display = 'block';
                loadBtn.textContent = `📱 عرض المزيد (${devices.length - State.visibleDevices} متبقي)`;
                loadBtn.dataset.bound = loadBtn.dataset.bound || 'false';
                if (loadBtn.dataset.bound === 'false') {
                    loadBtn.dataset.bound = 'true';
                    loadBtn.addEventListener('click', () => {
                        State.visibleDevices += 12;
                        this.renderDevicesGrid();
                    });
                }
            } else {
                loadBtn.style.display = 'none';
            }
        }

        this.bindCardEvents();
    },

    renderCard(device, country) {
        const price = device.prices[country] || device.prices.SY || 0;
        const checked = State.compareList.includes(device.id) ? 'checked' : '';
        const isFav = State.isFavorite(device.id) ? 'is-fav' : '';
        const favIcon = State.isFavorite(device.id) ? '❤️' : '🤍';

        return `
            <div class="device-card" data-device-id="${device.id}">
                <div class="device-image">
                    ${Helpers.getDeviceImage(device, 200)}
                    ${device.badge ? `<span class="device-badge">${Helpers.escapeHtml(device.badge)}</span>` : ''}
                    <input type="checkbox" class="compare-checkbox" ${checked}
                           data-compare-id="${device.id}" aria-label="أضف للمقارنة">
                </div>
                <button class="fav-btn ${isFav}" data-fav-id="${device.id}" aria-label="أضف للمفضلة">
                    ${favIcon}
                </button>
                <div class="device-info">
                    <div class="device-brand">${Helpers.escapeHtml(device.brand)}</div>
                    <div class="device-name">${Helpers.escapeHtml(device.name)}</div>
                    <div class="device-price">${Helpers.formatPrice(price, country)}</div>
                    <div class="device-rating">⭐ ${device.rating} (${device.reviewsCount})</div>
                </div>
            </div>
        `;
    },

    bindCardEvents() {
        document.querySelectorAll('.device-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.compare-checkbox')) return;
                if (e.target.closest('.fav-btn')) return;
                const id = parseInt(card.dataset.deviceId);
                Router.go('device', { id });
            });
        });

        document.querySelectorAll('.compare-checkbox').forEach(cb => {
            cb.addEventListener('click', (e) => {
                e.stopPropagation();
                Compare.toggle(parseInt(cb.dataset.compareId), cb);
            });
        });

        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.favId);
                const isFav = State.toggleFavorite(id);
                btn.classList.toggle('is-fav', isFav);
                btn.textContent = isFav ? '❤️' : '🤍';
                App.updateFavCount();
                if (isFav) {
                    btn.style.animation = 'heartBeat 0.5s ease';
                    setTimeout(() => btn.style.animation = '', 500);
                }
            });
        });
    },

    bindEvents() {
        const heroBtn = document.getElementById('heroSearchBtn');
        if (heroBtn && !heroBtn.dataset.bound) {
            heroBtn.dataset.bound = 'true';
            heroBtn.addEventListener('click', () => this.performHeroSearch());
        }

        const heroInput = document.getElementById('heroSearch');
        if (heroInput && !heroInput.dataset.bound) {
            heroInput.dataset.bound = 'true';
            heroInput.addEventListener('input', Helpers.debounce((e) => {
                State.setSearch(e.target.value);
                State.visibleDevices = 12;
                this.renderDevicesGrid();
            }, 300));
        }
    },

    performHeroSearch() {
        const input = document.getElementById('heroSearch');
        if (!input) return;
        State.setSearch(input.value);
        State.visibleDevices = 12;
        const mainSearch = document.getElementById('mainSearch');
        if (mainSearch) mainSearch.value = input.value;
        this.renderDevicesGrid();
        const grid = document.getElementById('devicesGrid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    },

    filterCategory(cat) {
        State.setCategory(cat);
        State.visibleDevices = 12;
        this.renderSection();
        this.renderDevicesGrid();
    },

    filterBrand(brand, el) {
        State.setBrand(brand);
        State.visibleDevices = 12;
        document.querySelectorAll('#brandsBar a').forEach(a => a.classList.remove('active'));
        if (el) el.classList.add('active');
        else {
            const target = [...document.querySelectorAll('#brandsBar a')].find(a => a.dataset.brand === brand);
            if (target) target.classList.add('active');
        }
        this.renderDevicesGrid();
    },

    updateFilterBadge() {
        const badge = document.getElementById('filterBadge');
        if (!badge) return;
        const count = State.countActiveFilters();
        if (count === 0) badge.style.display = 'none';
        else { badge.style.display = 'flex'; badge.textContent = count; }
    }
};

/* ============================================================
   12) Filters
   ============================================================ */

const Filters = {
    init() {
        const toggleBtn = document.getElementById('filterToggle');
        const closeBtn = document.getElementById('closeFilters');
        const applyBtn = document.getElementById('applyFilters');
        const resetBtn = document.getElementById('resetFilters');
        const overlay = document.getElementById('filtersOverlay');

        if (toggleBtn) toggleBtn.addEventListener('click', () => this.toggle());
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        if (applyBtn) applyBtn.addEventListener('click', () => this.apply());
        if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
        if (overlay) overlay.addEventListener('click', () => this.close());
    },

    toggle() {
        const panel = document.getElementById('filtersPanel');
        const overlay = document.getElementById('filtersOverlay');
        const btn = document.getElementById('filterToggle');
        if (panel) panel.classList.toggle('open');
        if (overlay) overlay.classList.toggle('show');
        if (btn) btn.classList.toggle('active');
        this.syncInputsFromState();
    },

    close() {
        const panel = document.getElementById('filtersPanel');
        const overlay = document.getElementById('filtersOverlay');
        const btn = document.getElementById('filterToggle');
        if (panel) panel.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
        if (btn) btn.classList.remove('active');
    },

    syncInputsFromState() {
        const f = State.filters;
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val !== null && val !== undefined ? val : '';
        };
        setVal('minPrice', f.minPrice);
        setVal('maxPrice', f.maxPrice);
        setVal('filterYear', f.year || 'all');
        setVal('filterRating', f.rating || '0');
        setVal('sortBy', f.sortBy || 'default');
    },

    apply() {
        const minPrice = document.getElementById('minPrice').value;
        const maxPrice = document.getElementById('maxPrice').value;
        const year = document.getElementById('filterYear').value;
        const rating = document.getElementById('filterRating').value;
        const sortBy = document.getElementById('sortBy').value;

        State.setFilters({
            minPrice: minPrice ? parseFloat(minPrice) : null,
            maxPrice: maxPrice ? parseFloat(maxPrice) : null,
            year: year,
            rating: parseFloat(rating) || 0,
            sortBy: sortBy
        });

        State.visibleDevices = 12;
        Home.renderDevicesGrid();
        Home.updateFilterBadge();
        this.renderActiveTags();
        this.close();
    },

    reset() {
        State.resetFilters();
        State.visibleDevices = 12;
        this.syncInputsFromState();
        Home.renderDevicesGrid();
        Home.updateFilterBadge();
        this.renderActiveTags();
        this.close();
    },

    renderActiveTags() {
        const container = document.getElementById('activeFilters');
        if (!container) return;

        const f = State.filters;
        const tags = [];

        if (f.minPrice) tags.push({ key: 'minPrice', text: `أدنى: ${Helpers.formatPrice(f.minPrice, Storage.getCountry())}` });
        if (f.maxPrice) tags.push({ key: 'maxPrice', text: `أقصى: ${Helpers.formatPrice(f.maxPrice, Storage.getCountry())}` });
        if (f.year && f.year !== 'all') tags.push({ key: 'year', text: `سنة: ${f.year}` });
        if (f.rating > 0) tags.push({ key: 'rating', text: `تقييم: ${f.rating}+` });
        if (f.sortBy && f.sortBy !== 'default') {
            const sortNames = {
                'price-asc': 'الأقل سعراً', 'price-desc': 'الأعلى سعراً',
                'rating': 'الأعلى تقييماً', 'newest': 'الأحدث', 'name': 'الاسم أ-ي'
            };
            tags.push({ key: 'sortBy', text: `ترتيب: ${sortNames[f.sortBy]}` });
        }

        if (tags.length === 0) { container.innerHTML = ''; return; }

        container.innerHTML = tags.map(t => `
            <div class="active-filter-tag">
                ${t.text}
                <button data-remove-filter="${t.key}">✕</button>
            </div>
        `).join('');

        container.querySelectorAll('[data-remove-filter]').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.removeFilter;
                if (key === 'minPrice' || key === 'maxPrice') State.filters[key] = null;
                if (key === 'year') State.filters.year = 'all';
                if (key === 'rating') State.filters.rating = 0;
                if (key === 'sortBy') State.filters.sortBy = 'default';
                State.visibleDevices = 12;
                this.syncInputsFromState();
                Home.renderDevicesGrid();
                Home.updateFilterBadge();
                this.renderActiveTags();
            });
        });
    }
};

/* ============================================================
   13) Device
   ============================================================ */

const Device = {
    render() {
        const device = State.currentDevice;
        if (!device) return;

        const container = document.getElementById('page-device');
        const country = Storage.getCountry();
        const price = device.prices[country] || device.prices.SY || 0;

        const specsLabels = {
            screen: "الشاشة", resolution: "الدقة", processor: "المعالج",
            ram: "الذاكرة العشوائية", storage: "التخزين", camera: "الكاميرا الخلفية",
            frontCamera: "الكاميرا الأمامية", battery: "البطارية", charging: "الشحن",
            os: "نظام التشغيل", weight: "الوزن"
        };

        const isFav = State.isFavorite(device.id);

        container.innerHTML = `
            <div class="device-detail">
                <div class="device-header">
                    <div class="device-hero-image">${Helpers.getDeviceImage(device, 500)}</div>
                    <div class="device-header-info">
                        <span class="brand-tag">${Helpers.escapeHtml(device.brand)}</span>
                        <h1>${Helpers.escapeHtml(device.name)}</h1>
                        <div class="rating-big">
                            ⭐ ${device.rating}
                            <span style="font-size: 14px;">(${device.reviewsCount} مراجعة)</span>
                        </div>
                        <div class="price-big">${Helpers.formatPrice(price, country)}</div>
                        <p style="color: var(--gray);">📅 تاريخ الإصدار: ${Helpers.formatDate(device.releaseDate)}</p>
                        <div class="device-actions">
                            <button class="btn-primary" id="addToCompareBtn">⚖️ أضف للمقارنة</button>
                            <button class="btn-primary" style="background: ${isFav ? 'var(--heart)' : '#34a853'};" id="favBtn">
                                ${isFav ? '❤️ في المفضلة' : '🤍 أضف للمفضلة'}
                            </button>
                            <button class="btn-primary" style="background: #5f6368;" data-nav="home">← رجوع</button>
                        </div>
                    </div>
                </div>

                <h2 class="section-title">المواصفات الكاملة</h2>
                <table class="specs-table">
                    <tbody>
                        ${Object.entries(device.specs).map(([key, val]) => `
                            <tr><th>${specsLabels[key] || key}</th><td>${Helpers.escapeHtml(String(val))}</td></tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="reviews-section">
                    <h2 class="section-title">آراء المستخدمين</h2>
                    <div id="reviewsList"></div>
                    <div class="review-form">
                        <h3>✍️ أضف مراجعتك</h3>
                        <input type="text" id="reviewUser" placeholder="اسمك" maxlength="50">
                        <select id="reviewRating">
                            <option value="5">⭐⭐⭐⭐⭐ ممتاز</option>
                            <option value="4">⭐⭐⭐⭐ جيد جداً</option>
                            <option value="3">⭐⭐⭐ جيد</option>
                            <option value="2">⭐⭐ مقبول</option>
                            <option value="1">⭐ ضعيف</option>
                        </select>
                        <textarea id="reviewText" placeholder="اكتب رأيك في الجهاز..." maxlength="500"></textarea>
                        <button id="submitReviewBtn">إرسال المراجعة</button>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
        this.renderReviews();
        Router.init();
    },

    bindEvents() {
        const addBtn = document.getElementById('addToCompareBtn');
        if (addBtn) addBtn.addEventListener('click', () => this.addToCompare());

        const favBtn = document.getElementById('favBtn');
        if (favBtn) {
            favBtn.addEventListener('click', () => {
                const isFav = State.toggleFavorite(State.currentDevice.id);
                favBtn.style.background = isFav ? 'var(--heart)' : '#34a853';
                favBtn.textContent = isFav ? '❤️ في المفضلة' : '🤍 أضف للمفضلة';
                App.updateFavCount();
            });
        }

        const submitBtn = document.getElementById('submitReviewBtn');
        if (submitBtn) submitBtn.addEventListener('click', () => this.submitReview());
    },

    renderReviews() {
        const device = State.currentDevice;
        if (!device) return;
        const list = document.getElementById('reviewsList');
        if (!list) return;

        const reviews = Helpers.getReviews(device.id);

        if (reviews.length === 0) {
            list.innerHTML = `
                <div style="text-align: center; padding: 30px; color: var(--gray);">
                    <div style="font-size: 40px; margin-bottom: 10px;">💬</div>
                    <p>لا توجد مراجعات بعد. كن أول من يراجع!</p>
                </div>
            `;
            return;
        }

        list.innerHTML = reviews.map(r => `
            <div class="review-card">
                <div class="review-header">
                    <span>${Helpers.escapeHtml(r.user)}</span>
                    <span class="review-stars">${'⭐'.repeat(r.rating)}</span>
                </div>
                <div class="review-text">${Helpers.escapeHtml(r.text)}</div>
                <div class="review-date">${Helpers.formatDate(r.date)}</div>
            </div>
        `).join('');
    },

    submitReview() {
        const device = State.currentDevice;
        if (!device) return;

        const userInput = document.getElementById('reviewUser');
        const ratingInput = document.getElementById('reviewRating');
        const textInput = document.getElementById('reviewText');

        const user = userInput.value.trim();
        const rating = parseInt(ratingInput.value);
        const text = textInput.value.trim();

        if (!user) { alert('⚠️ يرجى إدخال اسمك'); userInput.focus(); return; }
        if (!text || text.length < 5) { alert('⚠️ يرجى كتابة مراجعة (5 أحرف على الأقل)'); textInput.focus(); return; }

        const reviews = Storage.getDeviceReviews(device.id);
        reviews.unshift({ user, rating, text, date: Helpers.today() });
        Storage.setDeviceReviews(device.id, reviews);

        userInput.value = '';
        textInput.value = '';
        ratingInput.value = '5';

        this.renderReviews();
        alert('✅ تم إضافة مراجعتك بنجاح!');
    },

    addToCompare() {
        const device = State.currentDevice;
        if (!device) return;
        const result = State.addToCompare(device.id);
        if (!result.success) { alert('⚠️ ' + result.message); return; }
        Compare.renderBar();
        alert('✅ تم إضافة الجهاز للمقارنة');
    }
};

/* ============================================================
   14) Compare
   ============================================================ */

const Compare = {
    toggle(id, checkbox) {
        if (checkbox.checked) {
            const result = State.addToCompare(id);
            if (!result.success) {
                checkbox.checked = false;
                alert('⚠️ ' + result.message);
                return;
            }
        } else {
            State.removeFromCompare(id);
        }
        this.renderBar();
    },

    renderBar() {
        const bar = document.getElementById('compareBar');
        const items = document.getElementById('compareBarItems');
        if (!bar || !items) return;

        if (State.compareList.length === 0) {
            bar.classList.remove('show');
            return;
        }

        bar.classList.add('show');
        items.innerHTML = State.compareList.map(id => {
            const d = Helpers.getDeviceById(id);
            return d ? `<span>${Helpers.escapeHtml(d.name)}</span>` : '';
        }).join('');
    },

    goToCompare() {
        if (State.compareList.length < 2) {
            alert('⚠️ اختر جهازين على الأقل للمقارنة');
            return;
        }
        Router.go('compare');
    },

    render() {
        const container = document.getElementById('page-compare');
        if (!container) return;

        State.loadCompare();
        const ids = State.compareList;

        if (ids.length < 2) {
            container.innerHTML = `
                <div class="compare-page">
                    <div class="empty-compare">
                        <div class="icon">⚖️</div>
                        <h2>لا توجد أجهزة كافية للمقارنة</h2>
                        <p>اختر جهازين على الأقل من الصفحة الرئيسية</p>
                        <button data-nav="home">تصفح الأجهزة ←</button>
                    </div>
                </div>
            `;
            Router.init();
            return;
        }

        const devices = ids.map(id => Helpers.getDeviceById(id)).filter(Boolean);
        const country = Storage.getCountry();

        const specsLabels = {
            screen: "الشاشة", resolution: "الدقة", processor: "المعالج",
            ram: "الذاكرة العشوائية", storage: "التخزين", camera: "الكاميرا الخلفية",
            frontCamera: "الكاميرا الأمامية", battery: "البطارية", charging: "الشحن",
            os: "نظام التشغيل", weight: "الوزن"
        };

        const specKeys = Object.keys(devices[0].specs);

        container.innerHTML = `
            <div class="compare-page">
                <h1 class="section-title" style="margin: 30px 0 20px;">⚖️ مقارنة الأجهزة</h1>
                <table class="compare-table">
                    <thead>
                        <tr>
                            <th class="device-col">المواصفة</th>
                            ${devices.map(d => `
                                <th class="device-header-cell">
                                    <div class="device-mini-img">${Helpers.getDeviceMiniImage(d)}</div>
                                    <div>${Helpers.escapeHtml(d.brand)}</div>
                                    <div style="font-size: 14px; color: var(--gray); margin-top: 5px;">
                                        ${Helpers.escapeHtml(d.name)}
                                    </div>
                                    <button class="btn-remove" data-remove-id="${d.id}">❌ إزالة</button>
                                </th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="device-col">💰 السعر</td>
                            ${devices.map(d => `<td style="font-weight: 700; color: var(--primary);">${Helpers.formatPrice(d.prices[country] || d.prices.SY || 0, country)}</td>`).join('')}
                        </tr>
                        <tr>
                            <td class="device-col">⭐ التقييم</td>
                            ${devices.map(d => `<td>${d.rating} (${d.reviewsCount})</td>`).join('')}
                        </tr>
                        <tr>
                            <td class="device-col">📅 تاريخ الإصدار</td>
                            ${devices.map(d => `<td>${Helpers.formatDate(d.releaseDate)}</td>`).join('')}
                        </tr>
                        ${specKeys.map(key => `
                            <tr>
                                <td class="device-col">${specsLabels[key] || key}</td>
                                ${devices.map(d => `<td>${Helpers.escapeHtml(String(d.specs[key] || '-'))}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div style="text-align: center; margin: 30px 0;">
                    <button class="compare-btn" data-nav="home">← العودة للأجهزة</button>
                </div>
            </div>
        `;

        document.querySelectorAll('[data-remove-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                State.removeFromCompare(parseInt(btn.dataset.removeId));
                this.renderBar();
                this.render();
                Home.renderDevicesGrid();
            });
        });

        Router.init();
    }
};

/* ============================================================
   15) Favorites
   ============================================================ */

const Favorites = {
    render() {
        const container = document.getElementById('page-favorites');
        if (!container) return;

        State.loadFavorites();
        const favIds = State.favorites;
        const country = Storage.getCountry();

        const header = `
            <div class="favorites-page">
                <div class="favorites-header">
                    <h1>❤️ المفضلات</h1>
                    <p>${favIds.length > 0 ? `${favIds.length} جهاز في قائمتك` : 'احفظ الأجهزة التي تريد شراءها لاحقاً'}</p>
                </div>
        `;

        if (favIds.length === 0) {
            container.innerHTML = header + `
                <div class="empty-favorites">
                    <span class="icon">💔</span>
                    <h2>لا توجد أجهزة في المفضلة</h2>
                    <p>اضغط على أيقونة القلب 🤍 على أي جهاز لإضافته هنا</p>
                    <button class="btn-primary" data-nav="home">تصفح الأجهزة ←</button>
                </div>
            </div>
            `;
            Router.init();
            return;
        }

        const devices = favIds.map(id => Helpers.getDeviceById(id)).filter(Boolean);

        container.innerHTML = header + `
                <div class="devices-grid">
                    ${devices.map(d => this.renderFavCard(d, country)).join('')}
                </div>
            </div>
        `;

        this.bindEvents();
        Router.init();
    },

    renderFavCard(device, country) {
        const price = device.prices[country] || device.prices.SY || 0;
        return `
            <div class="device-card" data-device-id="${device.id}">
                <div class="device-image">
                    ${Helpers.getDeviceImage(device, 200)}
                    ${device.badge ? `<span class="device-badge">${Helpers.escapeHtml(device.badge)}</span>` : ''}
                </div>
                <button class="fav-btn is-fav" data-fav-id="${device.id}" aria-label="إزالة من المفضلة">❤️</button>
                <div class="device-info">
                    <div class="device-brand">${Helpers.escapeHtml(device.brand)}</div>
                    <div class="device-name">${Helpers.escapeHtml(device.name)}</div>
                    <div class="device-price">${Helpers.formatPrice(price, country)}</div>
                    <div class="device-rating">⭐ ${device.rating} (${device.reviewsCount})</div>
                </div>
            </div>
        `;
    },

    bindEvents() {
        document.querySelectorAll('.device-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.fav-btn')) return;
                Router.go('device', { id: parseInt(card.dataset.deviceId) });
            });
        });

        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                State.toggleFavorite(parseInt(btn.dataset.favId));
                App.updateFavCount();
                this.render();
            });
        });
    }
};

/* ============================================================
   16) Login
   ============================================================ */

const Login = {
    render() {
        const container = document.getElementById('page-login');
        if (!container) return;

        if (Auth.isLoggedIn()) { Router.go('admin'); return; }

        container.innerHTML = `
            <div class="login-container">
                <div class="login-box">
                    <div class="login-icon">🔐</div>
                    <h2>منطقة محظورة</h2>
                    <p class="login-subtitle">هذه المنطقة مخصصة للمشرفين فقط</p>
                    <div id="loginAlert"></div>
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="loginPassword">كلمة المرور</label>
                            <input type="password" id="loginPassword" placeholder="أدخل كلمة المرور..." required>
                        </div>
                        <button type="submit" class="btn-primary login-btn">🔓 دخول</button>
                        <div class="login-info" id="loginInfo"></div>
                    </form>
                    <button class="login-back" data-nav="home">← العودة للرئيسية</button>
                </div>
            </div>
        `;

        document.getElementById('loginForm').addEventListener('submit', (e) => this.submit(e));
        setTimeout(() => document.getElementById('loginPassword')?.focus(), 100);
        this.checkLockStatus();
        Router.init();
    },

    submit(e) {
        e.preventDefault();
        if (Auth.isLocked()) {
            const mins = Auth.getRemainingLockTime();
            this.showAlert(`🚫 محظور مؤقتاً. حاول بعد ${mins} دقيقة`, 'error');
            return;
        }

        const input = document.getElementById('loginPassword');
        const password = input.value;

        if (!password) { this.showAlert('⚠️ أدخل كلمة المرور', 'error'); return; }

        if (Auth.verifyPassword(password)) {
            Auth.createSession();
            Auth.resetAttempts();
            this.showAlert('✅ تم الدخول بنجاح!', 'success');
            setTimeout(() => Router.go('admin'), 500);
        } else {
            const attempts = Auth.registerFailedAttempt();
            if (attempts.lockedUntil > Date.now()) {
                this.showAlert('🚫 تم حظرك لمدة 15 دقيقة', 'error');
            } else {
                const remaining = Auth.getRemainingAttempts();
                this.showAlert(`❌ كلمة المرور خاطئة. متبقي: ${remaining} محاولة`, 'error');
            }
            input.value = '';
            input.focus();
        }
    },

    showAlert(msg, type) {
        const box = document.getElementById('loginAlert');
        if (!box) return;
        box.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
        if (type === 'success') setTimeout(() => { if (box) box.innerHTML = ''; }, 2000);
    },

    checkLockStatus() {
        const info = document.getElementById('loginInfo');
        if (!info) return;
        if (Auth.isLocked()) {
            const mins = Auth.getRemainingLockTime();
            info.innerHTML = `<span style="color: var(--danger);">🚫 محظور مؤقتاً. حاول بعد ${mins} دقيقة.</span>`;
        } else {
            const remaining = Auth.getRemainingAttempts();
            if (remaining < Auth.CONFIG.maxAttempts) {
                info.innerHTML = `<span style="color: var(--warning);">⚠️ متبقي ${remaining} محاولات</span>`;
            }
        }
    }
};

/* ============================================================
   17) Admin
   ============================================================ */

const Admin = {
    render() {
        if (!Auth.isLoggedIn()) { Router.go('login'); return; }

        const container = document.getElementById('page-admin');
        if (!container) return;

        container.innerHTML = `
            <div class="admin-container">
                <div class="admin-header-bar">
                    <h1>⚙️ لوحة التحكم</h1>
                    <button class="btn-logout" id="logoutBtn">🚪 تسجيل الخروج</button>
                </div>
                <div id="alertBox"></div>
                <div class="admin-form">
                    <h2>➕ إضافة جهاز جديد</h2>
                    <form id="addDeviceForm">
                        <div class="form-row">
                            <div class="form-group"><label>الماركة *</label><input type="text" name="brand" required placeholder="Samsung" maxlength="30"></div>
                            <div class="form-group"><label>اسم الجهاز *</label><input type="text" name="name" required placeholder="Galaxy S25" maxlength="60"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>الفئة</label>
                                <select name="category">
                                    <option value="phone">هاتف</option>
                                    <option value="tablet">جهاز لوحي</option>
                                    <option value="watch">ساعة ذكية</option>
                                    <option value="laptop">لابتوب</option>
                                </select>
                            </div>
                            <div class="form-group"><label>المعالج</label><input type="text" name="processor" placeholder="Snapdragon 8 Gen 3" maxlength="60"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>الشاشة</label><input type="text" name="screen" placeholder="6.8 بوصة AMOLED" maxlength="60"></div>
                            <div class="form-group"><label>الذاكرة العشوائية</label><input type="text" name="ram" placeholder="12 GB" maxlength="30"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>التخزين</label><input type="text" name="storage" placeholder="256 GB" maxlength="60"></div>
                            <div class="form-group"><label>الكاميرا</label><input type="text" name="camera" placeholder="200 MP" maxlength="80"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>البطارية</label><input type="text" name="battery" placeholder="5000 mAh" maxlength="40"></div>
                            <div class="form-group"><label>نظام التشغيل</label><input type="text" name="os" placeholder="Android 14" maxlength="40"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>السعر في سوريا (ل.س) *</label><input type="number" name="priceSY" required placeholder="12500000" min="0"></div>
                            <div class="form-group"><label>السعر في السعودية (ر.س) *</label><input type="number" name="priceSA" required placeholder="4850" min="0"></div>
                        </div>
                        <button type="submit" class="btn-primary">✅ إضافة الجهاز</button>
                    </form>
                </div>
                <div class="admin-device-list">
                    <h2>📋 الأجهزة المضافة</h2>
                    <div id="adminDeviceList"></div>
                </div>
            </div>
        `;

        document.getElementById('addDeviceForm').addEventListener('submit', (e) => this.addDevice(e));
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

        this.renderList();
        Router.init();
    },

    addDevice(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const custom = Storage.getCustomDevices();

        const newDevice = {
            id: Helpers.generateId(),
            brand: data.get('brand').trim(),
            name: data.get('name').trim(),
            image: "📱",
            category: data.get('category') || 'phone',
            releaseDate: Helpers.today(),
            badge: 'جديد',
            rating: 4.5,
            reviewsCount: 0,
            isCustom: true,
            specs: {
                screen: data.get('screen') || '-',
                resolution: '-',
                processor: data.get('processor') || '-',
                ram: data.get('ram') || '-',
                storage: data.get('storage') || '-',
                camera: data.get('camera') || '-',
                frontCamera: '-',
                battery: data.get('battery') || '-',
                charging: '-',
                os: data.get('os') || '-',
                weight: '-'
            },
            prices: {
                SY: parseInt(data.get('priceSY')) || 0,
                SA: parseInt(data.get('priceSA')) || 0,
                AE: 0, EG: 0, IQ: 0, JO: 0, MA: 0, DZ: 0
            }
        };

        custom.push(newDevice);
        Storage.setCustomDevices(custom);

        this.showAlert('✅ تم إضافة الجهاز بنجاح!', 'success');
        form.reset();

        this.renderList();
        this.refreshAll();
    },

    renderList() {
        const list = document.getElementById('adminDeviceList');
        if (!list) return;
        const custom = Storage.getCustomDevices();

        if (custom.length === 0) {
            list.innerHTML = `<p style="color: var(--gray); padding: 20px; text-align: center;">لا توجد أجهزة مضافة بعد</p>`;
            return;
        }

        list.innerHTML = custom.map(d => `
            <div class="admin-device-item">
                <div>
                    <strong>${Helpers.escapeHtml(d.brand)} ${Helpers.escapeHtml(d.name)}</strong>
                    <div style="font-size: 13px; color: var(--gray); margin-top: 5px;">
                        ${Helpers.formatPrice(d.prices.SY || 0, 'SY')}
                    </div>
                </div>
                <button class="btn-danger" data-delete-id="${d.id}">🗑️ حذف</button>
            </div>
        `).join('');

        list.querySelectorAll('[data-delete-id]').forEach(btn => {
            btn.addEventListener('click', () => this.deleteDevice(parseInt(btn.dataset.deleteId)));
        });
    },

    deleteDevice(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الجهاز؟')) return;
        let custom = Storage.getCustomDevices();
        custom = custom.filter(d => d.id !== id);
        Storage.setCustomDevices(custom);
        State.removeFromCompare(id);
        this.showAlert('🗑️ تم الحذف بنجاح', 'success');
        this.renderList();
        this.refreshAll();
    },

    logout() {
        if (!confirm('هل تريد تسجيل الخروج؟')) return;
        Auth.logout();
        const form = document.getElementById('addDeviceForm');
        if (form) form.reset();
        Router.go('home');
    },

    showAlert(msg, type = 'success') {
        const box = document.getElementById('alertBox');
        if (!box) return;
        box.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
        setTimeout(() => { if (box) box.innerHTML = ''; }, 3000);
    },

    refreshAll() {
        App.initBrands();
        Home.renderStats();
        Home.renderDevicesGrid();
        Compare.renderBar();
    }
};

/* ============================================================
   18) App
   ============================================================ */

const App = {
    init() {
        console.log('🚀 İQmobil - بدء التشغيل...');

        Theme.init();
        State.loadCompare();
        State.loadFavorites();

        this.initCountrySelector();
        this.initBrands();
        this.initFooter();
        this.initMainSearch();
        this.initCompareBtn();
        this.initYear();
        this.updateFavCount();

        Filters.init();
        Filters.renderActiveTags();

        Router.init();

        const { page, params } = Router.parseHash();
        if (page && page !== 'home') {
            Router.handleHashChange();
        } else {
            Home.render();
        }

        Compare.renderBar();
        console.log(`✅ İQmobil - جاهز! (${Helpers.getAllDevices().length} جهاز)`);
    },

    initCountrySelector() {
        const select = document.getElementById('countrySelect');
        if (!select) return;
        const current = Storage.getCountry();

        select.innerHTML = Object.entries(COUNTRIES)
            .map(([code, c]) => `<option value="${code}" ${code === current ? 'selected' : ''}>${c.flag} ${c.name}</option>`)
            .join('');

        select.addEventListener('change', (e) => {
            Storage.setCountry(e.target.value);
            const page = State.currentPage;
            if (page === 'home') { Home.renderDevicesGrid(); Filters.renderActiveTags(); }
            else if (page === 'device' && State.currentDevice) Device.render();
            else if (page === 'compare') Compare.render();
            else if (page === 'favorites') Favorites.render();
        });
    },

    initBrands() {
        const bar = document.getElementById('brandsBar');
        if (!bar) return;

        const brands = [...new Set(Helpers.getAllDevices().map(d => d.brand))].sort();

        bar.innerHTML = `
            <li><a data-brand="all" class="${State.filters.brand === 'all' ? 'active' : ''}">الكل</a></li>
            ${brands.map(b => `
                <li><a data-brand="${Helpers.escapeHtml(b)}" class="${State.filters.brand === b ? 'active' : ''}">${Helpers.escapeHtml(b)}</a></li>
            `).join('')}
        `;

        bar.querySelectorAll('[data-brand]').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                Home.filterBrand(a.dataset.brand, a);
                if (State.currentPage !== 'home') Router.go('home');
            });
        });
    },

    initFooter() {
        const footer = document.getElementById('footerContent');
        if (!footer) return;

        const brands = [...new Set(Helpers.getAllDevices().map(d => d.brand))].sort().slice(0, 6);

        footer.innerHTML = `
            <div class="footer-col">
                <h4>عن İQmobil</h4>
                <ul>
                    <li><a>من نحن</a></li>
                    <li><a>اتصل بنا</a></li>
                    <li><a>سياسة الخصوصية</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>الأقسام</h4>
                <ul>
                    <li><a data-category="phone">الهواتف الذكية</a></li>
                    <li><a data-category="tablet">الأجهزة اللوحية</a></li>
                    <li><a data-category="watch">الساعات الذكية</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>الماركات</h4>
                <ul>
                    ${brands.map(b => `<li><a data-brand-link="${Helpers.escapeHtml(b)}">${Helpers.escapeHtml(b)}</a></li>`).join('')}
                </ul>
            </div>
            <div class="footer-col">
                <h4>تابعنا</h4>
                <ul>
                    <li><a>📘 فيسبوك</a></li>
                    <li><a>📷 إنستغرام</a></li>
                    <li><a>🐦 تويتر</a></li>
                </ul>
            </div>
        `;

        footer.querySelectorAll('[data-category]').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                Home.filterCategory(a.dataset.category);
                Router.go('home');
            });
        });

        footer.querySelectorAll('[data-brand-link]').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const brand = a.dataset.brandLink;
                Home.filterBrand(brand);
                document.querySelectorAll('#brandsBar a').forEach(x => {
                    x.classList.toggle('active', x.dataset.brand === brand);
                });
                Router.go('home');
            });
        });
    },

    initMainSearch() {
        const input = document.getElementById('mainSearch');
        if (!input) return;

        input.addEventListener('input', Helpers.debounce((e) => {
            const query = e.target.value;
            State.setSearch(query);
            State.visibleDevices = 12;
            if (State.currentPage !== 'home') Router.go('home');
            Home.renderDevicesGrid();
            const heroInput = document.getElementById('heroSearch');
            if (heroInput) heroInput.value = query;
        }, 300));
    },

    initCompareBtn() {
        const btn = document.getElementById('goCompareBtn');
        if (btn && !btn.dataset.bound) {
            btn.dataset.bound = 'true';
            btn.addEventListener('click', () => Compare.goToCompare());
        }
    },

    initYear() {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    },

    updateFavCount() {
        const countEl = document.getElementById('favCount');
        if (!countEl) return;
        State.loadFavorites();
        const count = State.favorites.length;
        if (count === 0) countEl.style.display = 'none';
        else { countEl.style.display = 'inline-flex'; countEl.textContent = count; }
    }
};

/* ============================================================
   التشغيل
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

window.IQmobil = {
    State, Storage, Helpers, Auth, Theme,
    Router, Home, Filters, Device, Compare,
    Favorites, Login, Admin, App, SVGGenerator
};