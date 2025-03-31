<?php
namespace App\Repositories\Order;

use App\Models\Order;
use App\Repositories\BaseRepository;
use App\Repositories\Order\OrderRepositoryInterface;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface{
    public function getModel(){
        return Order::class;
    }
    public function getOrderById($id) {
        return $this->model->where('id', $id)->first();
    }
    public function getOrders($student) {
        return $this->model->where('student_id', $student->id)->with('ordersStatus')->get();
    }
    public function getOrderDetail($id) {
        return $this->model->with(['orderDetail.course.teacher', 'ordersStatus'])->find($id);
    }
}