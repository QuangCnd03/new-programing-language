<?php 
namespace App\Repositories\Student;

use App\Repositories\RepositoryInterface;
interface StudentRepositoryInterface extends RepositoryInterface{
    public function search($keyword);
    public function studentExist($email);
    public function getStudentByEmail($email);
}
