<?php

namespace App\Http\Helper;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PurchaseOrderHelper
{    

        
    /**
     * Check if there is an opening for po invoice
     *
     * @param  mixed $payment_type
     * @return void
     */
    public static function checkAvailablePOInvoice( $payment_type){
        DB::table('tbl_po_invoice')
            ->select('');

    }
}
