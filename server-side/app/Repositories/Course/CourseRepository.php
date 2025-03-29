<?php
namespace App\Repositories\Course;

use App\Models\Course;
use App\Repositories\BaseRepository;
use App\Repositories\Course\CourseRepositoryInterface;

class CourseRepository extends BaseRepository implements CourseRepositoryInterface{
    public function getModel(){
        return Course::class;
    }
    public function search($keyword){
        return $this->model
            ->when($keyword, function($query) use ($keyword){
                return $query->where('name', 'like', "%$keyword%");
            })
            ->get();
    }
    public function createCourseCategories($course, $data = []) {
        return $course->categories()->attach($data);
    }
    public function updateCourseCategories($course, $data = []) {
        return $course->categories()->sync($data);
    }
    public function getCoursePage() {
        return $this->model->where('status', 1)->latest('created_at')->get();
    }
    public function getCourseDetailPage($courseSlug) {
        return $this->model->with('lessons')->where('status', 1)->where('slug', $courseSlug)->first();
    }
    public function getMycourses($student) {
        return $student->courses;
    }


}