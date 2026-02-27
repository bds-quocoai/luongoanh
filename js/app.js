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
        const danhSachDangBan = danhSach.filter(bds => bds.trangThai === true);
        danhSachDangBan.forEach(batDongSan => {

            const cot = document.createElement("div");
            cot.className = "col-md-4";

            cot.innerHTML = `
                <div class="card re-card h-100">
                    <img src="${batDongSan.hinhAnh}" 
                         class="card-img-top" 
                         alt="${batDongSan.ten}">
                    <div class="card-body d-flex flex-column">
                        <h5>${batDongSan.ten}</h5>
                        <p class="re-price">${batDongSan.gia}₫</p>
                        <p class="text-muted small">
                            ${batDongSan.dienTich} m² | ${batDongSan.viTri}
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

            // hienThiChiTiet(batDongSan);
            // modal.style.display = "flex";
            window.location.href = `chi-tiet.html?id=${id}`;
        }
    });

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