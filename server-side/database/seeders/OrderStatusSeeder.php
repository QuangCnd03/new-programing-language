<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

     public function run(): void
     {
         $orderStatus = new OrderStatus();
         $data = [
             ['name' => 'Chờ thanh toán', 'color' => 'warning', 'is_success' => false], 
             ['name' => 'Completed' , 'color' => 'success', 'is_success' => true], 
             ['name' => 'Payment Failed', 'color' => 'danger', 'is_success' => false], 
             ['name' => 'Đã hủy thanh toán', 'color' => 'danger', 'is_success' => false]
         ];
         $orderStatus::insert($data);
     }
}
