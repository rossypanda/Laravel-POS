<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserStatus extends Model
{
    use HasFactory;

    public $timestamps = false;
    /**
      * The table associated with the model.
      *
      * @var string
      */
     protected $table = 'tbl_user_status';
     protected $primaryKey = 'status_id';
  
     protected $guarded = 'status_id';
  
        /**
      * The attributes that are mass assignable.
      *
      * @var array
      */
     protected $fillable = [
         'status_id',
         'status_name'
     ];
}
