<?php
namespace App\OOP;

class ChuyenKhoan implements ThanhToan {
    public function pay($amount) { 
        return "Đã thanh toán " . number_format($amount) . " qua Ngân hàng."; 
    }
}