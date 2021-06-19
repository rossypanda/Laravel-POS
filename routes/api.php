<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('username/{username}/password/{password}', function($username,$password)
{
    if(Auth::attempt(['username' => $username,'password' => $password ])){
      return  response()->json(true);
    }
    return  response()->json(false);
});


Route::get('authenticate/user', function(Request $request)
{
    if(Auth::attempt(['username' => $request->username,'password' => $request->password ])){
        return  response()->json(true);
    }
    return  response()->json(false);
});