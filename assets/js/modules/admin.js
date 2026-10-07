/* ============================================
   ADMIN.JS — لوحة التحكم
   İQmobil Project
   ============================================ */

const Admin = {
    // ===== عرض الصفحة =====
    render() {
        const container = document.getElementById('page-admin');
        if (!container) return;

        container.innerHTML = `
            <div class="admin-container">
                <div id="alertBox"></div>

                <div class="admin-form">
                    <h2>➕ إضافة جهاز جديد</h2>
                    <form id="addDeviceForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label>الماركة *</label>
                                <input type="text" name="brand" required placeholder="مثال: Samsung" maxlength="30">
                            </div>
                            <div class="form-group">
                                <label>اسم الجهاز *</label>
                                <input type="text" name="name" required placeholder="مثال: Galaxy S25" maxlength="60">
                            </div>
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
                            <div class="form-group">
                                <label>الإيموجي (أيقونة)</label>
                                <input type="text" name="image" value="📱" maxlength="4">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>الشاشة</label>
                                <input type="text" name="screen" placeholder="6.8 بوصة AMOLED" maxlength="60">
                            </div>
                            <div class="form-group">
                                <label>المعالج</label>
                                <input type="text" name="processor" placeholder="Snapdragon 8 Gen 3" maxlength="60">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>الذاكرة العشوائية</label>
                                <input type="text" name="ram" placeholder="12 GB" maxlength="30">
                            </div>
                            <div class="form-group">
                                <label>التخزين</label>
                                <input type="text" name="storage" placeholder="256 GB" maxlength="60">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>الكاميرا الخلفية</label>
                                <input type="text" name="camera" placeholder="200 MP" maxlength="80">
                            </div>
                            <div class="form-group">
                                <label>البطارية</label>
                                <input type="text" name="battery" placeholder="5000 mAh" maxlength="40">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>السعر في سوريا (ل.س) *</label>
                                <input type="number" name="priceSY" required placeholder="12500000" min="0">
                            </div>
                            <div class="form-group">
                                <label>السعر في السعودية (ر.س) *</label>
                                <input type="number" name="priceSA" required placeholder="4850" min="0">
                            </div>
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

        // ربط الأحداث
        document.getElementById('addDeviceForm').addEventListener('submit', (e) => this.addDevice(e));
        this.renderList();
    },

    // ===== إضافة جهاز =====
    addDevice(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        const custom = Storage.getCustomDevices();

        const newDevice = {
            id: Helpers.generateId(),
            brand: Helpers.escapeHtml(data.get('brand').trim()),
            name: Helpers.escapeHtml(data.get('name').trim()),
            image: data.get('image') || '📱',
            category: data.get('category') || 'phone',
            releaseDate: Helpers.today(),
            badge: 'جديد',
            rating: 4.5,
            reviewsCount: 0,
            isCustom: true,
            specs: {
                screen: Helpers.escapeHtml(data.get('screen') || '-'),
                resolution: '-',
                processor: Helpers.escapeHtml(data.get('processor') || '-'),
                ram: Helpers.escapeHtml(data.get('ram') || '-'),
                storage: Helpers.escapeHtml(data.get('storage') || '-'),
                camera: Helpers.escapeHtml(data.get('camera') || '-'),
                frontCamera: '-',
                battery: Helpers.escapeHtml(data.get('battery') || '-'),
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

    // ===== قائمة الأجهزة المضافة =====
    renderList() {
        const list = document.getElementById('adminDeviceList');
        if (!list) return;

        const custom = Storage.getCustomDevices();

        if (custom.length === 0) {
            list.innerHTML = `
                <p style="color: #5f6368; padding: 20px; text-align: center;">
                    لا توجد أجهزة مضافة بعد
                </p>
            `;
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

        // ربط أزرار الحذف
        list.querySelectorAll('[data-delete-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.deleteDevice(parseInt(btn.dataset.deleteId));
            });
        });
    },

    // ===== حذف جهاز =====
    deleteDevice(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الجهاز؟')) return;

        let custom = Storage.getCustomDevices();
        custom = custom.filter(d => d.id !== id);
        Storage.setCustomDevices(custom);

        // إزالة من المقارنة إن وُجد
        State.removeFromCompare(id);

        this.showAlert('🗑️ تم الحذف بنجاح', 'success');
        this.renderList();
        this.refreshAll();
    },

    // ===== تنبيه =====
    showAlert(msg, type = 'success') {
        const box = document.getElementById('alertBox');
        if (!box) return;

        box.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;

        setTimeout(() => {
            if (box) box.innerHTML = '';
        }, 3000);
    },

    // ===== تحديث الواجهة الرئيسية =====
    refreshAll() {
        // تحديث شريط الماركات
        App.initBrands();

        // تحديث الأجهزة
        Home.renderStats();
        Home.renderDevicesGrid();

        // تحديث المقارنة
        Compare.renderBar();
    }
};