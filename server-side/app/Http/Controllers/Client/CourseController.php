<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\Course\CourseRepositoryInterface;
use App\Repositories\Lesson\LessonRepositoryInterface;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    protected $courseRepo;
    protected $lessonRepo;
    public function __construct(
        CourseRepositoryInterface $courseRepositoryInterface,
        LessonRepositoryInterface $lessonRepositoryInterface
    ) {
        $this->courseRepo = $courseRepositoryInterface;
        $this->lessonRepo = $lessonRepositoryInterface;
    }
    public function index() {
        $courses = $this->courseRepo->getCoursePage();
        $data = [];
        foreach($courses as $course) {
            $data[] = [
                'name' => $course->name,
                'teacher_name' => $course->teacher->name,
                'price' => $course->price,
                'sale_price' => $course->sale_price,
                'module' => $this->lessonRepo->getLessonCount($course)->modules,
                'lesson' => $this->lessonRepo->getLessonCount($course)->lessons,
                'thumbnail' => "http://localhost:8000".$course->thumbnail,
                'teacher_image' => "http://localhost:8000".$course->teacher->image,
                'view' => $course->view,
                'durations' => $course->durations,
                'levels' => $course->levels,
                'slug' => $course->slug,
            ];
        }
        return response()->json(['courses' => $data]);
    }
    public function show($courseSlug) {
        $course = $this->courseRepo->getCourseDetailPage($courseSlug);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }
        $data = [
            'name' => $course->name,
            'code' => $course->code,
            'detail' => $course->detail,
            'slug' => $course->slug,
            'price' => $course->price,
            'sale_price' => $course->sale_price,
            'support' => $course->support,
            'module' => $this->lessonRepo->getLessonCount($course)->modules,       
            'lesson' => $this->lessonRepo->getLessonCount($course)->lessons,
            'thumbnail' => "http://localhost:8000".$course->thumbnail,
            'durations' => $course->durations,
            'levels' => $course->levels,
            
            'teacher_name' => $course->teacher->name,
            'teacher_description' => $course->teacher->description,
            'exp' => $course->teacher->exp,
            'teacher_image' => "http://localhost:8000".$course->teacher->image,
        ];
        return response()->json(['course' => $data]);
    }
}
