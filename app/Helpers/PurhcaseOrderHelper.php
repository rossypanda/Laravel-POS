<?php

namespace App\Helpers;

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
    public static function checkAvailablePOInvoice($payment_type){
        $invoice_data = DB::table('tbl_po_invoice')
            ->where('invoice_type',$payment_type)
            ->whereColumn('current_range','<','end_range')
            ->orderBy('date_added','asc')
            ->limit(1);

        
    }
}
