document.addEventListener("DOMContentLoaded", function () {

    const danhSachBatDongSan = document.getElementById("danhSachBatDongSan");
    const modal = document.getElementById("chiTietModal");
    const noiDungChiTiet = document.getElementById("noiDungChiTiet");
    const dongModal = document.getElementById("dongModal");

    let duLieuToanBo = [];

    // Tải dữ liệu JSON
    fetch("data/dataProperties.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể tải file JSON");
            }
            return response.json();
        })
        .then(duLieu => {
            duLieuToanBo = duLieu; // lưu lại toàn bộ dữ liệu
            hienThiBatDongSan(duLieu);
        })
        .catch(loi => {
            console.error("Lỗi khi tải dữ liệu:", loi);
        });

    // Hàm hiển thị bất động sản
    function hienThiBatDongSan(danhSach) {

        danhSachBatDongSan.innerHTML = "";

        danhSach.forEach(batDongSan => {

            const cot = document.createElement("div");
            cot.className = "col-md-4";

            cot.innerHTML = `
                <div class="card re-card h-100">
                    <img src="${batDongSan.hinhAnh}" 
                         class="card-img-top" 
                         alt="${batDongSan.ten}">
                    <div class="card-body d-flex flex-column">
                        <h5>${batDongSan.ten}</h5>
                        <p class="re-price">${batDongSan.gia}</p>
                        <p class="text-muted small">
                            ${batDongSan.dienTich} | ${batDongSan.viTri}
                        </p>
                        <button class="re-btn-primary w-100 mt-auto"
                                data-id="${batDongSan.id}">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            `;

            danhSachBatDongSan.appendChild(cot);
        });
    }

    // Bắt sự kiện click xem chi tiết
    danhSachBatDongSan.addEventListener("click", function (e) {

        if (e.target.classList.contains("re-btn-primary")) {

            const id = parseInt(e.target.getAttribute("data-id"));
            const batDongSan = duLieuToanBo.find(item => item.id === id);

            if (!batDongSan) return;

            hienThiChiTiet(batDongSan);
            modal.style.display = "flex";
        }
    });

    // Hàm hiển thị chi tiết
    function hienThiChiTiet(batDongSan) {

        // Gộp ảnh chính + ảnh phụ
        const tatCaAnh = [batDongSan.hinhAnh, ...batDongSan.hinhAnhPhu];

        noiDungChiTiet.innerHTML = `
            <h2>${batDongSan.ten}</h2>
            <p><strong>Giá:</strong> ${batDongSan.gia}</p>
            <p><strong>Diện tích:</strong> ${batDongSan.dienTich}</p>
            <p><strong>Vị trí:</strong> ${batDongSan.viTri}</p>
            <p><strong>Trạng thái:</strong> ${batDongSan.trangThai}</p>
            <p><strong>Mô tả:</strong></p>
            <p class="mo-ta-bds">
                ${batDongSan.moTa}
            </p>

            <!-- Ảnh lớn -->
            <div class="khung-anh-lon">
                <img id="anhChinh" src="${batDongSan.hinhAnh}">
            </div>

            <!-- Thumbnail -->
            <div id="danhSachAnhPhu">
                ${tatCaAnh.map((img, index) => `
                    <img src="${img}" 
                        class="anh-phu ${index === 0 ? 'active' : ''}"
                        data-index="${index}">
                `).join("")}
            </div>

            <!-- Nút hành động -->
            <div class="nhom-nut-lien-he">
                <a href="tel:0909123456" class="btn-lien-he">
                    📞 Liên hệ
                </a>

                <a href="https://zalo.me/0909123456" target="_blank" class="btn-zalo">
                    💬 Zalo
                </a>
            </div>
        `;

        const anhChinh = document.getElementById("anhChinh");
        const danhSachAnhPhu = document.querySelectorAll(".anh-phu");

        danhSachAnhPhu.forEach(anh => {
            anh.addEventListener("click", function () {

                // đổi ảnh lớn
                anhChinh.src = this.src;

                // reset viền
                danhSachAnhPhu.forEach(a => a.style.border = "none");

                // thêm viền ảnh đang chọn
                this.style.border = "2px solid #14213d";
            });
        });
    }

    // Đóng modal
    dongModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

});