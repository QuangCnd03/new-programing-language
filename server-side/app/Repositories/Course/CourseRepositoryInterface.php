<?php 
namespace App\Repositories\Course;

use App\Repositories\RepositoryInterface;
interface CourseRepositoryInterface extends RepositoryInterface{
    public function search($keyword);
    public function createCourseCategories($course, $data = []);
    public function updateCourseCategories($course, $data = []);

}
