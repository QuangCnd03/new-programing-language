<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 200);
            $table->string('slug', 200);
            $table->integer('course_id')->unsigned()->nullable();
            $table->integer('video_id')->unsigned()->nullable();
            $table->integer('document_id')->unsigned()->nullable();
            $table->integer('parent_id')->unsigned()->nullable();
            $table->boolean('is_trial')->default(false);
            $table->integer('views')->default(0);
            $table->integer('position')->default(0);
            $table->float('durations');
            $table->text('description')->nullable();
            $table->boolean('status')->default(0);
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses')->nullOnDelete();
            $table->foreign('video_id')->references('id')->on('videos')->nullOnDelete();
            $table->foreign('document_id')->references('id')->on('documents')->nullOnDelete();
            $table->foreign('parent_id')->references('id')->on('lessons')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
}
