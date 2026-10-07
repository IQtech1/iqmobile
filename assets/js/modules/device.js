/* ============================================
   DEVICE.JS — منطق صفحة تفاصيل الجهاز
   İQmobil Project
   ============================================ */

const Device = {
    // ===== فتح جهاز =====
    open(id) {
        const device = Helpers.getDeviceById(id);
        if (!device) {
            alert('الجهاز غير موجود');
            return;
        }

        State.currentDevice = device;
        this.render();
        Router.go('device');
    },

    // ===== عرض الصفحة =====
    render() {
        const device = State.currentDevice;
        if (!device) return;

        const container = document.getElementById('page-device');
        const country = Storage.getCountry();
        const price = device.prices[country] || device.prices.SY || 0;

        const specsLabels = {
            screen: "الشاشة",
            resolution: "الدقة",
            processor: "المعالج",
            ram: "الذاكرة العشوائية",
            storage: "التخزين",
            camera: "الكاميرا الخلفية",
            frontCamera: "الكاميرا الأمامية",
            battery: "البطارية",
            charging: "الشحن",
            os: "نظام التشغيل",
            weight: "الوزن"
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
                        <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
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
                            <tr>
                                <th>${specsLabels[key] || key}</th>
                                <td>${Helpers.escapeHtml(String(val))}</td>
                            </tr>
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

        // ربط الأزرار
        this.bindEvents();
        this.renderReviews();

        // إعادة ربط التنقل
        Router.init();
    },

    // ===== ربط الأحداث =====
    bindEvents() {
        const addBtn = document.getElementById('addToCompareBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addToCompare());
        }

        const buyBtn = document.getElementById('buyBtn');
        if (buyBtn) {
            buyBtn.addEventListener('click', () => {
                alert('🛒 ميزة الشراء ستُضاف قريباً!');
            });
        }

        const submitBtn = document.getElementById('submitReviewBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitReview());
        }
    },

    // ===== عرض المراجعات =====
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

    // ===== إرسال مراجعة =====
    submitReview() {
        const device = State.currentDevice;
        if (!device) return;

        const userInput = document.getElementById('reviewUser');
        const ratingInput = document.getElementById('reviewRating');
        const textInput = document.getElementById('reviewText');

        const user = userInput.value.trim();
        const rating = parseInt(ratingInput.value);
        const text = textInput.value.trim();

        // التحقق
        if (!user) {
            alert('⚠️ يرجى إدخال اسمك');
            userInput.focus();
            return;
        }

        if (!text || text.length < 5) {
            alert('⚠️ يرجى كتابة مراجعة (5 أحرف على الأقل)');
            textInput.focus();
            return;
        }

        // حفظ المراجعة
        const reviews = Storage.getDeviceReviews(device.id);
        reviews.unshift({
            user: Helpers.escapeHtml(user),
            rating: rating,
            text: Helpers.escapeHtml(text),
            date: Helpers.today()
        });
        Storage.setDeviceReviews(device.id, reviews);

        // مسح النموذج
        userInput.value = '';
        textInput.value = '';
        ratingInput.value = '5';

        // إعادة العرض
        this.renderReviews();

        // رسالة نجاح
        alert('✅ تم إضافة مراجعتك بنجاح!');
    },

    // ===== إضافة للمقارنة =====
    addToCompare() {
        const device = State.currentDevice;
        if (!device) return;

        const result = State.addToCompare(device.id);

        if (!result.success) {
            alert('⚠️ ' + result.message);
            return;
        }

        Compare.renderBar();
        alert('✅ تم إضافة الجهاز للمقارنة');
    }
};