<?php
namespace App\Repositories\Teacher;

use App\Models\Teacher;
use App\Repositories\BaseRepository;
use App\Repositories\Teacher\TeacherRepositoryInterface;

class TeacherRepository extends BaseRepository implements TeacherRepositoryInterface{
    public function getModel(){
        return Teacher::class;
    }
    public function search($keyword) {
        return $this->model
            ->when($keyword, function($query) use ($keyword) {
                return $query->where('name', 'like', "%$keyword%")
                    ->orWhere('exp', 'like', "%$keyword%");
            })
            ->get();
    }
}