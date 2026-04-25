<?php

namespace App\OOP;

// Bài 9
class HinhTron 
{
    // Khai báo hằng số PI (Không dùng dấu $)
    public const PI = 3.14; 

    public function tinhDienTich($banKinh) 
    {
        // Để gọi hằng số dùng chữ 'self::'
        return self::PI * $banKinh * $banKinh;
    }
}