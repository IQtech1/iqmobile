/* ============================================
   HOME.JS — منطق الصفحة الرئيسية
   İQmobil Project
   ============================================ */

const Home = {
    // ===== عرض الصفحة الرئيسية =====
    render() {
        this.renderHero();
        this.renderStats();
        this.renderSection();
        this.renderDevicesGrid();
    },

    // ===== البانر الرئيسي =====
    renderHero() {
        const container = document.getElementById('page-home');
        if (!container || container.dataset.heroRendered === 'true') return;

        container.innerHTML = `
            <section class="hero">
                <h1>مرحباً بك في İQmobil</h1>
                <p>دليلك الشامل لمقارنة أسعار ومواصفات الأجهزة الذكية</p>
                <div class="hero-search">
                    <input type="text" id="heroSearch" placeholder="ابحث عن هاتف، جهاز لوحي، أو ساعة ذكية...">
                    <button type="button" id="heroSearchBtn">ابحث الآن</button>
                </div>
            </section>

            <div class="stats" id="statsContainer"></div>

            <section class="section">
                <h2 class="section-title" id="sectionTitle">أحدث الأجهزة</h2>
                <div class="devices-grid" id="devicesGrid"></div>
            </section>

            <section class="compare-section">
                <h2>⚖️ قارن بين الأجهزة</h2>
                <p>اختر جهازين أو أكثر من الأعلى وقارن بين مواصفاتهم وأسعارهم بالتفصيل</p>
                <button class="compare-btn" data-nav="compare">ابدأ المقارنة الآن</button>
            </section>
        `;

        container.dataset.heroRendered = 'true';

        // ربط الأزرار
        document.getElementById('heroSearchBtn').addEventListener('click', () => this.performHeroSearch());
        document.getElementById('heroSearch').addEventListener('input', 
            Helpers.debounce((e) => {
                State.setSearch(e.target.value);
                this.renderDevicesGrid();
            }, 300)
        );

        // إعادة ربط التنقل
        Router.init();
    },

    // ===== الإحصائيات =====
    renderStats() {
        const container = document.getElementById('statsContainer');
        if (!container) return;

        const totalDevices = Helpers.getAllDevices().length;
        const totalReviews = Helpers.getAllDevices().reduce((s, d) => s + (d.reviewsCount || 0), 0);
        const totalCountries = Object.keys(COUNTRIES).length;

        container.innerHTML = `
            <div class="stat-card">
                <span class="number">${totalDevices}</span>
                <span class="label">جهاز في قاعدة البيانات</span>
            </div>
            <div class="stat-card">
                <span class="number">${totalCountries}</span>
                <span class="label">دول عربية</span>
            </div>
            <div class="stat-card">
                <span class="number">${totalReviews}</span>
                <span class="label">مراجعة وتقييم</span>
            </div>
            <div class="stat-card">
                <span class="number">يومياً</span>
                <span class="label">تحديث الأسعار</span>
            </div>
        `;
    },

    // ===== عنوان القسم =====
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

    // ===== شبكة الأجهزة =====
    renderDevicesGrid() {
        const grid = document.getElementById('devicesGrid');
        if (!grid) return;

        const country = Storage.getCountry();
        let devices = Helpers.getAllDevices();

        // فلترة الفئة
        if (State.filters.category !== 'all') {
            devices = devices.filter(d => d.category === State.filters.category);
        }

        // فلترة الماركة
        if (State.filters.brand !== 'all') {
            devices = devices.filter(d => d.brand === State.filters.brand);
        }

        // البحث
        if (State.filters.search.trim()) {
            devices = devices.filter(d => Helpers.matchesSearch(d, State.filters.search));
        }

        // لا نتائج
        if (devices.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #5f6368;">
                    <div style="font-size: 48px; margin-bottom: 15px;">🔍</div>
                    <h3 style="margin-bottom: 10px;">لا توجد نتائج مطابقة</h3>
                    <p>جرّب تعديل الفلاتر أو كلمة البحث</p>
                </div>
            `;
            return;
        }

        // عرض البطاقات
        grid.innerHTML = devices.map(d => this.renderDeviceCard(d, country)).join('');

        // ربط الأحداث
        this.bindCardEvents();
    },

    // ===== بطاقة جهاز =====
    renderDeviceCard(device, country) {
        const price = device.prices[country] || device.prices.SY || 0;
        const checked = State.compareList.includes(device.id) ? 'checked' : '';

        return `
            <div class="device-card" data-device-id="${device.id}">
                <div class="device-image">
                    ${device.image}
                    ${device.badge ? `<span class="device-badge">${Helpers.escapeHtml(device.badge)}</span>` : ''}
                    <input type="checkbox" class="compare-checkbox" ${checked}
                           data-compare-id="${device.id}"
                           aria-label="أضف للمقارنة">
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

    // ===== ربط الأحداث بالبطاقات =====
    bindCardEvents() {
        // فتح تفاصيل الجهاز
        document.querySelectorAll('.device-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('compare-checkbox')) return;
                const id = card.dataset.deviceId;
                Device.open(parseInt(id));
            });
        });

        // مربع الاختيار للمقارنة
        document.querySelectorAll('.compare-checkbox').forEach(cb => {
            cb.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(cb.dataset.compareId);
                Compare.toggle(id, cb);
            });
        });
    },

    // ===== البحث من البانر =====
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

    // ===== فلترة حسب الفئة =====
    filterCategory(cat) {
        State.setCategory(cat);
        this.renderSection();
        this.renderDevicesGrid();
    },

    // ===== فلترة حسب الماركة =====
    filterBrand(brand, el) {
        State.setBrand(brand);

        document.querySelectorAll('#brandsBar a').forEach(a => a.classList.remove('active'));
        if (el) el.classList.add('active');

        this.renderDevicesGrid();
    },

    // ===== البحث من الشريط العلوي =====
    performMainSearch(query) {
        State.setSearch(query);
        this.renderDevicesGrid();
    }
};