<?php
namespace App\Repositories\Lesson;

use App\Models\Lesson;
use App\Repositories\BaseRepository;
use App\Repositories\Lesson\LessonRepositoryInterface;

class LessonRepository extends BaseRepository implements LessonRepositoryInterface{
    public function getModel(){
        return Lesson::class;
    }
    public function getLessons($courseId) {
        return $this->model->where('course_id', $courseId)->get();
    }
    public function getPosition($courseId) {
        $result = $this->model->where('course_id', $courseId)->count();
        return $result + 1;
    }
    public function getModules($courseId){
        return $this->model->with('subLessons')->whereCourseId($courseId)->whereNull('parent_id')->orderBy('position', 'asc')->get();
    }
    public function getLessonCount($course){
        return (object) [
            'modules' => $course->lessons()->whereNull('parent_id')->count(),
            'lessons' => $course->lessons()->whereNotNull('parent_id')->count()
        ];
    }
    public function getLessonDetailPage($slug) {
        return $this->model->where('status', 1)->where('slug', $slug)->first();
    }
}