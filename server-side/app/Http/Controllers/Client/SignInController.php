<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignInRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SignInController extends Controller
{
    public function store(SignInRequest $signInRequest) {
        try {
            $status = Auth::attempt(['email' => $signInRequest->email, 'password' => $signInRequest->password]);
            if(!$status) {
                throw new Exception('Email or password does not exist', 401);
            }
            $token = $signInRequest->user()->createToken('auth');
            return response()->json([
                'success' => true, 
                'message' => 'Sign in successfully', 
                'token' => $token], 200);
        } catch (\Exception $exception) {
           $status = $exception->getCode();
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
           ], $status ?? 500);
        }
    }
    public function profile(Request $request) {
        return response()->json(['success' => true, 'user' => $request->user()], 200);
    }
}
