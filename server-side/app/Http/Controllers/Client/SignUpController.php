<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SignUpController extends Controller
{
    public function store(SignUpRequest $signUpRequest) {
        try {
            $user = User::create([
                'fullname' => $signUpRequest->fullname,
                'email' => $signUpRequest->email,
                'phone' => $signUpRequest->phone,
                'password' => Hash::make($signUpRequest->password),
            ]);
            if(!$user) {
                throw new Exception('Create failure', 500);
            }
            return response()->json(['success' => true, 'message' => 'Create successfully', 'user' => $user], 200);
        } catch (\Exception $exception) {
           $status = $exception->getCode();
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
           ], $status ?? 500);
        }
    }
}
