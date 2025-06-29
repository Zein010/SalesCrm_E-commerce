<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\TagController;
use App\Models\Client;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::resource("item", ItemController::class);
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('clients', ClientController::class);
    Route::resource('api/comments', CommentController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('tags', TagController::class);
    Route::resource('api/items', ItemController::class);

    Route::get('items', function () {
        return Inertia::render('admin/item/items');
    })->name('items.page');
});
Route::get('/greeting', function () {
    return "hello world";
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
