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
            'start_range' => 1,
            'end_range' => 50,
            'current_range' => 0,
            'current_year' => date("Y"),
        ]);
    }
}
