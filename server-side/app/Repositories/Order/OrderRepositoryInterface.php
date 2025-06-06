<?php 
namespace App\Repositories\Order;

use App\Repositories\RepositoryInterface;
interface OrderRepositoryInterface extends RepositoryInterface{
    public function getOrderById($id);
    public function getOrders($student);
    public function getOrderDetail($id);
    public function getOrderAll();
}
