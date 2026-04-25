<?php

namespace App\OOP;

// Bài 12: extends để kế thừa
class ConCho extends DongVat 
{
    // Bài 14: Ghi đè (Override) phương thức của cha
    public function phatAmThanh() {
        return "Gâu gâu! (Sủa)";
    }

    // Bài 13: Truy cập biến protected từ lớp cha
    public function hienThiCanNang() {
        return $this->ten . " nặng " . $this->canNang . " kg";
    }
}