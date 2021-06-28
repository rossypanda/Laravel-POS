<?php 

namespace App\Helpers;
 
use Illuminate\Support\Facades\DB;
use App\Models\PODetail;
use App\Models\Supplier;
use App\Models\PODetailHist;
use Illuminate\Support\Facades\Auth;

class UserHelper
{    

   
   /**
     * Get Purchase Orders
     *
     * 
     * @return Array 
     */
   public static function getUserRoles($userId){
      return DB::table('role AS a')
       ->selectRaw("a.id AS role_id, a.name AS role_name")
       ->leftJoin('role_user AS b','a.id','=','b.role_id')
       ->where('b.user_id',$userId)
       ->get()
       ->toArray();

   }

}
