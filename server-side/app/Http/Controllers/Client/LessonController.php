<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Repositories\Course\CourseRepositoryInterface;
use App\Repositories\Lesson\LessonRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    protected $lessonRepo;
    protected $courseRepo;
    public function __construct(LessonRepositoryInterface $lessonRepositoryInterface,
    CourseRepositoryInterface $courseRepositoryInterface) {
        $this->lessonRepo = $lessonRepositoryInterface;
        $this->courseRepo = $courseRepositoryInterface;
        }
    public function show($slug) {
        $lesson = $this->lessonRepo->getLessonDetailPage($slug);
        if(!$lesson) {
            return response()->json([
                'message' => 'Lesson not found',
            ], 404);
        }
        $course = $lesson->course;
        $isMyCourse = false;
        $student = Auth::guard('api_students')->user();
        if($student) {
            $studentCourses = $this->courseRepo->getMycourses($student);
            $currentCourse = $studentCourses->firstWhere('id', $course->id);
            $currentCourse ? $isMyCourse = true : $isMyCourse = false;
        }
        return response()->json([
            'message' => 'get lesson detail page successfully',
            'course' => [
                'lessons' => $course->lessons,
                'lesson' => $lesson,
                'isMyCourse' =>  $isMyCourse

            ],
        ]);
    }
}
