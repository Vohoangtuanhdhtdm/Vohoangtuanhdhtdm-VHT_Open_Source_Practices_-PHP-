<?php
namespace App\OOP;

class SmartPhone implements ChupAnh, Internet {
    public function takePhoto() { return "Đang chụp ảnh sắc nét bằng Camera 48MP..."; }
    public function browseWeb() { return "Đang lướt web tốc độ cao bằng 5G..."; }
}