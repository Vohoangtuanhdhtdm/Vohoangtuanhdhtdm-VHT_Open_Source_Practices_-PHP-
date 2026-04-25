<?php
namespace App\OOP;

class MathTool {
    public function __call($name, $args) {
        if ($name == 'tong') {
            return array_sum($args);
        }
        return "Lỗi: Hàm $name không tồn tại!";
    }
}