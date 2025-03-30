<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\Order\OrderRepositoryInterface;
use App\Repositories\Student\StudentRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    protected $orderRepo;
    protected $studentRepo;
    public function __construct(OrderRepositoryInterface $orderRepositoryInterface,
    StudentRepositoryInterface $studentRepositoryInterface) {
        $this->orderRepo = $orderRepositoryInterface;
        $this->studentRepo = $studentRepositoryInterface;
    }
    
    public function store(Request $request) {
        
        $order = $this->orderRepo->getOrderById($request->order_id);
        $student = $this->studentRepo->find($request->student_id);
        if(!$order || !$student) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
            ], 404);
        }

        $paymentDate = strtotime($order->payment_date);
        $now = strtotime(date('Y-m-d H:i:s'));
        $diff = $now - $paymentDate;
        if($diff > 60000) { // set time
            return response()->json([
                'success' => false,
                'message' => 'Payment time has expired. Please try again.',
            ], 404);
        }
        $courses = [];
        foreach($request->courses as $course) {
            $courses[$course['id']] = [
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ];
        }
        $this->studentRepo->createStudentCourses($student, $courses);
        // Cập nhật trạng thái đơn hàng
        $this->orderRepo->update($order->id, [
            'payment_complete_date' => now(),
            'order_status_id' => 2
        ]);
        

        return response()->json([
            'success' => true,
            'message' => 'Payment confirmation successful!',
            'order' => $order
        ], 200);
    }
}
