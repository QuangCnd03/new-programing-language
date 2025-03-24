<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $table = "courses";
    protected $fillable = [
        'name',
        'slug',
        'code',
        'detail',
        'teacher_id',
        'thumbnail',
        'price',
        'sale_price',
        'duration',
        'is_document',
        'support',
        'view',
        'levels',
        'status'
    ];
    protected $with = ['teacher'];
    public function categories() {
        return $this->belongsToMany(Category::class, 'categories_courses');
    }
    public function teacher() {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'id');
    }
    public function lessons() {
        return $this->belongsToMany(Lesson::class, 'course_id', 'id');
    }
    public function students() {
        return $this->belongsToMany(Student::class, 'students_courses');
    }
    
}
