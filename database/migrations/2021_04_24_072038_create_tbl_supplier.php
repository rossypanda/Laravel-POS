<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateTblSupplier extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_supplier', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';        
            $table->increments('supplier_id');
            $table->string('supplier', 50);
            $table->string('address',100);
            $table->integer('zip_code')->nullable();
            $table->string('contact_no',50)->nullable();
            $table->string('email',50)->nullable();
            $table->string('fax_no',50)->nullable();
            $table->string('contact_person',50)->nullable();
            $table->integer('terms')->nullable();
            $table->string('bankaccount_no',50)->nullable();
            $table->integer('company_id')->nullable();
            $table->timestamp('date_added')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('description')->nullable();
            $table->string('encoded_by', 20)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_supplier');
    }
}
