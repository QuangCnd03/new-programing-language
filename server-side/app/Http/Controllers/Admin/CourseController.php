<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Course\CourseRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    protected $courseRepo;
    public function __construct(CourseRepositoryInterface $courseRepositoryInterface) {
        $this->courseRepo = $courseRepositoryInterface;
    }
    public function index() {
        $courses = $this->courseRepo->getAll();
        return response()->json(['courses' => $courses]);
    }
    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:courses,slug',
            'teacher_id' => 'required|integer|exists:teachers,id',
            'levels' => 'required|in:0,1',
            'code' => 'required|string|max:255|unique:courses,code',
            'price' => 'required|numeric',
            'sale_price' => 'nullable|numeric',
            'is_document' => 'required|in:0,1',
            'status' => 'required|in:0,1',
            'supports' => 'nullable|string',
            'detail' => 'nullable|string',
            'categories' => 'required|array',
            'thumbnail' => 'nullable|file|max:2048', // Tệp ảnh giới hạn dung lượng
        ]);

        if($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $fileName = $thumbnail->getClientOriginalName();
            if(!Storage::exists('public/courses/' . $fileName)) {
                $path =  $thumbnail->storeAs('public/courses', $fileName);
                $validatedData['thumbnail'] = Storage::url($path);
            }else{
                $validatedData['thumbnail'] = Storage::url('public/courses/' . $fileName);
            }
        }
        $course = $this->courseRepo->create($validatedData);
        $categories = [];
        foreach($validatedData['categories'] as $category) {
            $categories[$category] = [
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'), 
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ];
        }
        $this->courseRepo->createCourseCategories($course, $categories);

        return response()->json([
            'message' => 'Course created successfully!',
            'data' => $validatedData
        ]);
    }
    public function show($id) {
        $course = $this->courseRepo->find($id);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }
        return response()->json(['message' => 'Get data successfully', 'course' => $course]);
    }
    public function update(Request $request, $id) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:courses,slug,' . $id,
            'teacher_id' => 'required|integer|exists:teachers,id',
            'levels' => 'required|in:0,1',
            'code' => 'required|string|max:255|unique:courses,code,' . $id,
            'price' => 'required|numeric',
            'sale_price' => 'nullable|numeric',
            'is_document' => 'required|in:0,1',
            'status' => 'required|in:0,1',
            'support' => 'nullable|string',
            'detail' => 'nullable|string',
            'categories' => 'required|array',
        ]);
        $course = $this->courseRepo->find($id);
        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $fileName = $thumbnail->getClientOriginalName();
    
            if (!Storage::exists('public/courses/' . $fileName)) {
                $path = $thumbnail->storeAs('public/courses', $fileName);
                $validatedData['thumbnail'] = Storage::url($path);
            } else {
                $validatedData['thumbnail'] = Storage::url('public/courses/' . $fileName);
            }
        } else {
            $validatedData['thumbnail'] = $course->thumbnail;
        }
        $this->courseRepo->update($id,$validatedData);
        $course = $this->courseRepo->find($id);
        $categories = [];
        foreach($validatedData['categories'] as $category) {
            $categories[$category] = [
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'), 
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ];
        }
        $this->courseRepo->updateCourseCategories($course, $categories);
        return response()->json(['message' => 'Update course successfully', 'data' => $course]);
    }
    public function destroy($id) {
        $course = $this->courseRepo->find($id);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }
        $this->courseRepo->delete($id);
        return response()->json(['message' => 'Delete successfully']);
    }
    public function search(Request $request) {
        $courses = $this->courseRepo->search($request->keyword);
        return response()->json(['courses' => $courses]);
    }
}
