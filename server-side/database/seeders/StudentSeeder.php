<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('students')->insert([
                'name' => 'Student ' . $i,
                'email' => 'student' . $i . '@example.com',
                'phone' => '123456789' . $i,
                'password' => Hash::make('password' . $i),
                'address' => 'Address ' . $i,
                'status' => $i % 2 == 0 ? 1 : 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
