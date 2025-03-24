<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = 'students';
    protected $fillable = [
        'name', 
        'email', 
        'phone',
        'password',
        'address',
        'status',
    ];
    public function courses() {
        return $this->belongsToMany(Course::class, 'students_courses', 'student_id')->withPivot('status');
    }
}
