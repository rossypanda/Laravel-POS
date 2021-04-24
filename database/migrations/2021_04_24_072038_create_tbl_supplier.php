<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->integer('zip_code')->default(null);
            $table->string('contact_no',50)->default(null);
            $table->string('email',50)->default(null);
            $table->string('fax_no',50)->default(null);
            $table->string('contact_person',50)->default(null);
            $table->integer('terms')->default(null);
            $table->string('bankaccount_no',50)->default(null);
            $table->integer('company_id');
            $table->timestamp('date_added');
            $table->string('description');
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
        Schema::dropIfExists('tbl_supplier');
    }
}
