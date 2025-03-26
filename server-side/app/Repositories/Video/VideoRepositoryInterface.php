<?php 
namespace App\Repositories\Video;

use App\Repositories\RepositoryInterface;
interface VideoRepositoryInterface extends RepositoryInterface{
    public function createVideo($data);
}
