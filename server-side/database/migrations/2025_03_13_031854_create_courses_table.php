<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 200)->nullable();
            $table->string('slug', 200)->nullable();
            $table->string('code', 50)->nullable();
            $table->text('detail')->nullable();
            $table->integer('teacher_id')->unsigned();
            $table->string('thumbnail', 200)->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->decimal('sale_price', 10, 2)->default(0);
            $table->float('duration', 8, 2)->default(0);
            $table->boolean('is_document')->default(0);
            $table->text('support')->nullable();
            $table->integer('view')->default(0);
            $table->integer('levels')->default(0);
            $table->boolean('status')->default(0);
            $table->timestamps();

            $table->foreign('teacher_id')->references('id')->on('teachers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
