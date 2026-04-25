<?php

namespace App\OOP;

class Sach 
{
    // BÀI 1: Khai báo các thuộc tính public 
    public $tenSach;
    public $tacGia;
    public $namXuatBan;

    // BÀI 3: Viết phương thức hiển thị thông tin 
    public function hienThiThongTin() 
    {
        // Sử dụng $this để trỏ đến các thuộc tính của chính đối tượng này
        return "Tên sách: " . $this->tenSach . " - Tác giả: " . $this->tacGia . " - Năm XB: " . $this->namXuatBan;
    }

    // BÀI 4: Sử dụng từ khóa $this trong cập nhật dữ liệu 
    public function capNhatNamXB($nam) 
    {
        $this->namXuatBan = $nam;
    }
}