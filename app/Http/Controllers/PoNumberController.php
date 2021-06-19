<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PONumber;

class PoNumberController extends Controller
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
        return view('poNumber.home-index');
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
         PONumber::create([
             'start_range' => $field_data['startRange'],
             'end_range' => $field_data['endRange'],
             'invoice_type' => $field_data['invoiceType']
         ]);
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
        $po = PONumber::findOrFail($id);
        $po->end_range = $request->end_range;
        $po->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $po = PONumber::find($id);

        $po->delete();
    }


      /**
     * Get all data of tbl_po_invoice.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function fetchPONumberData()
    {
        return PONumber::all()->toJson();
    }
}
