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
        if($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $imageName = $imageFile->getClientOriginalName();
            $imageUrl = null;
            if(!Storage::exists('public/teachers'.$imageName)) {
                $imagePath = $imageFile->storeAs('public/teachers', $imageName);
                $imageUrl = Storage::url($imagePath);
            }else{
                $imageUrl = Storage::url('public/teachers'. $imageName);
            }
            $validatedData['image'] = $imageUrl;
        }
        $teacher = $this->teacherRepo->create([
            'name' => $validatedData['name'],
            'slug' => $validatedData['slug'],
            'exp' => $validatedData['exp'],
            'description' => $validatedData['description'],
            'image' => $validatedData['image'],
        ]);
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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:teachers,slug,' . $id,
            'exp' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'currentImage' => 'nullable|file',
        ]);
        $teacher = $this->teacherRepo->find($id);
        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }
        if ($request->hasFile('currentImage')) {
            $imageFile = $request->file('currentImage');
            $imageName = $imageFile->getClientOriginalName();
            $imageUrl = null;
            if(!Storage::exists('public/teachers'.$imageName)) {
                $imagePath = $imageFile->storeAs('public/teachers', $imageName);
                $imageUrl = Storage::url($imagePath);
            }else{
                $imageUrl = Storage::url('public/teachers'. $imageName);
            }
            $validatedData['image'] = $imageUrl;
        }

        $teacher = $this->teacherRepo->update($id, [
            'name' => $validatedData['name'],
            'slug' => $validatedData['slug'],
            'exp' => $validatedData['exp'],
            'description' => $validatedData['description'],
            'image' => $validatedData['image']
        ]);

        return response()->json([
            'message' => 'Teacher updated successfully',
            'teacher' => $teacher,
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