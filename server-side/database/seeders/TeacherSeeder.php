<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teachers = [];
        for ($i = 1; $i <= 10; $i++) {
            $teachers[] = [
                'name' => "Teacher $i",
                'slug' => Str::slug("Teacher $i"),
                'description' => "This is the description for Teacher",
                'image' => "",
                'exp' => rand(1, 20),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('teachers')->insert($teachers);
    }
}