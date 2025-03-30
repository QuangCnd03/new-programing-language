<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\Course\CourseRepositoryInterface;
use App\Repositories\Lesson\LessonRepositoryInterface;
use App\Repositories\Student\StudentRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    protected $courseRepo;
    protected $lessonRepo;
    protected $studentRepo;
    public function __construct(
        CourseRepositoryInterface $courseRepositoryInterface,
        LessonRepositoryInterface $lessonRepositoryInterface,
        StudentRepositoryInterface $studentRepositoryInterface
    ) {
        $this->courseRepo = $courseRepositoryInterface;
        $this->lessonRepo = $lessonRepositoryInterface;
        $this->studentRepo = $studentRepositoryInterface;
    }
    public function index() {
        $courses = $this->courseRepo->getCoursePage();
        $data = [];
        $student = Auth::guard('api_students')->user();
        $mycourses = [];
        if($student) {
            $studentCourse = $this->courseRepo->getMycourses($student);
            foreach($studentCourse as $course) {
                $mycourses[] = [
                'id' => $course->id,
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
        }
        foreach($courses as $course) {
            $data[] = [
                'id' => $course->id,
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
        return response()->json(['courses' => $data, 'mycourses' => $mycourses]);
    }
    public function show($courseSlug) {
        $course = $this->courseRepo->getCourseDetailPage($courseSlug);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }
        $isMyCourse = false;
        $student = Auth::guard('api_students')->user();
        if($student) {
            $studentCourses = $this->courseRepo->getMycourses($student);
            $currentCourse = $studentCourses->firstWhere('id', $course->id);
            $currentCourse ? $isMyCourse = true : $isMyCourse = false;
        }
        $data = [
            'id' => $course->id,
            'name' => $course->name,
            'code' => $course->code,
            'detail' => $course->detail,
            'slug' => $course->slug,
            'price' => $course->price,
            'sale_price' => $course->sale_price,
            'support' => $course->support,
            'moduleQuantity' => $this->lessonRepo->getLessonCount($course)->modules,       
            'lessonQuantity' => $this->lessonRepo->getLessonCount($course)->lessons,
            'thumbnail' => "http://localhost:8000".$course->thumbnail,
            'durations' => $course->durations,
            'levels' => $course->levels,
            'lessons' => $course->lessons,
            'teacher_name' => $course->teacher->name,
            'teacher_description' => $course->teacher->description,
            'exp' => $course->teacher->exp,
            'teacher_image' => "http://localhost:8000".$course->teacher->image,
            'isMyCourse' => $isMyCourse,
        ];
        $categories = $this->courseRepo->getCategoriesFromCourse($course);
        if($categories){
            $related = [];
        }
        return response()->json(['course' => $data, 'related' => $categories]);
    }
}