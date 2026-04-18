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
require __DIR__.'/settings.php';
