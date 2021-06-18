<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PoReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\PurchaseOrder::factory(500)->create();
        \App\Models\PODetail::factory(500)->create();
    }
}
