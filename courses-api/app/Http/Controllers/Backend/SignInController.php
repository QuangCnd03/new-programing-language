<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignInRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SignInController extends Controller
{
    // public function store(SignInRequest $signInRequest) {
    //     try {
    //         $user = User::where('email', $signInRequest->email)->first();
    //         if(!$user) {
    //             throw new Exception('Email does not exist', 401);
    //         }
    //         if(!Hash::check($signInRequest->password, $user->password)) {
    //             throw new Exception('Invalid password', 401);
    //         }
    //         return response()->json(['success' => true, 'message' => 'Sign in successfully'], 200);
    //     } catch (\Exception $exception) {
    //        $status = $exception->getCode();
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Sign in failure',
    //             'errors' => $exception->getMessage()
    //        ], $status ?? 500);
    //     }
    // }

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
