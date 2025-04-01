<?php 
namespace App\Repositories\Lesson;

use App\Repositories\RepositoryInterface;
interface LessonRepositoryInterface extends RepositoryInterface{
    public function getLessons($courseId);
    public function getPosition($courseId);
    
    public function getModules($courseId);
    public function getLessonCount($course);
    public function getLessonDetailPage($slug);
}
