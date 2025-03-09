<?php

use App\Http\Controllers\SignInController;
use App\Http\Controllers\SignUpController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/sign-in', [\App\Http\Controllers\Backend\SignInController::class, 'store']);
Route::post('/sign-up', [\App\Http\Controllers\Backend\SignUpController::class, 'store']);
Route::middleware('auth:sanctum')->get('/profile', [\App\Http\Controllers\Backend\SignInController::class, 'profile']);


