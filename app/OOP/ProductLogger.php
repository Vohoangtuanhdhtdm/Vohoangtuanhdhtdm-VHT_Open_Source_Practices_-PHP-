<?php
namespace App\OOP;

trait ProductLogger {
    public function log($msg) { return "[LOG " . date('H:i:s') . "]: $msg"; }
}