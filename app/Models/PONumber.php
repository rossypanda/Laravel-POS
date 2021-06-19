<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PONumber extends Model
{
    use HasFactory;

    public $timestamps = false;
   /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_po_invoice';
    protected $primaryKey = 'po_invoice_id';

    protected $guarded = 'tbl_po_invoice';

       /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'start_range',
      'end_range',
      'current_range',
      'current_year',
      'status',
      'added_at'
    ];
}
