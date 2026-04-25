<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/bai2', function () {
    return Inertia::render('Lab2/Bai2');
});
Route::get('/bai3', function () {
    return Inertia::render('Lab2/Bai3'); 
});

Route::get('/bai4', function () {
    return Inertia::render('Lab2/Bai4'); 
});

Route::get('/bai5', function () {
    return Inertia::render('Lab2/Bai5'); 
});

Route::get('/bai6', function () {
    return Inertia::render('Lab2/Bai6'); 
});
Route::get('/bai7', function () {
    return Inertia::render('Lab2/Bai7'); 
});
Route::get('/bai8', function () {
    return Inertia::render('Lab2/Bai8'); 
});
Route::get('/bai9', function () {
    return Inertia::render('Lab2/Bai9'); 
});
Route::get('/bai10', function () {
    return Inertia::render('Lab2/Bai10'); 
});
// --- LAB 3: BÀI TẬP OOP ---
Route::get('/oop/bai1-4', function () {
    return Inertia::render('Lab3_OOP/Bai1_4'); 
});
Route::get('/oop/bai5-8', function () {
    return Inertia::render('Lab3_OOP/Bai5_8'); 
});

Route::get('/oop/bai9-11', function () {
    return Inertia::render('Lab3_OOP/Bai9_11'); 
});

Route::get('/oop/bai12-15', function () {
    return Inertia::render('Lab3_OOP/Bai12_15'); 
});
Route::get('/oop/bai16-20', function () {
    return Inertia::render('Lab3_OOP/Bai16_20'); 
});
require __DIR__.'/settings.php';
