<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\OOP\BaseProduct;
use App\OOP\ChuyenKhoan;
use App\OOP\ConCho;
use App\OOP\ConMeo;
use App\OOP\DongVat;
use App\OOP\HinhTron;
use App\OOP\HinhVuong;
use App\OOP\Laptop;
use App\OOP\MathTool;
use App\OOP\Sach;
use App\OOP\SinhVien;
use App\OOP\SmartPhone;
use App\OOP\TienTe;
use Illuminate\Http\Request;

class OopExerciseController extends Controller
{
    // Bài 1 - 4
    public function quanLySach(Request $request){
        // BÀI 2: Sử dụng từ khóa 'new' để tạo đối tượng 
        
        $sach1 = new Sach();
        $sach1->tenSach = $request->input('ten1', 'Lập trình PHP');
        $sach1->tacGia = $request->input('tg1', 'Nguyễn Văn A');
        $sach1->namXuatBan = $request->input('nam1', 2023);

        $sach2 = new Sach();
        $sach2->tenSach = $request->input('ten2', 'Cơ sở dữ liệu');
        $sach2->tacGia = $request->input('tg2', 'Trần Thị B');
        $sach2->namXuatBan = $request->input('nam2', 2021);

        // Bài 4: Cập nhật năm xuất bản sách 2 nếu người dùng có yêu cầu 
        if ($request->has('namMoi2') && $request->input('namMoi2') != '') {
            $sach2->capNhatNamXB($request->input('namMoi2'));
        }

        // BÀI 3: Trả về kết quả từ hàm hienThiThongTin()
        return response()->json([
            'sach1_info' => $sach1->hienThiThongTin(),
            'sach2_info' => $sach2->hienThiThongTin()
        ]);

    }
    
    // Bài 5 - 8
    public function bai5Den8(Request $request)
    {
        ob_start();
        $user = new \App\OOP\NguoiDung($request->input('username', 'Tuấn_Võ'), $request->input('email', 'tuan@example.com'));
        
        // Dùng lệnh unset để ÉP PHP phải hủy đối tượng ngay lập tức, kích hoạt hàm __destruct()
        unset($user);
        $logVongDoi = ob_get_clean();

        /*
         * BÀI 7: Phạm vi Private
         */
        $taiKhoan = new \App\OOP\TaiKhoan();
        $ketQuaMatKhau = $taiKhoan->setMatKhau($request->input('password', '123'));

        /*
         * BÀI 8: Getter và Setter
         */
        $sanPham = new \App\OOP\SanPham();
        $sanPham->setTenSP($request->input('tenSP', 'Bàn phím cơ')); 
        $sanPham->setGiaSP($request->input('giaSP', 1200000)); 
        
        // Sử dụng Getter để lấy dữ liệu ra ghép thành chuỗi
        $thongTinSP = "Tên SP: " . $sanPham->getTenSP() . " | Giá: " . number_format($sanPham->getGiaSP()) . " VNĐ";

        return response()->json([
            'logVongDoi' => $logVongDoi,
            'ketQuaMatKhau' => $ketQuaMatKhau,
            'thongTinSP' => $thongTinSP
        ]);
    }

    // Bài 9 - 11
    public function bai9Den11(Request $request)
    {
        /* --- BÀI 9: Hằng số (Const) --- */
        $ht = new HinhTron();
        $banKinh = $request->input('banKinh', 5);
        $dienTich = $ht->tinhDienTich($banKinh);
       

        /* --- BÀI 10: Biến Tĩnh (Static Property) --- */
        // Reset biến count về 0 để mô phỏng lại từ đầu mỗi lần bấm nút
        SinhVien::$count = 0; 
        
        $soLuongSV = $request->input('soLuongSV', 3);
    
        for ($i = 0; $i < $soLuongSV; $i++) {
            new SinhVien(); 
        }
        // Sau vòng lặp, lấy ra tổng số sinh viên hiện có
        $tongSV = SinhVien::$count;

        /* --- BÀI 11: Hàm Tĩnh (Static Method) --- */
        $soTien = $request->input('soTien', 1500000);
        $tienDaFormat = TienTe::formatVND($soTien);

        return response()->json([
            'giaTriPI' => HinhTron::PI,
            'dienTich' => $dienTich,
            'tongSV'   => $tongSV,
            'tienTe'   => $tienDaFormat
        ]);
    }

    // Bài 12 - 15
    public function bai12Den15(Request $request)
    {
        // Khởi tạo các đối tượng lớp con
        $cho = new ConCho($request->input('tenCho', 'Milu'), $request->input('canNangCho', 15));
        $meo = new ConMeo($request->input('tenMeo', 'Mimi'), $request->input('canNangMeo', 4));

        /* --- BÀI 15: Minh họa tính Đa hình --- */
        // Tạo một hàm dùng chung nhận tham số kiểu 'DongVat'
        $animalSound = function(DongVat $animal) {
            return $animal->phatAmThanh();
        };

        return response()->json([
            'bai12_keThua'  => "Chó tên: " . $cho->ten, 
            'bai13_protected' => $cho->hienThiCanNang(), 
            'bai14_override' => [
                'cho' => $cho->phatAmThanh(),
                'meo' => $meo->phatAmThanh()
            ],
            'bai15_daHinh' => [
                'goiCho' => $animalSound($cho), 
                'goiMeo' => $animalSound($meo)
            ]
        ]);
    }

    // Bài 16 - 20
    public function bai16Den20(Request $request)
    {
        //  Bài 16 (Abstract)
        $hinhVuong = new HinhVuong(5);
        $dienTichHV = $hinhVuong->tinhDienTich();

        // Bài 17 & 18 (Interface)
        $ck = new ChuyenKhoan();
        $thanhToan = $ck->pay(500000);
        $phone = new SmartPhone();

        // Bài 19 (__call Magic Method)
        $math = new MathTool();
        $tong2So = $math->tong(10, 20);
        $tong4So = $math->tong(10, 20, 30, 40);

        // Bài 20 (Masterpiece System)
        BaseProduct::$totalAssets = 0; // Reset tài sản
        $macbook = new Laptop("Macbook Pro M3", 2, 40000000);
        $dell = new Laptop("Dell XPS 15", 3, 30000000);
        
        $log1 = $macbook->log("Nhập kho thành công 2 máy Macbook");
        $dell->applyDiscount(10); // Giảm giá Dell 10%
        $giaDellSauThue = $dell->getPriceWithTax(); // Tính thuế Dell

        return response()->json([
            'bai16' => "Diện tích hình vuông cạnh 5 là: " . $dienTichHV,
            'bai17' => $thanhToan,
            'bai18' => $phone->takePhoto() . " và " . $phone->browseWeb(),
            'bai19' => "Tổng 2 số: $tong2So | Tổng 4 số: $tong4So",
            'bai20' => [
                'log' => $log1,
                'giaDellThue' => number_format($giaDellSauThue) . " VNĐ",
                'tongTaiSan' => number_format(BaseProduct::$totalAssets) . " VNĐ"
            ]
        ]);
    }
}
