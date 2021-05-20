<?php 

namespace App\Helpers;
 
use Illuminate\Support\Facades\DB;
use App\Models\PODetail;

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
            return  $data[0]->current_range == 0  ?  [ 'po_number' => $data[0]->start_range, 'po_invoice_id' =>$data[0]->po_invoice_id ] :  [ 'po_number' => $data[0]->current_range + 1, 'po_invoice_id' =>$data[0]->po_invoice_id ];  
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


      /**
     * Generate PO Reference
     *
     * @param  mixed $poNumber
     * @return String
     */
    public static function updateCurrentRange($invoice_id,$range){
        DB::table('tbl_po_invoice')
        ->where('po_invoice_id',$invoice_id)
        ->update(['current_range' => $range])
        ;
   }

   public static function insertPODetail($po_header_id,$items){

    foreach($items as $item)
       PODetail::create([
            "po_header_id" => $po_header_id,
            "unit" => $item['unit'],
            "quantity" => $item['quantity'],
            "description" => $item['description'],
            "item" => $item['description'],
            "per_unit" => $item['per_unit'],
            "price" => $item['amount'],
            "brand" => $item['brand'],
            "model" => $item['model']
       ]);
   }
}