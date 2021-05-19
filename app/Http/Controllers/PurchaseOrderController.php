<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\PurchaseOrderHelper;

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
        $field_data = $request->data;
        $invoice_data  = PurchaseOrderHelper::checkAvailablePOInvoice('C');
        dd($invoice_data);
        // Supplier::create([
        //     'supplier' => $field_data['supplier'],
        //     'contact_person' => $field_data['contactPerson'],
        //     'address' => $field_data['address'],
        //     'email' => $field_data['email'],
        //     'contact_no' => $field_data['number'],
        //     'fax_no' => $field_data['fax'],
        //     'bankaccount_no' => $field_data['bank'],
        //     'description' => $field_data['description'],
        // ]);
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
}
