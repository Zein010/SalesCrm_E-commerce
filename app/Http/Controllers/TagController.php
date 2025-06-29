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

        if ($request->isNotFilled("per_page")) {
            return Inertia::render('admin/tag/tags');
        } else {
            return  $tags->paginate($request->query("per_page", 10));
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
        return redirect(route("tags.index"))->with('success', 'tag created successfully!');
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
