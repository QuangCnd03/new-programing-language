<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('student_id')->unsigned()->nullable();
            $table->float('total', 10)->default(0);
            $table->float('discount', 10)->default(0);
            $table->string('coupon_code', 100)->nullable();
            $table->integer('order_status_id')->unsigned()->nullable();
            $table->timestamp('payment_date')->nullable();
            $table->timestamp('payment_complete_date')->nullable();
            $table->timestamps();

            $table->foreign('order_status_id')->references('id')->on('orders_status')->onDelete('set null');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
}
