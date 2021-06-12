<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateTblPoInvoice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_po_invoice', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';        
            $table->increments('po_invoice_id');
            $table->integer('start_range')->nullable();
            $table->integer('end_range')->nullable();
            $table->integer('current_range')->default(0);
            $table->string('invoice_type', 1);
            $table->smallInteger('invoice_usage');
            $table->timestamp('date_added')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->integer('encoded_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_po_invoice');
    }
}
