/* ============================================================
   İQmobil - app.js
   كل الجافاسكربت في ملف واحد
   ============================================================ */

/* ============================================================
   1) البيانات — Countries, Devices, Reviews
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

const DEVICES_DB = [
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
        id: 2, brand: "Apple", name: "iPhone 15 Pro Max", image: "📱",
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
        id: 3, brand: "Xiaomi", name: "Xiaomi 14 Pro", image: "📱",
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
        id: 4, brand: "Huawei", name: "Huawei P60 Pro", image: "📱",
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
        id: 5, brand: "OPPO", name: "OPPO Find X6 Pro", image: "📱",
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
        id: 6, brand: "Realme", name: "Realme GT 5 Pro", image: "📱",
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
        id: 7, brand: "Apple", name: "iPad Pro 12.9 M2", image: "📲",
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
        id: 8, brand: "Samsung", name: "Galaxy Watch 6 Classic", image: "⌚",
        category: "watch", releaseDate: "2023-08-11", badge: "",
        rating: 4.7, reviewsCount: 89,
        specs: {
            screen: "1.47 بوصة - Super AMOLED", resolution: "480 × 480 بكسل",
            processor: "Exynos W930", ram: "2 GB", storage: "16 GB",
            camera: "لا يوجد", frontCamera: "-", battery: "425 mAh",
            charging: "لاسلكي", os: "Wear OS 4", weight: "59 غرام"
        },
        prices: { SY: 3200000, SA: 1299, AE: 1249, EG: 16500, IQ: 420000, JO: 240, MA: 3400, DZ: 45000 }
    }
];

const REVIEWS_DB = {
    1: [
        { user: "أحمد م.", rating: 5, text: "هاتف ممتاز، الكاميرا خارقة! أنصح به بشدة.", date: "2024-02-15" },
        { user: "سارة ع.", rating: 5, text: "الأفضل في السوق حالياً، يستحق السعر.", date: "2024-02-10" },
        { user: "خالد ر.", rating: 4, text: "قوي جداً لكن حجمه كبير بعض الشيء.", date: "2024-02-05" }
    ],
    2: [
        { user: "محمد س.", rating: 5, text: "آيفون بمعنى الكلمة، أداء لا يوصف.", date: "2024-02-12" },
        { user: "نور ح.", rating: 5, text: "الكاميرا رهيبة والبطارية ممتازة.", date: "2024-02-08" }
    ],
    3: [{ user: "علي ك.", rating: 5, text: "أفضل قيمة مقابل السعر في فئته.", date: "2024-02-14" }],
    4: [{ user: "لينا ف.", rating: 4, text: "كاميرا رائعة لكن بدون خدمات جوجل.", date: "2024-02-11" }],
    5: [{ user: "يوسف ط.", rating: 5, text: "شاشة مذهلة وشحن سريع جداً.", date: "2024-02-13" }],
    6: [{ user: "هدى ب.", rating: 5, text: "سعر لا يُقاوم مقابل هذه المواصفات!", date: "2024-02-16" }]
};

/* ============================================================
   2) Storage — إدارة localStorage
   ============================================================ */

const Storage = {
    KEYS: {
        COUNTRY: 'iqmobil_country',
        COMPARE: 'iqmobil_compare',
        CUSTOM_DEVICES: 'iqmobil_custom_devices',
        REVIEWS_PREFIX: 'iqmobil_reviews_',
        SESSION: 'iqmobil_session',
        ATTEMPTS: 'iqmobil_login_attempts'
    },

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

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Storage.set error:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    },

    // Country
    getCountry() { return this.get(this.KEYS.COUNTRY, DEFAULT_COUNTRY); },
    setCountry(code) { this.set(this.KEYS.COUNTRY, code); },

    // Compare
    getCompare() { return this.get(this.KEYS.COMPARE, []); },
    setCompare(list) { this.set(this.KEYS.COMPARE, list); },

    // Custom Devices
    getCustomDevices() { return this.get(this.KEYS.CUSTOM_DEVICES, []); },
    setCustomDevices(devices) { this.set(this.KEYS.CUSTOM_DEVICES, devices); },

    // Device Reviews
    getDeviceReviews(deviceId) { return this.get(this.KEYS.REVIEWS_PREFIX + deviceId, []); },
    setDeviceReviews(deviceId, reviews) { this.set(this.KEYS.REVIEWS_PREFIX + deviceId, reviews); }
};

/* ============================================================
   3) Helpers — دوال مساعدة
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
        } catch (e) {
            return dateString;
        }
    },

    today() {
        return new Date().toISOString().split('T')[0];
    },

    generateId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    },

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
    }
};

/* ============================================================
   4) State — الحالة العامة
   ============================================================ */

const State = {
    currentPage: 'home',
    filters: { category: 'all', brand: 'all', search: '' },
    currentDevice: null,
    compareList: [],

    setCategory(cat) { this.filters.category = cat; },
    setBrand(brand) { this.filters.brand = brand; },
    setSearch(query) { this.filters.search = query; },

    loadCompare() {
        this.compareList = Storage.getCompare();
        return this.compareList;
    },

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
    }
};

/* ============================================================
   5) Auth — المصادقة
   ============================================================ */

const Auth = {
    // كلمة المرور: iqmobil2026
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

    verifyPassword(input) {
        return this.encode(input.trim()) === this.CONFIG.passwordHash;
    },

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
        if (Date.now() > session.expiresAt) {
            this.logout();
            return false;
        }
        return true;
    },

    logout() {
        Storage.remove(this.CONFIG.sessionKey);
    },

    getAttempts() {
        return Storage.get(this.CONFIG.attemptsKey, { count: 0, lockedUntil: 0 });
    },

    setAttempts(data) {
        Storage.set(this.CONFIG.attemptsKey, data);
    },

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

    resetAttempts() {
        this.setAttempts({ count: 0, lockedUntil: 0 });
    },

    getRemainingAttempts() {
        const attempts = this.getAttempts();
        return Math.max(0, this.CONFIG.maxAttempts - (attempts.count || 0));
    }
};

/* ============================================================
   6) Router — التنقل بين الصفحات
   ============================================================ */

const Router = {
    protectedPages: ['admin'],

    go(pageName) {
        // حماية
        if (this.protectedPages.includes(pageName) && !Auth.isLoggedIn()) {
            console.warn('🔒 صفحة محمية');
            this.showPage('login');
            if (typeof Login !== 'undefined') Login.render();
            return;
        }

        this.showPage(pageName);
        this.onPageLoad(pageName);
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

    onPageLoad(pageName) {
        switch (pageName) {
            case 'home': Home.render(); break;
            case 'compare': Compare.render(); break;
            case 'admin': Admin.render(); break;
            case 'login': Login.render(); break;
        }
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
    }
};

/* ============================================================
   7) Home — الصفحة الرئيسية
   ============================================================ */

const Home = {
    render() {
        this.renderStats();
        this.renderSection();
        this.renderDevicesGrid();
        this.bindEvents();
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
            <div class="stat-card"><span class="number">${totalReviews}</span><span class="label">مراجعة وتقييم</span></div>
            <div class="stat-card"><span class="number">يومياً</span><span class="label">تحديث الأسعار</span></div>
        `;
    },

    renderSection() {
        const title = document.getElementById('sectionTitle');
        if (!title) return;
        const titles = {
            all: 'أحدث الأجهزة',
            phone: 'الهواتف الذكية',
            tablet: 'الأجهزة اللوحية',
            watch: 'الساعات الذكية',
            laptop: 'اللابتوب'
        };
        title.textContent = titles[State.filters.category] || 'أحدث الأجهزة';
    },

    renderDevicesGrid() {
        const grid = document.getElementById('devicesGrid');
        if (!grid) return;

        const country = Storage.getCountry();
        let devices = Helpers.getAllDevices();

        if (State.filters.category !== 'all') devices = devices.filter(d => d.category === State.filters.category);
        if (State.filters.brand !== 'all') devices = devices.filter(d => d.brand === State.filters.brand);
        if (State.filters.search.trim()) devices = devices.filter(d => Helpers.matchesSearch(d, State.filters.search));

        if (devices.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <div class="icon">🔍</div>
                    <h3>لا توجد نتائج مطابقة</h3>
                    <p>جرّب تعديل الفلاتر أو كلمة البحث</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = devices.map(d => this.renderCard(d, country)).join('');
        this.bindCardEvents();
    },

    renderCard(device, country) {
        const price = device.prices[country] || device.prices.SY || 0;
        const checked = State.compareList.includes(device.id) ? 'checked' : '';
        return `
            <div class="device-card" data-device-id="${device.id}">
                <div class="device-image">
                    ${device.image}
                    ${device.badge ? `<span class="device-badge">${Helpers.escapeHtml(device.badge)}</span>` : ''}
                    <input type="checkbox" class="compare-checkbox" ${checked}
                           data-compare-id="${device.id}" aria-label="أضف للمقارنة">
                </div>
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
                if (e.target.classList.contains('compare-checkbox')) return;
                Device.open(parseInt(card.dataset.deviceId));
            });
        });

        document.querySelectorAll('.compare-checkbox').forEach(cb => {
            cb.addEventListener('click', (e) => {
                e.stopPropagation();
                Compare.toggle(parseInt(cb.dataset.compareId), cb);
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
                this.renderDevicesGrid();
            }, 300));
        }
    },

    performHeroSearch() {
        const input = document.getElementById('heroSearch');
        if (!input) return;
        State.setSearch(input.value);
        const mainSearch = document.getElementById('mainSearch');
        if (mainSearch) mainSearch.value = input.value;
        this.renderDevicesGrid();
        const grid = document.getElementById('devicesGrid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    },

    filterCategory(cat) {
        State.setCategory(cat);
        this.renderSection();
        this.renderDevicesGrid();
    },

    filterBrand(brand, el) {
        State.setBrand(brand);
        document.querySelectorAll('#brandsBar a').forEach(a => a.classList.remove('active'));
        if (el) el.classList.add('active');
        else {
            const target = [...document.querySelectorAll('#brandsBar a')].find(a => a.dataset.brand === brand);
            if (target) target.classList.add('active');
        }
        this.renderDevicesGrid();
    }
};

/* ============================================================
   8) Device — تفاصيل الجهاز
   ============================================================ */

const Device = {
    open(id) {
        const device = Helpers.getDeviceById(id);
        if (!device) { alert('الجهاز غير موجود'); return; }
        State.currentDevice = device;
        this.render();
        Router.go('device');
    },

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

        container.innerHTML = `
            <div class="device-detail">
                <div class="device-header">
                    <div class="device-hero-image">${device.image}</div>
                    <div class="device-header-info">
                        <span class="brand-tag">${Helpers.escapeHtml(device.brand)}</span>
                        <h1>${Helpers.escapeHtml(device.name)}</h1>
                        <div class="rating-big">
                            ⭐ ${device.rating}
                            <span style="color: #5f6368; font-size: 14px;">(${device.reviewsCount} مراجعة)</span>
                        </div>
                        <div class="price-big">${Helpers.formatPrice(price, country)}</div>
                        <p style="color: #5f6368;">📅 تاريخ الإصدار: ${Helpers.formatDate(device.releaseDate)}</p>
                        <div class="device-actions">
                            <button class="btn-primary" id="addToCompareBtn">⚖️ أضف للمقارنة</button>
                            <button class="btn-primary" style="background: #34a853;" id="buyBtn">🛒 شراء</button>
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

        const buyBtn = document.getElementById('buyBtn');
        if (buyBtn) buyBtn.addEventListener('click', () => alert('🛒 ميزة الشراء ستُضاف قريباً!'));

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
                <div style="text-align: center; padding: 30px; color: #5f6368;">
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
        reviews.unshift({
            user: user,
            rating: rating,
            text: text,
            date: Helpers.today()
        });
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
   9) Compare — المقارنة
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
                                    <span class="emoji">${d.image}</span>
                                    <div>${Helpers.escapeHtml(d.brand)}</div>
                                    <div style="font-size: 14px; color: #5f6368; margin-top: 5px;">
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
                            ${devices.map(d => `<td style="font-weight: 700; color: #1a73e8;">${Helpers.formatPrice(d.prices[country] || d.prices.SY || 0, country)}</td>`).join('')}
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
   10) Login — تسجيل الدخول
   ============================================================ */

const Login = {
    render() {
        const container = document.getElementById('page-login');
        if (!container) return;

        if (Auth.isLoggedIn()) {
            Router.go('admin');
            return;
        }

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
                            <input type="password" id="loginPassword"
                                   placeholder="أدخل كلمة المرور..."
                                   autocomplete="current-password" required>
                        </div>
                        <button type="submit" class="btn-primary login-btn">🔓 دخول</button>
                        <div class="login-info" id="loginInfo"></div>
                    </form>

                    <button class="login-back" data-nav="home">← العودة للرئيسية</button>
                </div>
            </div>
        `;

        document.getElementById('loginForm').addEventListener('submit', (e) => this.submit(e));
        setTimeout(() => {
            const input = document.getElementById('loginPassword');
            if (input) input.focus();
        }, 100);

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

        if (!password) {
            this.showAlert('⚠️ أدخل كلمة المرور', 'error');
            return;
        }

        if (Auth.verifyPassword(password)) {
            Auth.createSession();
            Auth.resetAttempts();
            this.showAlert('✅ تم الدخول بنجاح!', 'success');
            setTimeout(() => Router.go('admin'), 500);
        } else {
            const attempts = Auth.registerFailedAttempt();
            if (attempts.lockedUntil > Date.now()) {
                this.showAlert('🚫 تم حظرك لمدة 15 دقيقة بسبب 5 محاولات خاطئة', 'error');
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
        if (type === 'success') {
            setTimeout(() => { if (box) box.innerHTML = ''; }, 2000);
        }
    },

    checkLockStatus() {
        const info = document.getElementById('loginInfo');
        if (!info) return;

        if (Auth.isLocked()) {
            const mins = Auth.getRemainingLockTime();
            info.innerHTML = `<span style="color: #ea4335;">🚫 الحساب محظور مؤقتاً. حاول بعد ${mins} دقيقة.</span>`;
        } else {
            const remaining = Auth.getRemainingAttempts();
            if (remaining < Auth.CONFIG.maxAttempts) {
                info.innerHTML = `<span style="color: #fbbc04;">⚠️ متبقي ${remaining} محاولات</span>`;
            }
        }
    }
};

/* ============================================================
   11) Admin — لوحة التحكم
   ============================================================ */

const Admin = {
    render() {
        if (!Auth.isLoggedIn()) {
            Router.go('login');
            return;
        }

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
                            <div class="form-group"><label>الإيموجي</label><input type="text" name="image" value="📱" maxlength="4"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>الشاشة</label><input type="text" name="screen" placeholder="6.8 بوصة AMOLED" maxlength="60"></div>
                            <div class="form-group"><label>المعالج</label><input type="text" name="processor" placeholder="Snapdragon 8 Gen 3" maxlength="60"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>الذاكرة العشوائية</label><input type="text" name="ram" placeholder="12 GB" maxlength="30"></div>
                            <div class="form-group"><label>التخزين</label><input type="text" name="storage" placeholder="256 GB" maxlength="60"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>الكاميرا الخلفية</label><input type="text" name="camera" placeholder="200 MP" maxlength="80"></div>
                            <div class="form-group"><label>البطارية</label><input type="text" name="battery" placeholder="5000 mAh" maxlength="40"></div>
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
            image: data.get('image') || '📱',
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
                os: '-',
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
        form.image.value = '📱';

        this.renderList();
        this.refreshAll();
    },

    renderList() {
        const list = document.getElementById('adminDeviceList');
        if (!list) return;
        const custom = Storage.getCustomDevices();

        if (custom.length === 0) {
            list.innerHTML = `<p style="color: #5f6368; padding: 20px; text-align: center;">لا توجد أجهزة مضافة بعد</p>`;
            return;
        }

        list.innerHTML = custom.map(d => `
            <div class="admin-device-item">
                <div>
                    <strong>${d.image} ${Helpers.escapeHtml(d.brand)} ${Helpers.escapeHtml(d.name)}</strong>
                    <div style="font-size: 13px; color: #5f6368; margin-top: 5px;">
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
   12) App — نقطة البداية
   ============================================================ */

const App = {
    init() {
        console.log('🚀 İQmobil - بدء التشغيل...');

        State.loadCompare();
        this.initCountrySelector();
        this.initBrands();
        this.initFooter();
        this.initMainSearch();
        this.initCompareBtn();
        this.initYear();

        Router.init();
        Home.render();
        Compare.renderBar();
        this.checkSecretAccess();

        console.log('✅ İQmobil - جاهز!');
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
            if (page === 'home') Home.renderDevicesGrid();
            else if (page === 'device' && State.currentDevice) Device.render();
            else if (page === 'compare') Compare.render();
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

        const brands = [...new Set(Helpers.getAllDevices().map(d => d.brand))].sort().slice(0, 4);

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
                    <li><a data-category="laptop">اللابتوب</a></li>
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
                    <li><a>📺 يوتيوب</a></li>
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
            if (State.currentPage !== 'home') Router.go('home');
            Home.renderDevicesGrid();
            const heroInput = document.getElementById('heroSearch');
            if (heroInput) heroInput.value = query;
        }, 300));
    },

    initCompareBtn() {
        const btn = document.getElementById('goCompareBtn');
        if (btn) btn.addEventListener('click', () => Compare.goToCompare());
    },

    initYear() {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    },

    checkSecretAccess() {
        const hash = window.location.hash.toLowerCase();
        if (hash === '#admin' || hash === '#login') {
            console.log('🔐 محاولة وصول للوحة التحكم');
            Router.go('login');
            history.replaceState(null, '', window.location.pathname);
        }
    }
};

/* ============================================================
   التشغيل
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// للتصحيح في Console
window.IQmobil = { State, Storage, Helpers, Auth, Router, Home, Device, Compare, Login, Admin, App };