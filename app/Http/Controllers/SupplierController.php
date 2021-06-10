<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;

class SupplierController extends Controller
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
        return view('supplier.home-index');
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
         Supplier::create([
             'supplier' => $field_data['supplier'],
             'contact_person' => $field_data['contactPerson'],
             'address' => $field_data['address'],
             'email' => $field_data['email'],
             'contact_no' => $field_data['number'],
             'fax_no' => $field_data['fax'],
             'description' => $field_data['description'],
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
        
        $field_data = $request->data;
        $supplier = Supplier::find($field_data['supplier-id']);
        $supplier->supplier = $field_data['supplier-edit'];
        $supplier->contact_person = $field_data['contact-person-edit'];
        $supplier->address = $field_data['address-edit'];
        $supplier->email = $field_data['email-edit'];
        $supplier->contact_no = $field_data['number-edit'];
        $supplier->fax_no = $field_data['fax-edit'];
        // $supplier->bankaccount_no = $field_data['bank-edit'];
        $supplier->description = $field_data['description-edit'];

        $supplier->save();
    }


    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $supplier = Supplier::find($id);

        $supplier->delete();
    }

     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function fetchSupplierData()
    {
         return Supplier::all()->toJson();
    }
}
