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
            'price' => 'required',
            'sale_price' => 'nullable',
            'is_document' => 'required|in:0,1',
            'status' => 'required|in:0,1',
            'supports' => 'nullable|string',
            'detail' => 'nullable|string',
            'categories' => 'required|array',
            'thumbnail' => 'required|image|max:2048', // Tệp ảnh giới hạn dung lượng
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('public/course');
            $validatedData['thumbnail'] = Storage::url($path);
        }
        $course = $this->courseRepo->create($validatedData);
        $categories = [];
        foreach($validatedData['categories'] as $category) {
            $categories[$category] = ['created_at' => Carbon::now()->format('Y-m-d H:i:s'), 'updated_at' => Carbon::now()->format('Y-m-d H:i:s')];
        }
        $this->courseRepo->createCoursesCategories($course, $categories);

        return response()->json([
            'message' => 'Course created successfully!',
            'data' => $validatedData
        ]);

    }
    public function show($id) {

    }

}
