<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PoReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return [
        //     'name'       => $this->name,
        //     'email'      => $this->email,
        //     'address'    => $this->address,
        //     'created_at' => Carbon::parse($this->created_at)->toDayDateTimeString(),
        // ];

        return [
            'po_reference'         => $this->po_reference,
            'po_number'            => $this->po_number,
            'date'                 => $this->date,
            'supplier_id'          => $this->supplier_id,
            'supplier_address'     => $this->supplier_address,
            'payment_type'         => $this->payment_type,
            'project_name'         => $this->project_name,
            'requested_by'         => $this->requested_by,
            'canvassed_by'         => $this->canvassed_by,
            'approved_by'          => $this->approved_by,
            'project_in_charge'    => $this->project_in_charge,
            'purchaser'            => $this->purchaser,
            'manager'              => $this->manager,
            'bank'                 => $this->bank,
            'contact_person'       => $this->contact_person,
            'terms'                => $this->terms,
            'total_amount'         => $this->total_amount,
            'status'               => $this->status,
            'encoded_by'            => $this->encoded_by,   
        ];
    }
}
