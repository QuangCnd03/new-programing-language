<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Lấy danh sách người dùng
    public function index()
    {
        $users = User::all();
        return response()->json(['users' => $users]);
    }

    public function store(Request $request)
    {
        // $user = new User();
        // $user->fullname = $request->fullname;
        // $user->phone = $request->phone;
        // $user->email = $request->email;
        // $user->password = Hash::make($request->password);
        // $user->save();
        $users = $request->all();

        return response()->json(['message' => 'User created successfully', 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->fullname = $request->fullname;
            $user->phone = $request->phone;
            $user->email = $request->email;
            if ($request->password) {
                $user->password = Hash::make($request->password);
            }
            $user->save();

            return response()->json(['message' => 'User updated successfully', 'user' => $user]);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}