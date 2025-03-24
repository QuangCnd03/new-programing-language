<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;
    protected $table = 'lessons';
    protected $fillable = [
        'name',
        'slug',
        'video_id',
        'document_id',
        'parent_id',
        'course_id',
        'is_trial',
        'views',
        'position',
        'durations',
        'description',
        'status',
    ];
    protected $with = ['video', 'document'];

    public function children() {
        return $this->hasMany(Lesson::class, 'parent_id');
    }

    public function subLessons() {
        return $this->children()->orderBy('position', 'asc')->with('subLessons');
    }

    public function video() {
        return $this->belongsTo(
            Video::class, 'video_id', 'id');
    }

    public function document() {
        return $this->belongsTo(Document::class, 'document_id', 'id');
    }

    public function course() {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }
}
