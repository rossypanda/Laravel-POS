<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPoNumber extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_po_number', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';        
            $table->increments('po_num_id');
            $table->foreignId('po_header_id');
            $table->integer('start_range')->default(null);
            $table->integer('end_range')->default(null);
            $table->string('po_type',1)->default(null);
            $table->integer('po_usage')->default(0);
            $table->timestamp('date_encoded');
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
        Schema::dropIfExists('tbl_po_number');
    }
}
