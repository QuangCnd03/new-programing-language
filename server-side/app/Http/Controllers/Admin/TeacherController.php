<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Student\StudentRepositoryInterface;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Repositories\Teacher\TeacherRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TeacherController extends Controller
{
    protected $teacherRepo;
    public function __construct(TeacherRepositoryInterface $teacherRepositoryInterface)
    {
        $this->teacherRepo = $teacherRepositoryInterface;
    }
    public function index()
    {
        $teachers = $this->teacherRepo->getAll();
        return response()->json(['teachers' => $teachers]);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:teachers,slug',
            'exp' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'required|image|max:2048', // Giới hạn 2MB
        ]);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/teachers');
            $validatedData['image'] = Storage::url($path);
        }
        $teacher = $this->teacherRepo->create($validatedData);
        return response()->json([
            'message' => 'Teacher created successfully',
            'teacher' => $teacher,
        ], 201);
    }
    public function show($id) {
        $teacher = $this->teacherRepo->find($id);
        if($teacher) {
            return response()->json([
                'teacher' => $teacher,
            ], 201);
        }
        return response()->json(['message' => 'Teacher not found'], 404);
    }
    public function update(Request $request, $id)
    {
        $teacher = $this->teacherRepo->find($id);
        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:teachers,slug,' . $id,
            'exp' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($teacher->image) {
                Storage::delete(str_replace('/storage', 'public', $teacher->image));
            }
            $path = $request->file('image')->store('public/teachers');
            $validatedData['image'] = Storage::url($path);
        }

        $this->teacherRepo->update($id, $validatedData);

        return response()->json([
            'message' => 'Teacher updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $teacher = $this->teacherRepo->find($id);
        if ($teacher) {
            $this->teacherRepo->delete($id);
            return response()->json(['message' => 'Teacher deleted successfully']);
        }
        return response()->json(['message' => 'Teacher not found'], 404);
    }
    
    public function search(Request $request)
    {
        $teachers = $this->teacherRepo->search($request->keyword);
        return response()->json(['teachers' => $teachers]);
    }
}