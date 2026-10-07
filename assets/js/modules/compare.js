/* ============================================
   COMPARE.JS — منطق المقارنة
   İQmobil Project
   ============================================ */

const Compare = {
    // ===== تبديل جهاز في المقارنة =====
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

    // ===== شريط المقارنة العائم =====
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

    // ===== الانتقال لصفحة المقارنة =====
    goToCompare() {
        if (State.compareList.length < 2) {
            alert('⚠️ اختر جهازين على الأقل للمقارنة');
            return;
        }
        Router.go('compare');
    },

    // ===== عرض صفحة المقارنة =====
    render() {
        const container = document.getElementById('page-compare');
        if (!container) return;

        State.loadCompare();
        const ids = State.compareList;

        // لا أجهزة كافية
        if (ids.length < 2) {
            container.innerHTML = `
                <div class="compare-page">
                    <div class="empty-compare">
                        <div style="font-size: 60px; margin-bottom: 20px;">⚖️</div>
                        <h2>لا توجد أجهزة كافية للمقارنة</h2>
                        <p>اختر جهازين على الأقل من الصفحة الرئيسية</p>
                        <button class="compare-btn" data-nav="home">تصفح الأجهزة ←</button>
                    </div>
                </div>
            `;
            Router.init();
            return;
        }

        const devices = ids.map(id => Helpers.getDeviceById(id)).filter(Boolean);
        const country = Storage.getCountry();

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
                            ${devices.map(d => `
                                <td style="font-weight: 700; color: #1a73e8;">
                                    ${Helpers.formatPrice(d.prices[country] || d.prices.SY || 0, country)}
                                </td>
                            `).join('')}
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

        // ربط أزرار الإزالة
        document.querySelectorAll('[data-remove-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.removeId);
                State.removeFromCompare(id);
                this.renderBar();
                this.render();
                Home.renderDevicesGrid();
            });
        });

        Router.init();
    }
};