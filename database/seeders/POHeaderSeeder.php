<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class POHeaderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_po_header')->insert([
            'po_reference' => Str::random(10),
            'po_number' => random_int(1,100),
            'date' => date("Y/m/d"),
            'supplier_id' => random_int(1,100),
            'supplier_address' => Str::random(10).' address',
            'payment_type' => 'C',
            'project_name' => Str::random(10).' project_name',
            'requested_by' => Str::random(10).' requested_by',
            'canvassed_by' => Str::random(10).' canvassed_by',
            'approved_by' => Str::random(10).' approved_by',
            'project_in_charge' => Str::random(10).' project_in_charge',
            'purchaser' => Str::random(10).' purchaser',
            'manager' => Str::random(10).' manager',
            'bank' => Str::random(10).' bank',
            'contact_person' => Str::random(10).' contact_person',
            'terms' => 0,
            'encoded_by' => 'seeder'
        ]);
    }
}
