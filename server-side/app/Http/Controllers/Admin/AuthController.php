<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\Student\StudentRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct() {
    }
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $credentials['email'])->first();
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid Username or Password',
            ], 401);
        }
        $token = $user->createToken('UserToken')->plainTextToken;
        return response()->json([
            'message' => 'Student logged in successfully',
            'token' => $token,
        ]);
        
    }
    public function profile(Request $request)
    {
        $user = Auth::guard('api_users')->user();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json([
            'message' => 'Profile fetched successfully',
            'user' => $user,
        ]);
    }
    public function logout(Request $request) {
        $user = Auth::guard('api_users')->user();
        if ($user) {
            $user->tokens()->delete();
        }
        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
