<?php 
namespace App\Repositories\Category;

use App\Repositories\RepositoryInterface;
interface CategoryRepositoryInterface extends RepositoryInterface{
    public function search($keyword);
    public function deleteChilren($categoryId);
}
