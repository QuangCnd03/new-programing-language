<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\Order\OrderRepositoryInterface;
use App\Repositories\OrderDetail\OrderDetailRepositoryInterface;
use App\Repositories\Student\StudentRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class OrderController extends Controller
{
    protected $studentRepo;
    protected $orderRepo;
    protected $orderDetailRepo;
    public function __construct(StudentRepositoryInterface $studentRepositoryInterface,
    OrderRepositoryInterface $orderRepositoryInterface,
    OrderDetailRepositoryInterface $orderDetailRepositoryInterface) {
        $this->studentRepo = $studentRepositoryInterface;
        $this->orderRepo = $orderRepositoryInterface;
        $this->orderDetailRepo = $orderDetailRepositoryInterface;
    }

    public function store(Request $request) {
        $validateInput = $request->validate([
            'courses' => 'required|array',
            'coupon_code' => 'nullable|string',
            'discount' => 'nullable|numeric',
            'total' => 'required|numeric',
            'student_id' => 'required|exists:students,id',
        ]);
        $student = $this->studentRepo->find($validateInput['student_id']);
        if(!$student) {
            return response()->json([
                'message' => 'Student not found',
            ], 404);
        }
        DB::beginTransaction();
        try {
            $order = $this->orderRepo->create([
                'student_id' => $student->id,
                'total' => $validateInput['total'],
                'order_status_id' => 1,
                'payment_date' => now(),
                'coupon_code' => $validateInput['coupon_code'],
                'discount' => $validateInput['discount'],
            ]);
            if($order) {
                $cart = $validateInput['courses'];
                foreach($cart as $item) {
                    $this->orderDetailRepo->create([
                        'order_id' => $order->id,
                        'course_id' => $item['id'],
                        'price' => $item['price']
                    ]);
                }
            }
            DB::commit();
            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => 'Order creation failed',
            ], 500);
        }
        
        
        
    }


}
