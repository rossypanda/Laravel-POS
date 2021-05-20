<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public $timestamps = false;
  /**
    * The table associated with the model.
    *
    * @var string
    */
   protected $table = 'roles';
   protected $primaryKey = 'id';

   protected $guarded = 'id';

      /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
   protected $fillable = [
       'id',
       'name'
   ];
}
