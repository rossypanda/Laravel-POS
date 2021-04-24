<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPoHeader extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_po_header', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';        
            $table->increments('po_header_id');
            $table->string('po_reference', 50);
            $table->foreignId('po_number');
            $table->date('date')->default(null);
            $table->foreignId('supplier_id');
            $table->string('supplier_address',50)->default(null);
            $table->string('payment_type',1)->default(null);
            $table->string('project_name',50)->default(null);
            $table->string('requested_by',50)->default(null);
            $table->string('canvassed_by',50)->default(null);
            $table->string('approved_by',50)->default(null);
            $table->string('project_in_charge',50)->default(null);
            $table->string('purchaser',50)->default(null);
            $table->string('manager',50)->default(null);
            $table->string('bank',50)->default(null);
            $table->string('contact_person',50)->default(null);
            $table->integer('terms')->default(null);
            $table->string('encoded_by', 20);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_po_header');
    }
}
