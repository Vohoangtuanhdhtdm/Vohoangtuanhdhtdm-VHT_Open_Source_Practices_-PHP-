<?php

namespace App\OOP;

class DongVat 
{
    public $ten;
    protected $canNang; // Bài 13: Chỉ cha và con mới được dùng

    public function __construct($ten, $canNang) {
        $this->ten = $ten;
        $this->canNang = $canNang;
    }

    public function phatAmThanh() {
        return "Động vật đang phát ra âm thanh...";
    }
}