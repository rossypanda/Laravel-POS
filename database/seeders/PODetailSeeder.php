<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PODetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_po_detail')->insert([
            'po_header_id' => random_int(10,20),
            'item' => Str::random(10).'item',
            'description' => Str::random(10).' description',
            'quantity' => 100,
            'price' => 99.99,
            'brand' => Str::random(10).' brand',
            'model' => Str::random(10).' model',
            'encoded_by' => 'seeder'
        ]);
    }
}
