<?php 

namespace App\Helpers;
 
use Illuminate\Support\Facades\DB;
use App\Models\PODetail;
use App\Models\Supplier;
use App\Models\PODetailHist;
use Illuminate\Support\Facades\Auth;

class PurchaseOrderHelper
{    

        
    /**
     * Check if there is an opening for po invoice
     *
     * @param  mixed $payment_type
     * @return void
     */
    public static function checkAvailablePOInvoice(){
       
         $data = DB::table('tbl_po_invoice')
            ->whereColumn('current_range','<','end_range')
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
    public static function generatePOReference($poNumber){
         return 'PO-'.$poNumber.'-'.date("Y");  
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

    /**
     * Insert PO Detail
     *
     * @param int $po_header_id
     * @param Object $items
     */
   public static function insertPODetail($po_header_id,$items){
       foreach ($items as $item) {
           $po_detail =  PODetail::create([
                "po_header_id" => $po_header_id,
                "unit" => $item['unit'],
                "quantity" => $item['quantity'],
                //"description" => $item['description'],
                "item" => $item['description'],
                "per_unit" => $item['per_unit'],
                "brand" => $item['brand'],
                "model" => $item['model'],
                'encoded_by' => Auth::id()
            ]);
            //Insert record in tbl_po_detail_hist
            $po_detail_hist = $po_detail->replicate();
            $po_detail_hist->setTable('tbl_po_detail_hist');
            $po_detail_hist->save();
       }
   }

   
      /**
     * Generate PO Reference
     *
     * @param  mixed $poNumber
     * @return int $totalAmount
     */
    public static function calculateItemsTotalAmount($items){
      
        $totalAmount = 0;
       foreach($items as $item){
            $totalAmount =  $totalAmount + ($item['quantity'] * $item['per_unit']);
       }
       return $totalAmount;
   }

   
      /**
     * Generate Supplier Data with Supplier Id as key
     *
     * 
     * @return Array 
     */
    public static function getSupplierDataIdAsKey(){
        
        $data = Supplier::all()->toArray();
        $supplier_array = [];
        foreach($data as $supplier){
            $supplier_array[$supplier['supplier_id']] = [
            'supplier' => $supplier['supplier'],
            'address' => $supplier['address'],
            ];
        }
        return $supplier_array;
   }

   /**
     * Get the latest range
     *
     * 
     * @return Array 
     */
    public static function getLastEndRange(){
        $range = DB::table('tbl_po_invoice')
        ->select('end_range')
        ->orderBy('po_invoice_id','desc')
        ->limit(1)
        ->get()
        ->toArray();

        return $range < 0 ? 1 : $range[0]->end_range;
   }

   
   /**
     * Get Purchase Orders
     *
     * 
     * @return Array 
     */
   public static function getPurchaseOrders($status){
      return DB::table('tbl_po_header AS a')
       ->selectRaw("a.*,CASE WHEN a.payment_type = 'C' THEN 'Cash' WHEN a.payment_type = 'H' THEN 'Check' ELSE 'Cash/Check' END AS `type` ,b.supplier,c.name AS approver,d.name AS encoder")
       ->leftJoin('tbl_supplier AS b','a.supplier_id','=','b.supplier_id')
       ->leftJoin('users AS c','a.approved_by','=','c.id')
       ->leftJoin('users AS d','a.encoded_by','=','d.id')
       ->where('a.status',$status)
      // ->groupBy('a.po_number')
       ->orderBy('a.po_header_id','desc')
       ->get()
       ->toArray();

   }

}
