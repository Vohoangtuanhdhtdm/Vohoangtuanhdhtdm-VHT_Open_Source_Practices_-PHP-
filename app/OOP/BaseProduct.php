<?php
namespace App\OOP;

abstract class BaseProduct {
    public $name;
    public $qty;
    public static $totalAssets = 0; 
    
    public function __construct($n, $q) {
        $this->name = $n; 
        $this->qty = $q;
    }
}