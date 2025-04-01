<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\Course\CourseRepositoryInterface;
use App\Repositories\Order\OrderRepositoryInterface;
use App\Repositories\Student\StudentRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected $studentRepo;
    protected $courseRepo;
    protected $orderRepo;
    public function __construct(StudentRepositoryInterface $studentRepositoryInterface,
    CourseRepositoryInterface $courseRepositoryInterface,
    OrderRepositoryInterface $orderRepositoryInterface) {
        $this->studentRepo = $studentRepositoryInterface;
        $this->courseRepo = $courseRepositoryInterface;
        $this->orderRepo = $orderRepositoryInterface;
    }    
    public function register(Request $request){
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:12',
            'email' => 'required|string|email|max:255|unique:students',
            'password' => 'required|string|min:6',
        ]); 
        $student = $this->studentRepo->create([
            'name' => $validatedData['name'],
            'phone' => $validatedData['phone'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);
        $token = $student->createToken('StudentToken')->plainTextToken;
        return response()->json([
            'message' => 'Student registered successfully',
            'token' => $token,
        ]);

    }
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $student = $this->studentRepo->getStudentByEmail($credentials['email']);
        if (!$student || !Hash::check($credentials['password'], $student->password)) {
            return response()->json([
                'message' => 'Invalid Username or Password',
            ], 401);
        }
        $token = $student->createToken('StudentToken')->plainTextToken;
        return response()->json([
            'message' => 'Student logged in successfully',
            'token' => $token,
        ]);
        
    }
    public function profile(Request $request){
        $student = Auth::guard('api_students')->user();
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        return response()->json([
            'message' => 'Profile fetched successfully',
            'student' => $student,
        ]);
    }
    public function logout(Request $request) {
        $student = Auth::guard('api_students')->user();
        if ($student) {
            $student->tokens()->delete();
        }
        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
    public function update(Request $request){
        $student = Auth::guard('api_students')->user();
        $validatedInput = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:12',
            'email' => 'required|string|email|max:255|unique:students,email,' . $student->id,
            'address' => 'required|string|max:255'
        ]);

        $this->studentRepo->update($student->id, $validatedInput);
        return response()->json([
            'message' => 'Profile updated successfully',
            'student' => $student,
        ]);
    }
    public function courses(){
        $student = Auth::guard('api_students')->user();
        if(!$student){
            return response()->json([
                'message' => 'Student not found',
            ], 404);
        }
        $courses = $this->courseRepo->getMycourses($student);
        return response()->json([
            'message' => 'Courses fetched successfully',
            'courses' => $courses,
        ]);
    }
    public function orders(){
        $student = Auth::guard('api_students')->user();
        if(!$student){
            return response()->json([
                'message' => 'Student not found',
            ], 404);
        }
        $orders = $this->orderRepo->getOrders($student);
        return response()->json([
            'message' => 'Orders fetched successfully',
            'orders' => $orders,
        ]);
    }
    public function orderDetail($orderId){
        $student = Auth::guard('api_students')->user();
        if(!$student){
            return response()->json([
                'message' => 'Student not found',
            ], 404);
        }
        $order = $this->orderRepo->getOrderDetail($orderId);
        return response()->json([
            'message' => 'Order detail fetched successfully',
            'order' => $order,
        ]);
        
    }
    public function changePassword(Request $request){
        $validatedInput = $request->validate([
            'old_password' => 'required|string|min:6',
            'password' => 'required|string|min:6',
        ]);
        $student = Auth::guard('api_students')->user();
        if(!$student){
            return response()->json([
                'message' => 'Student not found',
            ], 404);
        }
        $this->studentRepo->update($student->id, [
            'password' => Hash::make($validatedInput['password']),
        ]);
        return response()->json([
            'message' => 'Password updated successfully',
        ]);
       
    }
}
