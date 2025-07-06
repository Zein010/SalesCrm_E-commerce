<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Category $categories)
    {

        if ($request->filled("all")) {
            return Category::all(["id", "name"]);
        } else if ($request->filled("per_page")) {

            $where = [];
            if ($request->filled("parent")) {

                $where["category_id"] = $request->query("parent");
            }
            return  $categories->where($where)->paginate($request->query("per_page", 10));
        } else {
            return Inertia::render('admin/category/categories');
        }
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/category/categories.new', ["categories" => Category::all()]);

        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate(["name" => "Required|regex:/^[\pL\pN\s]+$/u", "description" => "required", "category_id" => "required|numeric", "children.*" => "numeric"], ["name.regex" => "The name field must contain letters, numbers and spaces only"]);

        $validated["user_id"] = $request->user()->id;
        $category = Category::create($validated);
        if ($request->input("children")) {
            Category::whereNotIn("id", $request->input("children"))->where("category_id", $category->id)->update(["category_id" => 0]);
            Category::whereIn("id", $request->input("children"))->update(["category_id" => $category->id]);
        }
        //
        //
        return redirect(route("categories.edit", ["category" => $category->id]))->with('success', 'Category created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render("admin/category/categories.edit", ["category" => $category, "categories" => $category->all(["id", "name", "category_id"])]);
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate(["name" => "Required|regex:/^[\pL\pN\s]+$/u", "description" => "required", "category_id" => "required|numeric", "children.*" => "numeric"], ["name.regex" => "The name field must contain letters, numbers and spaces only"]);
        //
        $category->name = $request->input("name");

        $category->description = $request->input("description");
        $category->category_id = $request->input("category_id");
        $category->save();
        if ($request->input("children")) {
            Category::whereNotIn("id", $request->input("children"))->where("category_id", $category->id)->update(["category_id" => 0]);
            Category::whereIn("id", $request->input("children"))->update(["category_id" => $category->id]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
