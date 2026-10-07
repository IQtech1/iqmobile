/* ============================================
   STORAGE.JS — إدارة localStorage
   İQmobil Project
   ============================================ */

const Storage = {
    // ===== المفاتيح =====
    KEYS: {
        COUNTRY: 'iqmobil_country',
        COMPARE: 'iqmobil_compare',
        CUSTOM_DEVICES: 'iqmobil_custom_devices',
        REVIEWS_PREFIX: 'iqmobil_reviews_'
    },

    // ===== قراءة عامة =====
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            if (value === null) return defaultValue;
            return JSON.parse(value);
        } catch (e) {
            console.warn('Storage.get error:', e);
            return defaultValue;
        }
    },

    // ===== كتابة عامة =====
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Storage.set error:', e);
            return false;
        }
    },

    // ===== حذف =====
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    },

    // ===== الدولة =====
    getCountry() {
        return this.get(this.KEYS.COUNTRY, DEFAULT_COUNTRY);
    },

    setCountry(code) {
        this.set(this.KEYS.COUNTRY, code);
    },

    // ===== قائمة المقارنة =====
    getCompare() {
        return this.get(this.KEYS.COMPARE, []);
    },

    setCompare(list) {
        this.set(this.KEYS.COMPARE, list);
    },

    // ===== الأجهزة المخصصة =====
    getCustomDevices() {
        return this.get(this.KEYS.CUSTOM_DEVICES, []);
    },

    setCustomDevices(devices) {
        this.set(this.KEYS.CUSTOM_DEVICES, devices);
    },

    // ===== مراجعات جهاز محدد =====
    getDeviceReviews(deviceId) {
        return this.get(this.KEYS.REVIEWS_PREFIX + deviceId, []);
    },

    setDeviceReviews(deviceId, reviews) {
        this.set(this.KEYS.REVIEWS_PREFIX + deviceId, reviews);
    }
};