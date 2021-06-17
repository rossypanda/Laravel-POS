<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PODetailHist extends Model
{
    use HasFactory;

    public $timestamps = false;
   /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_po_detail_hist';
    protected $primaryKey = 'po_detail_id';

    protected $guarded = 'po_detail_id';

       /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'po_header_id', 
        'item', 
        'unit', 
        'description', 
        'quantity', 
        'per_unit', 
        'price', 
        'brand', 
        'model', 
        'encoded_by'
    ];
}
