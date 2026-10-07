/* ============================================
   STATE.JS — الحالة العامة للتطبيق
   İQmobil Project
   ============================================ */

const State = {
    // ===== الصفحة الحالية =====
    currentPage: 'home',

    // ===== الفلاتر =====
    filters: {
        category: 'all',
        brand: 'all',
        search: ''
    },

    // ===== الجهاز المعروض حالياً =====
    currentDevice: null,

    // ===== قائمة المقارنة =====
    compareList: [],

    // ===== إعادة تعيين الفلاتر =====
    resetFilters() {
        this.filters = {
            category: 'all',
            brand: 'all',
            search: ''
        };
    },

    // ===== تعيين الفئة =====
    setCategory(cat) {
        this.filters.category = cat;
    },

    // ===== تعيين الماركة =====
    setBrand(brand) {
        this.filters.brand = brand;
    },

    // ===== تعيين البحث =====
    setSearch(query) {
        this.filters.search = query;
    },

    // ===== تحميل قائمة المقارنة من التخزين =====
    loadCompare() {
        this.compareList = Storage.getCompare();
        return this.compareList;
    },

    // ===== إضافة جهاز للمقارنة =====
    addToCompare(id) {
        if (this.compareList.includes(id)) return { success: false, message: 'الجهاز مضاف بالفعل' };
        if (this.compareList.length >= 3) return { success: false, message: 'يمكنك مقارنة 3 أجهزة كحد أقصى' };
        
        this.compareList.push(id);
        Storage.setCompare(this.compareList);
        return { success: true };
    },

    // ===== إزالة جهاز من المقارنة =====
    removeFromCompare(id) {
        this.compareList = this.compareList.filter(x => x !== id);
        Storage.setCompare(this.compareList);
    },

    // ===== تفريغ قائمة المقارنة =====
    clearCompare() {
        this.compareList = [];
        Storage.setCompare([]);
    }
};