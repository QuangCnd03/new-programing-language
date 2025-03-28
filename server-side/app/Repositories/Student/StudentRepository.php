<?php
namespace App\Repositories\Student;

use App\Models\Student;
use App\Repositories\BaseRepository;
use App\Repositories\Student\StudentRepositoryInterface;

class StudentRepository extends BaseRepository implements StudentRepositoryInterface{
    public function getModel(){
        return Student::class;
    }
    public function search($keyword){
        return $this->model
            ->when($keyword, function($query) use ($keyword){
                return $query->where('name', 'like', "%$keyword%")
                    ->orWhere('email', 'like', "%$keyword%")
                    ->orWhere('phone', 'like', "%$keyword%");
            })
            ->get();
    }
    public function studentExist($email) {
        return $this->model->where('email', $email)->exists();
    }
    public function getStudentByEmail($email) {
        return $this->model->where('email', $email)->first();
    }
}