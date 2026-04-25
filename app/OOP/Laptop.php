<?php
namespace App\OOP;

class Laptop extends BaseProduct implements IDiscount, ITaxable {
    use ProductLogger; 
    
    private $price;
    
    public function __construct($n, $q, $p) {
        parent::__construct($n, $q); 
        $this->price = $p;
        self::$totalAssets += ($this->price * $this->qty); 
    }
    
    public function applyDiscount($p) { $this->price -= ($this->price * $p / 100); }
    public function getPriceWithTax() { return $this->price * 1.1;  }
    public function getPrice() { return $this->price; }
}