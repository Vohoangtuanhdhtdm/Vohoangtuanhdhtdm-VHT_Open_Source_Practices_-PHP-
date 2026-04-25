<?php
namespace App\OOP;

class HinhVuong extends HinhHoc {
    private $canh;
    public function __construct($c) { $this->canh = $c; }
    
    public function tinhDienTich() { return $this->canh * $this->canh; }
}