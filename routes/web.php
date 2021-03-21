<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PoNumberController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\PoReportController;
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

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/home', function () {
//     return view('home');
// });

Route::get('/home', [HomeController::class, 'index']);
Route::get('/supplier', [SupplierController::class, 'index']);
Route::get('/poNumber', [PoNumberController::class, 'index']);
Route::get('/purchaseOrder', [PurchaseOrderController::class, 'index']);
Route::get('/poReport', [PoReportController::class, 'index']);
