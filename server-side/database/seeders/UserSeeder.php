<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->fullname = $faker->name;
            $user->phone = $faker->phoneNumber;
            $user->email = $faker->unique()->safeEmail;
            $user->password = Hash::make('1234567');
            $user->save();
        }
    }
}