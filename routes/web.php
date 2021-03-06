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

Auth::routes();
Route::middleware(['web'])->group(function () {
        // Route::get('/welcome', [WelcomeController::class, 'index']);
    Route::resource('poNumber', 'PoNumberController');
    Route::resource('purchaseOrder', 'PurchaseOrderController');
    Route::resource('poReport', 'PoReportController');
    Route::resource('supplier', 'SupplierController');
    Route::resource('permission', 'PermissionController');
    Route::resource('role', 'RoleController');
    Route::resource('user', 'UserController');
    Route::resource('reset','ResetController');
    // Route::resource('user_register', 'UserController');
    Route::get('fetch/supplier','SupplierController@fetchSupplierData');
    Route::get('fetch/poNumber','PoNumberController@fetchPONumberData');
    Route::get('fetch/purchaseOrder','PurchaseOrderController@fetchPurchaseOrderData');
    Route::get('fetch/purchase_order/{id}','PurchaseOrderController@fetchPOFullDetail');
    Route::get('fetch/po_dropdown','PurchaseOrderController@fetchPurchaseOrderDropdownOptions');
    Route::get('fetch/role_option','UserController@fetchRoleOptions');
    Route::get('create/purchase_order','PurchaseOrderController@createPO');
    Route::get('fetch/pdf/{id}','PurchaseOrderController@generatePdf');
    Route::get('fetch/user','UserController@fetchUserData');
    Route::get('fetch/user_status','UserController@fetchUserStatusOptions');
    Route::get('fetch/role','RoleController@fetchRoleData');
    Route::get('fetch/permission','PermissionController@fetchPermissionData');



    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::view('/user_register', 'user.create-user');


    Route::get('call/reset','ResetController@reset');

    //
});


