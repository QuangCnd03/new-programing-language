<?php
namespace App\Repositories\Category;

use App\Models\Category;
use App\Repositories\BaseRepository;
use App\Repositories\Category\CategoryRepositoryInterface;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface{
    public function getModel(){
        return Category::class;
    }
    public function deleteChilren($categoryId) {
        $category = $this->model->find($categoryId);
        $children = $this->model->where('parent_id', $category->id)->get();
        foreach($children as $sub) {
            $this->deleteChilren($sub->id);
        }
        $this->model->delete($category->id);
    }
}