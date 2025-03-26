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
            Route::put('/{id}', 'TeacherController@update');
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


            // Route::get('/{id}', 'LessonController@show');
            // Route::put('/{id}', 'LessonController@update');
            Route::delete('/{lessonId}', 'LessonController@destroy');
            // Route::post('/search', 'LessonController@search');
        });
    });

});
