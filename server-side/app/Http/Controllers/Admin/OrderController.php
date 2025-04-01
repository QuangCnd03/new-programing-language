<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Repositories\Order\OrderRepositoryInterface;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderRepo;
    public function __construct(OrderRepositoryInterface $orderRepositoryInterface) {
        $this->orderRepo = $orderRepositoryInterface;
    }
    public function index()
    {
        $orders = $this->orderRepo->getOrderAll();
        return response()->json(['orders' => $orders]);
    }
    public function show($orderId) {
        $order = $this->orderRepo->getOrderDetail($orderId);
        return response()->json(['order' => $order]);
    }
}
