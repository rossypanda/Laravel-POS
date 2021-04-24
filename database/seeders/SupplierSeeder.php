<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_supplier')->insert([
            'supplier' => Str::random(10).' supplier',
            'address' => Str::random(10).' address',
            'zip_code' => random_int(1,100),
            'contact_no' => random_int(1,100),
            'email' => Str::random(10).'@email.com',
            'fax_no' => random_int(1,100),
            'contact_person' => Str::random(10).' contact_person',
            'terms' => 0,
            'bankaccount_no' => random_int(1,100),
            'company_id' => random_int(1,100),
            'date_added' => date("Y/m/d"),
            'description' => Str::random(10).' description',
            'encoded_by' => 'seeder'
        ]);
    }
}
