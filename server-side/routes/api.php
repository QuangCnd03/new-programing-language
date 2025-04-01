<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Client\SignInController;
use App\Http\Controllers\Client\SignUpController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::group(['namespace' => 'App\Http\Controllers\Admin'], function () {
    Route::prefix('admin')->middleware('auth:api_users')->group(function() {
        Route::prefix('users')->group(function() {
            Route::get('/', 'UserController@index');
            Route::post('/', 'UserController@store');
            Route::get('/{id}', 'UserController@show');
            Route::put('/{id}', 'UserController@update');
            Route::delete('/{id}', 'UserController@destroy');
            Route::post('/search', 'UserController@search');
        });
        Route::prefix('students')->group(function() {
            Route::get('/', 'StudentController@index');
            Route::post('/', 'StudentController@store');
            Route::get('/{id}', 'StudentController@show');
            Route::put('/{id}', 'StudentController@update');
            Route::delete('/{id}', 'StudentController@destroy');
            Route::post('/search', 'StudentController@search');
        });
        Route::prefix('teachers')->group(function() {
            Route::get('/', 'TeacherController@index');
            Route::post('/', 'TeacherController@store');
            Route::get('/{id}', 'TeacherController@show');
            Route::post('/edit/{id}', 'TeacherController@update');
            Route::delete('/{id}', 'TeacherController@destroy');
            Route::post('/search', 'TeacherController@search');
        });
        Route::prefix('categories')->group(function() {
            Route::get('/', 'CategoryController@index');
            Route::post('/', 'CategoryController@store');
            Route::get('/{id}', 'CategoryController@show');
            Route::put('/{id}', 'CategoryController@update');
            Route::delete('/{id}', 'CategoryController@destroy');
            Route::post('/search', 'CategoryController@search');
        });
        Route::prefix('courses')->group(function() {
            Route::get('/', 'CourseController@index');
            Route::post('/', 'CourseController@store');
            Route::get('/{id}', 'CourseController@show');
            Route::put('/{id}', 'CourseController@update');
            Route::delete('/{id}', 'CourseController@destroy');
            Route::post('/search', 'CourseController@search');
        });
        Route::prefix('lessons')->group(function() {
            Route::get('/{courseId}', 'LessonController@index');
            Route::post('/{courseId}', 'LessonController@store');
            Route::post('/{courseId}/module', 'LessonController@storeModule');
            Route::get('/edit/{lessonId}', 'LessonController@show');
            Route::post('/edit/{lessonId}', 'LessonController@update');
            Route::delete('/{lessonId}', 'LessonController@destroy');
            Route::post('/search', 'LessonController@search');
        });
    });
    Route::prefix('auth')->group(function() {
        Route::post('/login', 'AuthController@login')->name('login');
        Route::get('/profile', 'AuthController@profile')->name('profile')->middleware('auth:api_users');
        Route::post('/logout', 'AuthController@logout')->name('logout')->middleware('auth:api_users');
    });
});



            // Client pages
Route::group(['namespace' => 'App\Http\Controllers\Client'], function () {
    Route::post('/sign-up', 'AuthController@register');
    Route::post('/sign-in', 'AuthController@login');
    Route::get('/profile', 'AuthController@profile')->middleware('auth:api_students');
    Route::post('/logout', 'AuthController@logout')->middleware('auth:api_students');
    Route::get('/courses', 'CourseController@index');
    Route::get('/courses/{courseSlug}', 'CourseController@show');
    Route::get('/coupon/{couponCode}', 'CouponController@show');
    Route::post('/order', 'OrderController@store');
    Route::post('/checkout', 'CheckoutController@store');
    Route::post('/update', 'AuthController@update')->middleware('auth:api_students');
    Route::get('/my-courses', 'AuthController@courses')->middleware('auth:api_students');
    Route::get('/my-orders', 'AuthController@orders')->middleware('auth:api_students');
    Route::get('/my-order-detail/{orderId}', 'AuthController@orderDetail')->middleware('auth:api_students');
    Route::get('/lesson/{lessonSlug}', 'LessonController@show');
    Route::post('/change-password', 'AuthController@changePassword')->middleware('auth:api_students');
});

