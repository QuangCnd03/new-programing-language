<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $table = 'documents';
    protected $fillable = [
        'name',
        'url',
        'size'
    ];
    protected $attributes = [
        'size' => 0
    ];
    public function documents() {
        return $this->hasMany(Document::class, 'document_id', 'id');
    }
}
