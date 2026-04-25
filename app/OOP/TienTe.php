<?php

namespace App\OOP;
// Bài 11
class TienTe 
{
    // Hàm static có thể gọi thẳng từ tên Lớp mà không cần 'new'
    public static function formatVND($soTien) 
    {
        // Hàm number_format của PHP giúp thêm dấu phẩy phân cách hàng nghìn
        return number_format($soTien, 0, ',', '.') . ' VNĐ';
    }
}