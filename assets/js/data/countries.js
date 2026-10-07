/* ============================================
   COUNTRIES.JS — بيانات الدول والعملات
   İQmobil Project
   ============================================ */

const COUNTRIES = {
    SY: { name: "سوريا", flag: "🇸🇾", currency: "ل.س", code: "SY" },
    SA: { name: "السعودية", flag: "🇸🇦", currency: "ر.س", code: "SA" },
    AE: { name: "الإمارات", flag: "🇦🇪", currency: "د.إ", code: "AE" },
    EG: { name: "مصر", flag: "🇪🇬", currency: "ج.م", code: "EG" },
    IQ: { name: "العراق", flag: "🇮🇶", currency: "د.ع", code: "IQ" },
    JO: { name: "الأردن", flag: "🇯🇴", currency: "د.أ", code: "JO" },
    MA: { name: "المغرب", flag: "🇲🇦", currency: "د.م", code: "MA" },
    DZ: { name: "الجزائر", flag: "🇩🇿", currency: "د.ج", code: "DZ" }
};

// الدولة الافتراضية
const DEFAULT_COUNTRY = "SA";