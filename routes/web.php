<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PoNumberController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\PoReportController;
// use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Route::get('/home', function () {
//     return view('home');
// });

// Route::get('/welcome', [WelcomeController::class, 'index']);
Route::resource('poNumber', PoNumberController::class);
Route::resource('purchaseOrder', PurchaseOrderController::class);
Route::resource('poReport', PoReportController::class);
Route::resource('supplier', SupplierController::class);
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
