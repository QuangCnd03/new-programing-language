<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\Student\StudentRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected $studentRepo;
    public function __construct(StudentRepositoryInterface $studentRepositoryInterface) {
        $this->studentRepo = $studentRepositoryInterface;
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
}
