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
}