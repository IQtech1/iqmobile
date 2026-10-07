/* ============================================
   HELPERS.JS — دوال مساعدة عامة
   İQmobil Project
   ============================================ */

const Helpers = {
    // ===== تنسيق السعر =====
    formatPrice(amount, countryCode) {
        const country = COUNTRIES[countryCode];
        if (!country) return amount + " USD";
        if (!amount && amount !== 0) return "-";
        
        const formatted = new Intl.NumberFormat('ar-EG', {
            maximumFractionDigits: 0
        }).format(amount);
        
        return `${formatted} ${country.currency}`;
    },

    // ===== تنسيق التاريخ =====
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('ar-EG', options);
        } catch (e) {
            return dateString;
        }
    },

    // ===== تاريخ اليوم =====
    today() {
        return new Date().toISOString().split('T')[0];
    },

    // ===== إنشاء ID فريد =====
    generateId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    },

    // ===== حماية النص من XSS =====
    escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },

    // ===== debounce (تأخير تنفيذ الدالة) =====
    debounce(fn, delay = 300) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    // ===== رسم النجوم =====
    renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - full - half;
        return '⭐'.repeat(full) + (half ? '✨' : '') + '☆'.repeat(empty);
    },

    // ===== البحث في جهاز =====
    matchesSearch(device, query) {
        if (!query || query.trim() === '') return true;
        const q = query.toLowerCase().trim();
        return (
            device.name.toLowerCase().includes(q) ||
            device.brand.toLowerCase().includes(q) ||
            (device.specs.processor && device.specs.processor.toLowerCase().includes(q))
        );
    },

    // ===== الحصول على الأجهزة الكلية =====
    getAllDevices() {
        const custom = Storage.getCustomDevices();
        return [...DEVICES_DB, ...custom];
    },

    // ===== الحصول على جهاز بـ ID =====
    getDeviceById(id) {
        return this.getAllDevices().find(d => d.id === parseInt(id));
    },

    // ===== الحصول على مراجعات جهاز =====
    getReviews(deviceId) {
        const defaultReviews = REVIEWS_DB[deviceId] || [];
        const customReviews = Storage.getDeviceReviews(deviceId);
        return [...defaultReviews, ...customReviews];
    }
};