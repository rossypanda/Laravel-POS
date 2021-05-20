<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPoDetail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_po_detail', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';        
            $table->increments('po_detail_id');
            $table->foreignId('po_header_id');
            $table->decimal('quantity', 8, 2);
            $table->string('unit',50)->nullable();
            $table->string('item',50)->nullable();
            $table->string('brand',50)->nullable();
            $table->string('model',50)->nullable();
            $table->decimal('per_unit', 8, 2);
            $table->decimal('price', 8, 2);
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
        Schema::dropIfExists('tbl_po_detail');
    }
}
