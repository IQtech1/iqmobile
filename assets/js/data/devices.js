/* ============================================
   DEVICES.JS — قاعدة بيانات الأجهزة
   İQmobil Project
   ============================================ */

const DEVICES_DB = [
    {
        id: 1,
        brand: "Samsung",
        name: "Galaxy S24 Ultra",
        image: "📱",
        category: "phone",
        releaseDate: "2024-01-17",
        badge: "جديد",
        rating: 4.8,
        reviewsCount: 245,
        specs: {
            screen: "6.8 بوصة - AMOLED 120Hz",
            resolution: "1440 × 3120 بكسل",
            processor: "Snapdragon 8 Gen 3",
            ram: "12 GB",
            storage: "256 GB / 512 GB / 1 TB",
            camera: "200 MP + 50 MP + 12 MP + 10 MP",
            frontCamera: "12 MP",
            battery: "5000 mAh",
            charging: "45W سلكي / 15W لاسلكي",
            os: "Android 14",
            weight: "232 غرام"
        },
        prices: {
            SY: 12500000, SA: 4850, AE: 4750, EG: 62000,
            IQ: 1650000, JO: 900, MA: 13000, DZ: 175000
        }
    },
    {
        id: 2,
        brand: "Apple",
        name: "iPhone 15 Pro Max",
        image: "📱",
        category: "phone",
        releaseDate: "2023-09-22",
        badge: "الأكثر مبيعاً",
        rating: 4.9,
        reviewsCount: 312,
        specs: {
            screen: "6.7 بوصة - Super Retina XDR",
            resolution: "1290 × 2796 بكسل",
            processor: "Apple A17 Pro",
            ram: "8 GB",
            storage: "256 GB / 512 GB / 1 TB",
            camera: "48 MP + 12 MP + 12 MP",
            frontCamera: "12 MP",
            battery: "4441 mAh",
            charging: "27W سلكي / 15W MagSafe",
            os: "iOS 17",
            weight: "221 غرام"
        },
        prices: {
            SY: 11800000, SA: 4599, AE: 4499, EG: 58000,
            IQ: 1550000, JO: 850, MA: 12500, DZ: 165000
        }
    },
    {
        id: 3,
        brand: "Xiaomi",
        name: "Xiaomi 14 Pro",
        image: "📱",
        category: "phone",
        releaseDate: "2023-10-26",
        badge: "",
        rating: 4.7,
        reviewsCount: 189,
        specs: {
            screen: "6.73 بوصة - LTPO AMOLED",
            resolution: "1440 × 3200 بكسل",
            processor: "Snapdragon 8 Gen 3",
            ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB",
            camera: "50 MP + 50 MP + 50 MP",
            frontCamera: "32 MP",
            battery: "4880 mAh",
            charging: "120W سلكي / 50W لاسلكي",
            os: "Android 14 - HyperOS",
            weight: "223 غرام"
        },
        prices: {
            SY: 8500000, SA: 3299, AE: 3199, EG: 41000,
            IQ: 1100000, JO: 620, MA: 8900, DZ: 118000
        }
    },
    {
        id: 4,
        brand: "Huawei",
        name: "Huawei P60 Pro",
        image: "📱",
        category: "phone",
        releaseDate: "2023-03-23",
        badge: "",
        rating: 4.6,
        reviewsCount: 156,
        specs: {
            screen: "6.67 بوصة - OLED 120Hz",
            resolution: "1220 × 2700 بكسل",
            processor: "Snapdragon 8+ Gen 1",
            ram: "8 GB / 12 GB",
            storage: "256 GB / 512 GB",
            camera: "48 MP + 48 MP + 13 MP",
            frontCamera: "13 MP",
            battery: "4815 mAh",
            charging: "88W سلكي / 50W لاسلكي",
            os: "HarmonyOS 3.1",
            weight: "200 غرام"
        },
        prices: {
            SY: 9200000, SA: 3599, AE: 3499, EG: 45000,
            IQ: 1200000, JO: 680, MA: 9500, DZ: 128000
        }
    },
    {
        id: 5,
        brand: "OPPO",
        name: "OPPO Find X6 Pro",
        image: "📱",
        category: "phone",
        releaseDate: "2023-03-21",
        badge: "",
        rating: 4.5,
        reviewsCount: 132,
        specs: {
            screen: "6.82 بوصة - LTPO AMOLED",
            resolution: "1440 × 3168 بكسل",
            processor: "Snapdragon 8 Gen 2",
            ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB",
            camera: "50 MP + 50 MP + 50 MP",
            frontCamera: "32 MP",
            battery: "5000 mAh",
            charging: "100W سلكي / 50W لاسلكي",
            os: "Android 13 - ColorOS",
            weight: "216 غرام"
        },
        prices: {
            SY: 8800000, SA: 3399, AE: 3299, EG: 42000,
            IQ: 1150000, JO: 640, MA: 9100, DZ: 122000
        }
    },
    {
        id: 6,
        brand: "Realme",
        name: "Realme GT 5 Pro",
        image: "📱",
        category: "phone",
        releaseDate: "2023-12-07",
        badge: "أفضل قيمة",
        rating: 4.6,
        reviewsCount: 98,
        specs: {
            screen: "6.78 بوصة - AMOLED",
            resolution: "1264 × 2780 بكسل",
            processor: "Snapdragon 8 Gen 3",
            ram: "12 GB / 16 GB",
            storage: "256 GB / 512 GB / 1 TB",
            camera: "50 MP + 8 MP + 50 MP",
            frontCamera: "32 MP",
            battery: "5400 mAh",
            charging: "100W سلكي",
            os: "Android 14 - Realme UI",
            weight: "218 غرام"
        },
        prices: {
            SY: 6200000, SA: 2499, AE: 2399, EG: 29000,
            IQ: 820000, JO: 460, MA: 6500, DZ: 88000
        }
    },
    {
        id: 7,
        brand: "Apple",
        name: "iPad Pro 12.9 M2",
        image: "📲",
        category: "tablet",
        releaseDate: "2022-10-26",
        badge: "",
        rating: 4.9,
        reviewsCount: 178,
        specs: {
            screen: "12.9 بوصة - Liquid Retina XDR",
            resolution: "2048 × 2732 بكسل",
            processor: "Apple M2",
            ram: "8 GB / 16 GB",
            storage: "128 GB إلى 2 TB",
            camera: "12 MP + 10 MP",
            frontCamera: "12 MP",
            battery: "10758 mAh",
            charging: "18W سلكي",
            os: "iPadOS 16",
            weight: "682 غرام"
        },
        prices: {
            SY: 10500000, SA: 4299, AE: 4199, EG: 55000,
            IQ: 1420000, JO: 800, MA: 11500, DZ: 152000
        }
    },
    {
        id: 8,
        brand: "Samsung",
        name: "Galaxy Watch 6 Classic",
        image: "⌚",
        category: "watch",
        releaseDate: "2023-08-11",
        badge: "",
        rating: 4.7,
        reviewsCount: 89,
        specs: {
            screen: "1.47 بوصة - Super AMOLED",
            resolution: "480 × 480 بكسل",
            processor: "Exynos W930",
            ram: "2 GB",
            storage: "16 GB",
            camera: "لا يوجد",
            frontCamera: "-",
            battery: "425 mAh",
            charging: "لاسلكي",
            os: "Wear OS 4",
            weight: "59 غرام"
        },
        prices: {
            SY: 3200000, SA: 1299, AE: 1249, EG: 16500,
            IQ: 420000, JO: 240, MA: 3400, DZ: 45000
        }
    }
];