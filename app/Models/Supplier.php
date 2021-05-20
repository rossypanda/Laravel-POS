<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
  public $timestamps = false;
  /**
    * The table associated with the model.
    *
    * @var string
    */
   protected $table = 'tbl_supplier';
   protected $primaryKey = 'supplier_id';

   protected $guarded = 'supplier_id';

      /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
   protected $fillable = [
       'supplier',
       'address',
       'contact_person',
       'zip_code',
       'contact_no',
       'email',
       'fax_no',
       'terms',
       'bankaccount_no',
       'company_id',
       'date_added',
       'description',
       'encoded_by',
   ];
}
