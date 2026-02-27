document.addEventListener("DOMContentLoaded", function () {

    const noiDungChiTiet = document.getElementById("noiDungChiTiet");

    // Lấy id từ URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    if (!id) {
        noiDungChiTiet.innerHTML = "<p>Không tìm thấy bất động sản.</p>";
        return;
    }

    // Fetch lại JSON
    fetch("data/dataProperties.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể tải file JSON");
            }
            return response.json();
        })
        .then(duLieu => {

            const batDongSan = duLieu.find(item => item.id === id);

            if (!batDongSan) {
                noiDungChiTiet.innerHTML = `
                    <div class="alert alert-danger text-center mt-4">
                        <h4>Bất động sản đã không tồn tại</h4>
                        <a href="index.html" class="btn btn-secondary mt-3">
                            Quay lại trang chủ
                        </a>
                    </div>
                `;
                return;
            }
            if (batDongSan.trangThai === false) {
                noiDungChiTiet.innerHTML = `
                    <div class="alert alert-danger text-center mt-4">
                        <h4>Bất động sản đã bán</h4>
                        <a href="index.html" class="btn btn-secondary mt-3">
                            Quay lại trang chủ
                        </a>
                    </div>
                `;
                return;
            }
            renderChiTiet(batDongSan);
        })
        .catch(error => {
            console.error(error);
            noiDungChiTiet.innerHTML = "<p>Lỗi tải dữ liệu.</p>";
        });

    function renderChiTiet(batDongSan) {

        const tatCaAnh = [batDongSan.hinhAnh, ...batDongSan.hinhAnhPhu];

        noiDungChiTiet.innerHTML = `
            <h2>${batDongSan.ten}</h2>
            <p><strong>Giá:</strong> ${batDongSan.gia}₫</p>
            <p><strong>Diện tích:</strong> ${batDongSan.dienTich}</p>
            <p><strong>Vị trí:</strong> ${batDongSan.viTri}</p>

            <p class="mt-3">${batDongSan.moTa}</p>
            <div class="nhom-nut-lien-he">
                <a href="tel:0976912972" class="btn-lien-he">
                    <i class="bi bi-telephone-fill"></i> Liên hệ
                </a>

                <a href="https://zalo.me/0976912972" target="_blank" class="btn-zalo">
                    <img class="icon-zalo-26" src="assets/icons/icon_z.png" alt=""> Nhắn Zalo
                </a>
            </div>
            <div class="khung-anh-lon">
                <img id="anhChinh" src="${batDongSan.hinhAnh}">
            </div>

            <div id="danhSachAnhPhu">
                ${tatCaAnh.map((img, index) => `
                    <img src="${img}" 
                         class="anh-phu ${index === 0 ? 'active' : ''}"
                         data-index="${index}">
                `).join("")}
            </div>
            
        `;

        // Xử lý đổi ảnh
        const anhChinh = document.getElementById("anhChinh");
        const danhSachAnhPhu = document.querySelectorAll(".anh-phu");

        danhSachAnhPhu.forEach(anh => {
            anh.addEventListener("click", function () {
                anhChinh.src = this.src;
                danhSachAnhPhu.forEach(a => a.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }

});