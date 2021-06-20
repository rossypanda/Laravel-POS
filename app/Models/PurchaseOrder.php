<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    public $timestamps = false;
    /**
      * The table associated with the model.
      *
      * @var string
      */
     protected $table = 'tbl_po_header';
     protected $primaryKey = 'po_header_id';
     protected $guarded = 'po_header_id';
  
        /**
      * The attributes that are mass assignable.
      *
      * @var array
      */
     protected $fillable = [
        'po_reference',
        'po_number',
        'date',
        'supplier_id',
        'supplier_address',
        'payment_type',
        'project_name',
        'requested_by',
        'canvassed_by',
        'approved_by',
        'project_in_charge',
        'purchaser',
        'manager',
        'bank',
        'contact_person',
        'terms',
        'description',
        'remarks',
        'status',
        'encoded_by'
     ];
}
