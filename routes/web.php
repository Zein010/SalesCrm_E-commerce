<?php

use App\Http\Controllers\ItemController;
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
     Route::get('clients', function () {
        return Inertia::render('clients');
    })->name('clients');
      Route::get('items', function () {
        return Inertia::render('items');
    })->name('items');
});
Route::get('/greeting', function () {
    return "hello world";
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
