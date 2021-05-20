<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\PurchaseOrderHelper;
use App\Models\PurchaseOrder;
class PurchaseOrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('purchaseOrder.home-index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $formData = $request->data;
        $formData['items'];
        $poNumber = PurchaseOrderHelper::checkAvailablePOInvoice($formData['payment_type']);
        if($poNumber){

            //Insert and return PO header id
            $po_header_id = PurchaseOrder::create([
                'po_reference' => PurchaseOrderHelper::generatePOReference(),
                'po_number' => $poNumber['po_number'],
                'date' => date('Y-m-d'),
                'supplier_id' => $formData['supplier'],
                'supplier_address' => $formData['address'],
                'payment_type' => $formData['payment_type'],
                'project_name' => $formData['project_name'],
                'requested_by' => $formData['requested_by'],
                'canvassed_by' => $formData['canvassed_by'],
                'approved_by' => $formData['approved_by'],
                //'project_in_charge' => $formData['project_name'],
                //'purchaser' => $formData['project_name'],
                //'manager' => $formData['project_name'],
               // 'bank' => $formData['project_name'],
               // 'contact_person' => $formData['project_name'],
                'terms' => json_encode($formData['terms']),
                'status' => 'F',
                'encoded_by'  => $formData['requested_by']
            ])->po_header_id;
            PurchaseOrderHelper::insertPODetail($po_header_id,$formData['items']);
            //Update Current Range
            PurchaseOrderHelper::updateCurrentRange($poNumber['po_invoice_id'],$poNumber['po_number']);
            return response()->json($poNumber['po_number']);
        }
        return response()->json(false);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function fetchPurchaseOrderData(){
        dd(PurchaseOrderHelper::checkAvailablePOInvoice('C'));
    }
}
