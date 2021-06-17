<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPoHeaderHist extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_po_header_hist', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';        
            $table->increments('po_header_id');
            $table->string('po_reference', 50);
            $table->foreignId('po_number');
            $table->date('date')->nullable();
            $table->foreignId('supplier_id');
            $table->string('supplier_address',50)->nullable();
            $table->string('payment_type',1)->nullable();
            $table->string('project_name',50)->nullable();
            $table->string('requested_by',50)->nullable();
            $table->string('canvassed_by',50)->nullable();
            $table->string('approved_by',50)->nullable();
            $table->string('project_in_charge',50)->nullable();
            $table->string('purchaser',50)->nullable();
            $table->string('manager',50)->nullable();
            $table->string('bank',50)->nullable();
            $table->string('contact_person',50)->nullable();
            $table->json('terms')->nullable();
            $table->decimal('total_amount', 8, 2);
            $table->string('status',1)->default('F');
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
        Schema::dropIfExists('tbl_po_header_hist');
    }
}
