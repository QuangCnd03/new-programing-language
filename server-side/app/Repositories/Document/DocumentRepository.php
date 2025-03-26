<?php
namespace App\Repositories\Document;

use App\Models\Document;
use App\Repositories\BaseRepository;
use App\Repositories\Document\DocumentRepositoryInterface;

class DocumentRepository extends BaseRepository implements DocumentRepositoryInterface{
    public function getModel(){
        return Document::class;
    }
    public function createDocument($data) {
        return $this->model->firstOrCreate($data);
    }
}