<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PoNumberController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\PoReportController;
use App\Http\Controllers\PemissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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
//     if(auth()->user()) {
//         auth()->user()->assignRole('admin');
//     }
//     return view('welcome');
// });

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Route::get('/home', function () {
//     return view('home');
// });

// Route::get('/welcome', [WelcomeController::class, 'index']);
Route::resource('poNumber', 'PoNumberController');
Route::resource('purchaseOrder', 'PurchaseOrderController');
Route::resource('poReport', 'PoReportController');
Route::resource('supplier', 'SupplierController');
Route::get('fetch/supplier','SupplierController@fetchSupplierData');
Route::get('fetch/poNumber','PONumberController@fetchPONumberData');
Route::get('fetch/purchaseOrder','PurchaseOrderController@fetchPurchaseOrderData');
Route::get('fetch/po_dropdown','PurchaseOrderController@fetchPurchaseOrderDropdownOptions');
Route::get('create/purchase_order','PurchaseOrderController@createPO');
Route::get('fetch/user','UserController@fetchUserData');
Route::get('fetch/role','RoleController@fetchRoleData');
Route::get('fetch/permission','PermissionController@fetchPermissionData');
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::resource('permission', 'PermissionController');
Route::resource('role', 'RoleController');
Route::resource('user', 'UserController');
