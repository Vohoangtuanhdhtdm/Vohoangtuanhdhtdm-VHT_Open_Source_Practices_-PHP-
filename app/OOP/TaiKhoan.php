<?php

namespace App\OOP;

// Bài 7
class TaiKhoan 
{
    // Biến private
    private $matKhau; 

    public function setMatKhau($newPass) 
    {
        // Kiểm tra độ dài mật khẩu trước khi cho phép lưu
        if (strlen($newPass) < 6) { 
            return "Lỗi: Mật khẩu phải có ít nhất 6 ký tự!"; 
        }
        
        $this->matKhau = $newPass;
        return "Thành công: Mật khẩu đã được cập nhật an toàn.";
    }
}