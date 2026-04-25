<?php

namespace App\OOP;
// Bài 10
class SinhVien 
{
    // Biến static là biến "dùng chung" cho tất cả các đối tượng
    public static $count = 0; 

    public function __construct() 
    {
        // Mỗi khi có người gõ chữ 'new SinhVien', biến chung này sẽ tự tăng lên 1
        self::$count++; 
    }
}