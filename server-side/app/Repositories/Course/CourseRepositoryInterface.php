<?php 
namespace App\Repositories\Course;

use App\Repositories\RepositoryInterface;
interface CourseRepositoryInterface extends RepositoryInterface{
    public function createCoursesCategories($course, $data = []);
}
