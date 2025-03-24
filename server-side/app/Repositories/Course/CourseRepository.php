<?php
namespace App\Repositories\Course;

use App\Models\Course;
use App\Repositories\BaseRepository;
use App\Repositories\Course\CourseRepositoryInterface;

class CourseRepository extends BaseRepository implements CourseRepositoryInterface{
    public function getModel(){
        return Course::class;
    }
    public function createCoursesCategories($course, $data = []) {
        return $course->categories()->attach($data);
    }
}