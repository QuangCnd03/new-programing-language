<?php 
namespace App\Repositories\Document;

use App\Repositories\RepositoryInterface;
interface DocumentRepositoryInterface extends RepositoryInterface{
    public function createDocument($data);
}
