<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Category\CategoryRepositoryInterface;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $categoryRepo;
    public function __construct(CategoryRepositoryInterface $categoryRepositoryInterface) {
        $this->categoryRepo = $categoryRepositoryInterface;
    }
    public function index()
    {
        $categories = $this->categoryRepo->getAll();
        return response()->json([
            'message' => 'Categories fetched successfully',
            'categories' => $categories,
        ]);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|min:2',
            'slug' => 'required|string|max:255|min:2|unique:categories,slug',
            'parent_id' => 'integer',
        ]);

        $category = $this->categoryRepo->create($validatedData);

        return response()->json([
            'message' => 'Category created successfully',
            'category' => $validatedData,
        ], 200);
    }
    public function show($id)
    {
        $category = $this->categoryRepo->find($id);
        if ($category) {
            $categories = $this->categoryRepo->getAll();
            return response()->json(['category' => $category, 'categories' => $categories]);
        }
        return response()->json(['message' => 'category not found'], 404);
    }
    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $id,
            'parent_id' => 'nullable',
        ]);

        $this->categoryRepo->update($id, $validatedData);

        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $validatedData,
        ]);
    }
    public function destroy($id)
    {
        $category = $this->categoryRepo->find($id);
        if($category) {
            $this->categoryRepo->deleteChilren($id);
            $this->categoryRepo->delete($id);
            return response()->json([
                'message' => 'Category deleted successfully',
                'id' => $id
            ], 200);
        }
        return response()->json([
            'message' => 'Category not found',
        ], 404);

    }
    public function search(Request $request) {
        $categories = $this->categoryRepo->search($request->keyword);
        return response()->json(['categories' => $categories]);
    }
}