<?php 
namespace App\Repositories\Teacher;

use App\Repositories\RepositoryInterface;
interface TeacherRepositoryInterface extends RepositoryInterface{
    public function search($keyword);
}
