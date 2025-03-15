<?php

use App\Http\Controllers\Client\SignInController;
use App\Http\Controllers\Client\SignUpController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('client')->group(function () {
    Route::post('/sign-in', [SignInController::class, 'store']);
    Route::post('/sign-up', [SignUpController::class, 'store']);
    Route::middleware('auth:sanctum')->get('/profile', [SignInController::class, 'profile']);
});
Route::group(['namespace' => 'App\Http\Controllers\Admin'], function () {
    Route::prefix('admin')->group(function() {
        Route::prefix('users')->group(function() {
            Route::get('/', 'UserController@index');
            Route::post('/', 'UserController@store');
            Route::put('/{id}', 'UserController@update');
            Route::delete('/{id}', 'UserController@destroy');
        });
    });

});