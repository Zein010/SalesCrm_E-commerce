<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Tag $tags)
    {
        if ($request->filled("all")) {
            return  Tag::all(["id", "name"]);
        } else if ($request->filled("per_page")) {
            return  $tags->paginate($request->query("per_page", 10));
        } else {
            return Inertia::render('admin/tag/tags');
        }
        //
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $validated = $request->validate(["name" => "Required|regex:/^[a-zA-Z0-9_]+$/", "description" => "required",], ["name.regex" => "The name field must contain letters, numbers and _ only"]);
        $validated["user_id"] = $request->user()->id;
        Tag::create($validated);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
        return $tag;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        //

        $request->validate(["name" => "Required|regex:/^[a-zA-Z0-9_]+$/", "description" => "required",], ["name.regex" => "The name field must contain letters, numbers and _ only"]);
        $tag->name = $request->name;
        $tag->description = $request->description;

        $tag->save();
        return redirect(route("tags.index"))->with('success', 'tag updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
