<?php

namespace App\OOP;

// Bài 8
class SanPham 
{
    private $tenSP; 
    private $giaSP; 

    
    public function setTenSP($ten) { 
        $this->tenSP = $ten;
    }

    public function setGiaSP($gia) { 
        $this->giaSP = max(0, $gia); 
    }

    public function getTenSP() { 
        return $this->tenSP;
    }

    public function getGiaSP() { 
        return $this->giaSP;
    }
}