<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    // Bài 1 + Bài 2
    public function tinhDienTichHCN(Request $request)
    {
        
        $request->validate([
            'chieuDai' => 'required|numeric',
            'chieuRong' => 'required|numeric',
        ]);

     
        $dai = $request->input('chieuDai');
        $rong = $request->input('chieuRong');

       
        $dienTich = $dai * $rong;

  
        return response()->json([
            'dienTich' => $dienTich
        ]);
    }

    // Bài 3
    public function tinhHinhTron(Request $request)
    {
        $request->validate([
            'banKinh' => 'required|numeric|min:0',
        ]);

        $banKinh = $request->input('banKinh');
        
        
        if (!defined('PI')) {
            define('PI', 3.14); 
        }
       
        $dienTich = PI * pow($banKinh, 2); 
        $chuVi = 2 * PI * $banKinh;        

       
        return response()->json([
            'dienTich' => $dienTich,
            'chuVi' => $chuVi
        ]);
    }

    // Bài 4
    public function tinhTienDien(Request $request)
    {
       
        $request->validate([
            'tenChuHo' => 'required|string|max:255',
            'chiSoCu' => 'required|numeric|min:0',
            'chiSoMoi' => 'required|numeric|gte:chiSoCu',
            'donGia' => 'required|numeric|min:0',
        ], [
            'chiSoMoi.gte' => 'Chỉ số mới phải lớn hơn hoặc bằng chỉ số cũ!'
        ]);

      
        $chiSoCu = $request->input('chiSoCu');
        $chiSoMoi = $request->input('chiSoMoi');
        $donGia = $request->input('donGia', 2000); 

      
        $soTien = ($chiSoMoi - $chiSoCu) * $donGia;

        return response()->json([
            'soTienThanhToan' => $soTien
        ]);
    }

    // Bài 5
    public function phatSinhMang(Request $request)
    {
        
        $request->validate([
            'soPhanTu' => 'required|integer|min:1|max:100', // max 100 để tránh spam
        ], [
            'soPhanTu.min' => 'Số phần tử phải lớn hơn 0',
            'soPhanTu.max' => 'Vui lòng nhập tối đa 100 phần tử'
        ]);

        $n = $request->input('soPhanTu');
        $mang = [];

        
        for ($i = 0; $i < $n; $i++) {
            $mang[] = rand(0, 20); // Hàm rand(min, max) của PHP
        }

        
        $max = max($mang);          // Tìm số lớn nhất
        $min = min($mang);          // Tìm số nhỏ nhất
        $tong = array_sum($mang);   // Tính tổng mảng
        
        
        $chuoiMang = implode("  ", $mang); 

        return response()->json([
            'chuoiMang' => $chuoiMang,
            'max' => $max,
            'min' => $min,
            'tong' => $tong
        ]);
    }

    // Bài 6
    public function timKiemMang(Request $request)
    {
        $request->validate([
            'chuoiMang' => 'required|string',
            'soCanTim' => 'required|numeric',
        ]);

        $chuoiInput = $request->input('chuoiMang');
        $soCanTim = $request->input('soCanTim');

      
        $mangTho = explode(',', $chuoiInput);
        
        $mang = array_map('trim', $mangTho);

       
        $viTri = -1; // Đặt cờ hiệu mặc định là -1 (chưa tìm thấy)
        
        for ($i = 0; $i < count($mang); $i++) {
            if (is_numeric($mang[$i]) && $mang[$i] == $soCanTim) {
                $viTri = $i; // Lưu lại vị trí (index)
                break;       // Tìm thấy rồi thì thoát vòng lặp luôn cho nhẹ máy
            }
        }

     
        if ($viTri != -1) {
            
            $viTriHienThi = $viTri + 1;
            $ketQua = "Tìm thấy số $soCanTim tại vị trí thứ $viTriHienThi của mảng";
        } else {
            $ketQua = "Không tìm thấy số $soCanTim trong mảng";
        }

        
        $chuoiMangXuat = implode(", ", $mang);

        return response()->json([
            'mangOld' => $chuoiMangXuat,
            'ketQua' => $ketQua
        ]);
    }

    // Bài 7
    public function chaoTheoGio(Request $request)
    {
        $request->validate([
            'gio' => 'required|integer|min:0|max:23',
        ], [
            'gio.min' => 'Vui lòng nhập giờ từ 0 đến 23.',
            'gio.max' => 'Một ngày chỉ có 24h (0-23). Vui lòng nhập lại!'
        ]);

        $gio = $request->input('gio');
        $loiChao = '';

       
        if ($gio >= 0 && $gio < 13) {
            $loiChao = 'Chào buổi sáng!';
        } elseif ($gio >= 13 && $gio <= 18) {
            $loiChao = 'Chào buổi chiều!';
        } elseif ($gio >= 19 && $gio <= 23) {
            $loiChao = 'Chào buổi tối!';
        }

        return response()->json([
            'loiChao' => $loiChao
        ]);
    }

    // Bài 8
    public function sapXepMang(Request $request)
    {
        $request->validate([
            'chuoiMang' => 'required|string',
        ]);

        $chuoiInput = $request->input('chuoiMang');
        
        
        $mangTho = explode(',', $chuoiInput);
        $mang = [];
        foreach ($mangTho as $item) {
            $val = trim($item);
            if (is_numeric($val)) {
                $mang[] = (float) $val; 
            }
        }

       
        $mangTang = $this->thuatToanSapTang($mang);
        $mangGiam = $this->thuatToanSapGiam($mang);

        return response()->json([
            'mangTang' => implode(", ", $mangTang),
            'mangGiam' => implode(", ", $mangGiam)
        ]);
    }

    // Bài 8.1
    // Hàm private: Sắp xếp tăng dần (Selection Sort)
    private function thuatToanSapTang($mang)
    {
        $n = count($mang);
        for ($i = 0; $i < $n - 1; $i++) {
            for ($j = $i + 1; $j < $n; $j++) {
                if ($mang[$i] > $mang[$j]) {
                    $tam = $mang[$i];
                    $mang[$i] = $mang[$j];
                    $mang[$j] = $tam;
                }
            }
        }
        return $mang;
    }

    // Bài 8.2
    // Hàm private: Sắp xếp giảm dần (Selection Sort)
    private function thuatToanSapGiam($mang)
    {
        $n = count($mang);
        for ($i = 0; $i < $n - 1; $i++) {
            for ($j = $i + 1; $j < $n; $j++) {
                if ($mang[$i] < $mang[$j]) {
                    $tam = $mang[$i];
                    $mang[$i] = $mang[$j];
                    $mang[$j] = $tam;
                }
            }
        }
        return $mang;
    }

    // Bài 9
    public function danhLamThangCanh()
    {
       
        $mangDiaDanh = [
            ['ma' => 'nt', 'ten' => 'Biển Nha Trang', 'hinh' => 'https://i.pinimg.com/1200x/6d/d5/e5/6dd5e532067c5e78693252c772061a18.jpg'],
            ['ma' => 'dl', 'ten' => 'Thành phố Đà Lạt', 'hinh' => 'https://i.pinimg.com/1200x/2f/2a/77/2f2a77bb9451222c2cad321b510c978e.jpg'],
            ['ma' => 'vt', 'ten' => 'Biển Vũng Tàu', 'hinh' => 'https://i.pinimg.com/736x/44/5e/30/445e306f9477c2ee8a123aa0d11ae8b3.jpg'],
            ['ma' => 'hl', 'ten' => 'Vịnh Hạ Long', 'hinh' => 'https://i.pinimg.com/736x/1d/0c/34/1d0c3486ffe197fd5907e37cf78966e1.jpg'],
            ['ma' => 'pt', 'ten' => 'Biển Phan Thiết', 'hinh' => 'https://i.pinimg.com/1200x/30/12/ae/3012aec11a4fc7628f03ca970601ef93.jpg'],
            ['ma' => 'ht', 'ten' => 'Biển Hà Tiên', 'hinh' => 'https://i.pinimg.com/736x/4e/26/df/4e26df35bde986814b30fcf5c84f4811.jpg'],
            ['ma' => 'pq', 'ten' => 'Đảo Phú Quốc', 'hinh' => 'https://i.pinimg.com/736x/8e/14/ec/8e14ec22a9a9362e905a14e370f06173.jpg'],
        ];

        // Trả mảng 2 chiều về cho React dưới dạng JSON
        return response()->json($mangDiaDanh);
    }

    // Bài 10
    public function danhLamThangCanhMoRong()
    {
        
       $mangDiaDanh = [
            ['ma' => 'nt', 'ten' => 'Biển Nha Trang', 'hinh' => 'https://i.pinimg.com/1200x/6d/d5/e5/6dd5e532067c5e78693252c772061a18.jpg'],
            ['ma' => 'dl', 'ten' => 'Thành phố Đà Lạt', 'hinh' => 'https://i.pinimg.com/1200x/2f/2a/77/2f2a77bb9451222c2cad321b510c978e.jpg'],
            ['ma' => 'vt', 'ten' => 'Biển Vũng Tàu', 'hinh' => 'https://i.pinimg.com/736x/44/5e/30/445e306f9477c2ee8a123aa0d11ae8b3.jpg'],
            ['ma' => 'hl', 'ten' => 'Vịnh Hạ Long', 'hinh' => 'https://i.pinimg.com/736x/1d/0c/34/1d0c3486ffe197fd5907e37cf78966e1.jpg'],
            ['ma' => 'pt', 'ten' => 'Biển Phan Thiết', 'hinh' => 'https://i.pinimg.com/1200x/30/12/ae/3012aec11a4fc7628f03ca970601ef93.jpg'],
            ['ma' => 'ht', 'ten' => 'Biển Hà Tiên', 'hinh' => 'https://i.pinimg.com/736x/4e/26/df/4e26df35bde986814b30fcf5c84f4811.jpg'],
            ['ma' => 'pq', 'ten' => 'Đảo Phú Quốc', 'hinh' => 'https://i.pinimg.com/736x/8e/14/ec/8e14ec22a9a9362e905a14e370f06173.jpg'],
        ];

        // Sử dụng usort để sắp xếp mảng 2 chiều theo Alphabet của cột 'ten'
        usort($mangDiaDanh, function($a, $b) {
            // Hàm strcmp sẽ so sánh 2 chuỗi và trả về -1, 0, hoặc 1
            // Dựa vào đó usort sẽ biết cái nào đứng trước, cái nào đứng sau
            return strcmp($a['ten'], $b['ten']);
        });

       
        return response()->json($mangDiaDanh);
    }
}
