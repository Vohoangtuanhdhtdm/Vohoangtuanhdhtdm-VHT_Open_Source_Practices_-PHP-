Dự án này là tập hợp 10 bài tập thực hành lập trình PHP từ cơ bản đến nâng cao (Mảng), được triển khai trên nền tảng công nghệ hiện đại nhằm tối ưu hóa trải nghiệm người dùng và hiệu suất phát triển. (Dự định sẽ chứa tất cả các bài tập và dự án liên quan để môn học Mã Nguồn Mở của Võ Hoàng Tuấn tại repo này! 😎)

**Sinh viên thực hiện:** Võ Hoàng Tuấn  
**Chuyên ngành:** Kỹ thuật Phần mềm - Đại học Thủ Dầu Một (TDMU)  
**Mô hình triển khai:** Laravel (Backend API) + React & Inertia.js (Frontend)

---

## 🚀 Công Nghệ Sử Dụng

- **Backend:** Laravel 11.x (PHP 8.3) - Xử lý logic nghiệp vụ và API.
- **Frontend:** React.js + TypeScript - Xây dựng giao diện.
- **Bridge:** Inertia.js - Kết nối Laravel và React theo mô hình Monolith.
- **Styling:** Tailwind CSS.

---

## ⚙️ Kiến Trúc & Luồng Dữ Liệu Đã Thực Hiện

### 1. Luồng Lập Trình (Development Flow - Cách viết code)

(Minh Họa Bài 2)

Quy trình thêm một tính năng mới luôn tuân theo nguyên tắc "Từ Lõi ra Giao diện" (Từ Backend ra Frontend):

`[1. LOGIC]` 👉 `[2. API ROUTE]` 👉 `[3. WEB ROUTE]` 👉 `[4. GIAO DIỆN]`

* **Bước 1 - Controller (`ExerciseController.php`):** Nơi chứa "Não bộ". Viết các hàm PHP để nhận dữ liệu, tính toán (Cộng, trừ, If-else, vòng lặp mảng) và trả về `JSON`.
* **Bước 2 - API Route (`api.php`):** Mở một "cửa sau" để Controller giao tiếp với thế giới bên ngoài. (Ví dụ: `Route::post('/bai2/tinh-dien-tich', ...)`).
* **Bước 3 - Web Route (`web.php`):** Mở "cửa trước" cho người dùng truy cập. Khi user gõ `/bai2`, Inertia sẽ được gọi để ném file React ra màn hình.
* **Bước 4 - React Component (`Bai2.tsx`):** Xây dựng giao diện HTML/Tailwind. Viết hàm `Axios` để gọi vào "cửa sau" (API) ở Bước 2.

---

### 2. Luồng Hoạt Động (Runtime Flow - Cách dữ liệu chảy khi User bấm nút)
Đây là hành trình của dữ liệu khi người dùng thực hiện một thao tác trên màn hình:

```text
[Người Dùng] 
     │
     ▼ (Nhập dữ liệu & Bấm nút "Tính")
     │
[1. React Component] (Frontend)
     │   - Chặn load trang (e.preventDefault)
     │   - Đóng gói dữ liệu vào State
     ▼
[2. Axios (AJAX Request)] 
     │   - Gửi gói dữ liệu qua đường truyền POST
     │   - Đích đến: [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)...
     ▼
[3. Routes API] (Laravel Backend)
     │   - File `api.php` bắt được URL
     │   - Điều hướng gói dữ liệu đến đúng Controller
     ▼
[4. Controller] (Xử lý Nghiệp Vụ)
     │   - Validate (Kiểm tra lỗi dữ liệu)
     │   - Thực thi thuật toán PHP (Tính toán, Sắp xếp,...)
     │   - Đóng gói kết quả thành chuẩn JSON
     ▼
[5. Response JSON]
     │   - (Ví dụ: {"dienTich": 300}) trả ngược lại cho Frontend
     ▼
[6. React Component] (Frontend)
     │   - Axios nhận được dữ liệu JSON
     │   - Cập nhật vào State (`setKetQua`)
     │   - DOM tự động render lại ô Input kết quả trên màn hình
     │
     ▼ 
[Người Dùng nhìn thấy kết quả]

```
## 🛠 Hướng Dẫn Cài Đặt & Chạy Project

1. **Yêu cầu hệ thống:**
   - Laragon hoặc XAMPP (PHP >= 8.2).
   - Node.js & NPM.
   - Composer.

2. **Các bước thực hiện:**
   ```bash
   # 1. Clone dự án và cài đặt library
   composer install
   npm install

   # 2. Cấu hình môi trường
   cp .env.example .env
   php artisan key:generate

   # 3. Khởi chạy hệ thống (Mở 2 Terminal)
   # Terminal 1: Chạy Server Laravel
   php artisan serve
   # Terminal 2: Chạy Vite biên dịch React
   npm run dev
