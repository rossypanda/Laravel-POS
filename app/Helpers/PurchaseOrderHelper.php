<?php 

namespace App\Helpers;
 
use Illuminate\Support\Facades\DB;

class PurchaseOrderHelper
{    

        
    /**
     * Check if there is an opening for po invoice
     *
     * @param  mixed $payment_type
     * @return void
     */
    public static function checkAvailablePOInvoice($payment_type){
       
         $data = DB::table('tbl_po_invoice')
            ->where('invoice_type',$payment_type)
            ->whereColumn('current_range','<','end_range')
            ->orderBy('date_added','asc')
            ->limit(1)
            ->get();
        //Check if current_range is zero
       
        if(!empty($data[0])){
            return  $data[0]->current_range == 0  ?  $data[0]->start_range : $data[0]->current_range + 1;  
        }
        return false;

    

    } 
    /**
     * Generate PO Reference
     *
     * @param  mixed $poNumber
     * @return String
     */
    public static function generatePOReference(){
         return 'PO-'.date("dmyhis");  
    }
}
