<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Student\StudentRepositoryInterface;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    protected $studentRepo;
    public function __construct(StudentRepositoryInterface $studentRepositoryInterface)
    {
        $this->studentRepo = $studentRepositoryInterface;
    }
    public function index()
    {
        $students = $this->studentRepo->getAll();
        return response()->json(['students' => $students]);
    }

    public function store(Request $request)
    {
        $rows = $request->students;
        $errors = [];
        $count = 1;

        foreach ($rows as $index => $row) {
            if (!empty($row['name'])) {
                $validator = Validator::make($row, [
                    'name' => 'required|string|max:255',
                    'email' => 'required|email|unique:students,email',
                    'password' => 'required|string|min:6',
                ]);
                if ($validator->fails()) {
                    $errors[$index] = $validator->errors()->all();
                }
            }
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Some students could not be created',
                'errors' => $errors,
            ], 422);
        }
        foreach ($rows as $index => $row) {
            $this->studentRepo->create([
                'name' => $row['name'],
                'phone' => $row['phone'],
                'email' => $row['email'],
                'password' => Hash::make($row['password']),
            ]);
            $count++;
        }
        return response()->json([
            'message' => 'All student created successfully',
            'students' => $rows,
            'count' => $count
        ], 201);
    }

    public function show($id)
    {
        $student = $this->studentRepo->find($id);
        if ($student) {
            return response()->json(['student' => $student]);
        }
        return response()->json(['message' => 'student not found'], 404);
    }

    public function update(Request $request, $id)
    {
        $student = $this->studentRepo->find($id);
        if (!$student) {
            return response()->json([
                'message' => 'Student not found'
            ], 404);
        }
        $data = $request->only(['name', 'phone', 'email', 'password']);
        $rules = [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:12',
            'email' => 'required|email|unique:students,email,' . $id,
            'password' => 'nullable|string|min:6',
        ];
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Update failure',
                'errors' => $validator->errors()->all(),
            ], 422);
        }
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $this->studentRepo->update($id, $data);
        return response()->json([
            'message' => 'Student updated successfully',
        ], 200);

    }

    public function destroy($id)
    {
        $student = $this->studentRepo->find($id);
        if ($student) {
            $this->studentRepo->delete($id);
            return response()->json(['message' => 'Student deleted successfully']);
        }
        return response()->json(['message' => 'Student not found'], 404);
    }
    
    public function search(Request $request)
    {
        $students = $this->studentRepo->search($request->keyword);
        return response()->json(['students' => $students]);
    }
}