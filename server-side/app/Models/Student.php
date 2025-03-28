<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'students';
    protected $fillable = [
        'name', 
        'email', 
        'phone',
        'password',
        'address',
        'status',
    ];
    protected $hidden = [
        'password', 'remember_token',
    ];
    public function courses() {
        return $this->belongsToMany(Course::class, 'students_courses', 'student_id')->withPivot('status');
    }
}
