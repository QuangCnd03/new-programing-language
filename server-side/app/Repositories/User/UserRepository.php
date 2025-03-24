<?php
namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepository;
use App\Repositories\User\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface{
    public function getModel(){
        return User::class;
    }
    public function search($keyword) {
        return $this->model
            ->when($keyword, function($query) use ($keyword) {
                return $query->where('fullname', 'like', "%$keyword%")
                    ->orWhere('email', 'like', "%$keyword%")
                    ->orWhere('phone', 'like', "%$keyword%");
            })
            ->get();
    }
    
}