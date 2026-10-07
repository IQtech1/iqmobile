/* ============================================
   APP.JS — نقطة البداية
   İQmobil Project
   ============================================ */

const App = {
    // ===== التهيئة الرئيسية =====
    init() {
        console.log('🚀 İQmobil - بدء التشغيل...');

        // تحميل الحالة من التخزين
        State.loadCompare();

        // بناء الواجهة
        this.initCountrySelector();
        this.initBrands();
        this.initFooter();
        this.initMainSearch();
        this.initYear();

        // تهيئة الراوتر
        Router.init();

        // عرض الصفحة الرئيسية
        Home.render();

        // شريط المقارنة
        Compare.renderBar();

        console.log('✅ İQmobil - جاهز!');
    },

    // ===== قائمة الدول =====
    initCountrySelector() {
        const select = document.getElementById('countrySelect');
        if (!select) return;

        const current = Storage.getCountry();

        select.innerHTML = Object.entries(COUNTRIES)
            .map(([code, c]) => `
                <option value="${code}" ${code === current ? 'selected' : ''}>
                    ${c.flag} ${c.name}
                </option>
            `).join('');

        select.addEventListener('change', (e) => {
            Storage.setCountry(e.target.value);
            // إعادة عرض الصفحة الحالية
            const page = State.currentPage;
            if (page === 'home') Home.renderDevicesGrid();
            else if (page === 'device' && State.currentDevice) Device.render();
            else if (page === 'compare') Compare.render();
        });
    },

    // ===== شريط الماركات =====
    initBrands() {
        const bar = document.getElementById('brandsBar');
        if (!bar) return;

        const brands = [...new Set(Helpers.getAllDevices().map(d => d.brand))].sort();

        bar.innerHTML = `
            <li>
                <a data-brand="all" class="${State.filters.brand === 'all' ? 'active' : ''}">
                    الكل
                </a>
            </li>
            ${brands.map(b => `
                <li>
                    <a data-brand="${Helpers.escapeHtml(b)}" class="${State.filters.brand === b ? 'active' : ''}">
                        ${Helpers.escapeHtml(b)}
                    </a>
                </li>
            `).join('')}
        `;

        // ربط الأحداث
        bar.querySelectorAll('[data-brand]').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                Home.filterBrand(a.dataset.brand, a);

                // التبديل للصفحة الرئيسية إذا لم تكن ظاهرة
                if (State.currentPage !== 'home') {
                    Router.go('home');
                }
            });
        });
    },

    // ===== الفوتر =====
    initFooter() {
        const footer = document.getElementById('footerContent');
        if (!footer) return;

        const brands = [...new Set(Helpers.getAllDevices().map(d => d.brand))].sort().slice(0, 4);

        footer.innerHTML = `
            <div class="footer-col">
                <h4>عن İQmobil</h4>
                <ul>
                    <li><a href="#">من نحن</a></li>
                    <li><a href="#">اتصل بنا</a></li>
                    <li><a href="#">سياسة الخصوصية</a></li>
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
                    ${brands.map(b => `
                        <li><a data-brand-link="${Helpers.escapeHtml(b)}">${Helpers.escapeHtml(b)}</a></li>
                    `).join('')}
                </ul>
            </div>

            <div class="footer-col">
                <h4>تابعنا</h4>
                <ul>
                    <li><a href="#">📘 فيسبوك</a></li>
                    <li><a href="#">📷 إنستغرام</a></li>
                    <li><a href="#">🐦 تويتر</a></li>
                    <li><a href="#">📺 يوتيوب</a></li>
                </ul>
            </div>
        `;

        // ربط روابط الفئات
        footer.querySelectorAll('[data-category]').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                Home.filterCategory(a.dataset.category);
                Router.go('home');
            });
        });

        // ربط روابط الماركات
        footer.querySelectorAll('[data-brand-link]').forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const brand = a.dataset.brandLink;
                Home.filterBrand(brand);

                // تحديث شريط الماركات
                document.querySelectorAll('#brandsBar a').forEach(x => {
                    x.classList.toggle('active', x.dataset.brand === brand);
                });

                Router.go('home');
            });
        });
    },

    // ===== البحث الرئيسي =====
    initMainSearch() {
        const input = document.getElementById('mainSearch');
        if (!input) return;

        input.addEventListener('input', Helpers.debounce((e) => {
            const query = e.target.value;
            State.setSearch(query);

            // التبديل للصفحة الرئيسية
            if (State.currentPage !== 'home') {
                Router.go('home');
            }

            // تحديث العرض
            Home.renderDevicesGrid();

            // تحديث البحث في البانر إن وُجد
            const heroInput = document.getElementById('heroSearch');
            if (heroInput) heroInput.value = query;
        }, 300));
    },

    // ===== السنة الحالية =====
    initYear() {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
};

// ===== تشغيل التطبيق عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// ===== للتصحيح في الكونسول =====
window.IQmobil = {
    State,
    Storage,
    Helpers,
    Router,
    Home,
    Device,
    Compare,
    Admin,
    App
};