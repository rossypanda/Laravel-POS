<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\PurchaseOrderHelper;
use App\Models\PurchaseOrder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Supplier;
use App\Models\PODetail;
use Illuminate\Support\Facades\Auth;




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
            DB::transaction(function () use ($poNumber,$formData) {
                //Insert and return PO header id
                $po_header_id = PurchaseOrder::create([
                    'po_reference' => PurchaseOrderHelper::generatePOReference($poNumber['po_number']),
                    'po_number' => $poNumber['po_number'],
                    'date' => date('Y-m-d'),
                    'supplier_id' => $formData['supplier'],
                    'supplier_address' => $formData['address'],
                    'payment_type' => $formData['payment_type'],
                    'project_name' => $formData['project_name'],
                    'requested_by' => $formData['requested_by'],
                    'canvassed_by' => $formData['canvassed_by'],
                    'description' => $formData['description'],
                    // 'approved_by' => $formData['approved_by'],
                    //'project_in_charge' => $formData['project_name'],
                    //'purchaser' => $formData['project_name'],
                    //'manager' => $formData['project_name'],
                    // 'bank' => $formData['project_name'],
                    // 'contact_person' => $formData['project_name'],
                    //'total_amount' => PurchaseOrderHelper::calculateItemsTotalAmount($formData['items']),
                    'terms' => json_encode($formData['terms']),
                    'status' => 'F',
                    'encoded_by' => Auth::id()
                ]);
                $po_header_hist = $po_header_id->replicate();
                $po_header_hist->setTable('tbl_po_header_hist');
                $po_header_hist->save();
                PurchaseOrderHelper::insertPODetail($po_header_id->po_header_id,$formData['items']);
                //Update Current Range
                PurchaseOrderHelper::updateCurrentRange($poNumber['po_invoice_id'],$poNumber['po_number']);
            });
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
        return view('purchaseOrder.view-po')
            ->with('id', $id);
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
       
        return response(([
            'pending' => PurchaseOrder::where('status','F')->get(),
            'approved' => PurchaseOrder::where('status','A')->get(),
            'cancelled' => PurchaseOrder::where('status','C')->get(),
            'supplier' => [Supplier::all()->pluck('address','supplier_id')],
            'users' => [User::all()->pluck('name','id')]
        ])
        );
   
    }

    public function fetchPurchaseOrderDropdownOptions(){
  
        return response()->json(
            array(
                'user' =>  User::all(),
                'supplier' =>  Supplier::all(),
                'supplier_address' =>  Supplier::all()->pluck('address','supplier_id')
            )
        );
      
   
    }

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createPO()
    {
        return view('purchaseOrder.create-po');
    }

    /**
     * Display the full detail of individal Purchase Order
     *
     * @return \Illuminate\Http\Response
     */
    public function fetchPOFullDetail($id){
        $po =  PurchaseOrder::where('po_header_id',$id)->get()->toArray();
        return response()->json(
            array(
                'po_header' =>  PurchaseOrder::where('po_header_id',$id)->get(),
                'po_detail' =>  PODetail::where('po_header_id',$id)->get(),
                'supplier' =>  Supplier::all(),
                'terms' =>   json_decode($po[0]['terms']),
                'users' =>  User::all()
            )
        );
    }

       /**
     * Display the full detail of individal Purchase Order
     *
     * @return \Illuminate\Http\Response
     */
    public function generatePdf($id){
        $po =  PurchaseOrder::where('po_header_id',$id)->get()->toArray();
            $data = [
                'po_header' =>  PurchaseOrder::where('po_header_id',$id)->get()->toArray()[0],
                'po_detail' =>  PODetail::where('po_header_id',$id)->get()->toArray(),
                'supplier' =>  PurchaseOrderHelper::getSupplierDataIdAsKey(),
                'terms' =>   json_decode($po[0]['terms']),
                'users' =>  User::pluck('name','id')->toArray()
            ];
            //dd($data);
        $pdf = \PDF::loadView('pdf.po-pdf',$data);
        return $pdf->download($po[0]['po_reference'].'.pdf');
       // return view('pdf.po-pdf',$data);
    }
}
