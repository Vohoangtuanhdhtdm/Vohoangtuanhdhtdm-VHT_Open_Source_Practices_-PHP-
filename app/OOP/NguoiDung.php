<?php

namespace App\OOP;

// Bài 5 & Bài 6
class NguoiDung 
{
    public $tenDangNhap;
    public $email; 

    // Hàm tạo: Tự động chạy khi dùng chữ 'new'
    public function __construct($user, $mail)
    {
        $this->tenDangNhap = $user;
        $this->email = $mail;
        // In ra thông báo khi tạo thành công 
        echo " Đã TẠO đối tượng NguoiDung: " . $this->tenDangNhap . " <br/>";
    }

    // Hàm hủy: Tự động chạy khi đối tượng bị xóa khỏi bộ nhớ
    public function __destruct() 
    {
        echo "Đối tượng " . $this->tenDangNhap . " đã BỊ HỦY khỏi bộ nhớ. <br/>"; 
    }
}