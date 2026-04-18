<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ExerciseController;

Route::post('/bai2/tinh-dien-tich', [ExerciseController::class, 'tinhDienTichHCN']);
Route::post('/bai3/tinh-hinh-tron', [ExerciseController::class, 'tinhHinhTron']);
Route::post('/bai4/tinh-tien-dien', [ExerciseController::class, 'tinhTienDien']);
Route::post('/bai5/phat-sinh-mang', [ExerciseController::class, 'phatSinhMang']);
Route::post('/bai6/tim-kiem', [ExerciseController::class, 'timKiemMang']);
Route::post('/bai7/chao-theo-gio', [ExerciseController::class, 'chaoTheoGio']);
Route::post('/bai8/sap-xep', [ExerciseController::class, 'sapXepMang']);
Route::post('/bai9/dia-danh', [ExerciseController::class, 'danhLamThangCanh']);
Route::post('/bai10/dia-danh-sap-xep', [ExerciseController::class, 'danhLamThangCanhMoRong']);