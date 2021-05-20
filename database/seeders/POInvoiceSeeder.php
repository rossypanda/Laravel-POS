<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class POInvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_po_invoice')->insert([
            'company_id' => random_int(1,10),
            'start_range' => random_int(100,500),
            'end_range' => random_int(100,500),
            'invoice_type' => 'C',
            'invoice_usage' => 0,
            'date_added' => date("Y/m/d"),
            'encoded_by' => 1
        ]);
    }
}
