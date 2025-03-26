<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;
    protected $table = 'videos';
    protected $fillable = [
        'name',
        'url',
        'size'
    ];

    protected $attributes = [
        'size' => 0
    ];

    public function videos() {
        return $this->hasMany(
            Lesson::class, 'video_id', 'id'
        );
    }
}
