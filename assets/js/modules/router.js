/* ============================================
   ROUTER.JS — التنقل بين الصفحات
   İQmobil Project
   ============================================ */

const Router = {
    // ===== عرض صفحة معينة =====
    go(pageName) {
        // إخفاء كل الصفحات
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        // إظهار الصفحة المطلوبة
        const target = document.getElementById('page-' + pageName);
        if (target) {
            target.classList.add('active');
        }

        // تحديث القائمة العلوية
        this.updateNav(pageName);

        // تحديث الحالة
        State.currentPage = pageName;

        // التمرير للأعلى
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // استدعاء دوال التهيئة حسب الصفحة
        this.onPageLoad(pageName);
    },

    // ===== تحديث تفعيل القائمة =====
    updateNav(pageName) {
        document.querySelectorAll('#mainNav a').forEach(a => a.classList.remove('active'));
        const target = document.querySelector(`#mainNav a[data-nav="${pageName}"]`);
        if (target) target.classList.add('active');
    },

    // ===== عند تحميل صفحة =====
    onPageLoad(pageName) {
        switch (pageName) {
            case 'home':
                if (typeof Home !== 'undefined') Home.render();
                break;
            case 'compare':
                if (typeof Compare !== 'undefined') Compare.render();
                break;
            case 'admin':
                if (typeof Admin !== 'undefined') Admin.render();
                break;
            // صفحة device تُدار مباشرة من Device.open()
        }
    },

    // ===== التهيئة الأولية =====
    init() {
        // النقر على روابط التنقل
        document.querySelectorAll('[data-nav]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.go(el.dataset.nav);
            });
        });

        // النقر على روابط الفئات
        document.querySelectorAll('[data-category]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                Home.filterCategory(el.dataset.category);
                this.go('home');
            });
        });

        // زر المقارنة العائم
        document.querySelectorAll('[data-action="go-compare"]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                Compare.goToCompare();
            });
        });
    }
};