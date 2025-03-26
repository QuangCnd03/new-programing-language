<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    protected $userRepo;
    public function __construct(UserRepositoryInterface $userRepositoryInterface)
    {
        $this->userRepo = $userRepositoryInterface;
    }
    public function index()
    {
        $users = $this->userRepo->getAll();
        return response()->json(['users' => $users]);
    }
    public function store(Request $request)
    {
        $rows = $request->users;
        $errors = [];
        foreach ($rows as $index => $row) {
            $validator = Validator::make($row, [
                'fullname' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);
            if ($validator->fails()) {
                $errors[$index] = $validator->errors()->all();
            }
        }
        if (!empty($errors)) {
            return response()->json([
                'message' => 'Some users could not be created',
                'errors' => $errors,
            ], 422);
        }
        foreach ($rows as $row) {
            $this->userRepo->create([
                'fullname' => $row['fullname'],
                'phone' => $row['phone'],
                'email' => $row['email'],
                'password' => Hash::make($row['password']),
            ]);
        }
    
        return response()->json([
            'message' => 'All users created successfully',
            'count' => count($rows),
        ], 200);
    }
    public function show($id) {
        $user = $this->userRepo->find($id);
        if ($user) {
            return response()->json(['user' => $user]);
        }
        return response()->json(['message' => 'User not found'], 404);
    }
    public function update(Request $request, $id)
    {
        $user = $this->userRepo->find($id);
        if(!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $validatedData = $request->validate([
            'fullname' => 'required|string|max:255',
            'phone' => 'required|string|max:15|regex:/^[0-9]{10,15}$/',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
        ]);
        if(!empty($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }else{
            unset($validatedData['password']);
        }
        $this->userRepo->update($id, $validatedData);
        return response()->json(['message' => 'User updated successfully', $validatedData], 200);
        
    }
    public function destroy($id)
    {
        $user = $this->userRepo->find($id);
        if ($user) {
            $this->userRepo->delete($id);
            return response()->json(['message' => 'User deleted successfully']);
        }
        return response()->json(['message' => 'User not found'], 404);
    }
    public function search(Request $request)
    {
        $users = $this->userRepo->search($request->keyword);
        return response()->json(['users' => $users]);
    }
}