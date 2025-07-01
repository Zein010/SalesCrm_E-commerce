<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\ImageManager;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Image $images)
    {
        //
        if ($request->filled("total")) {
            return ["data" => $images->orderBy("id", "desc")->take($request->query("total"))->get(), "total" => $images->count()];
        } else {
            return Inertia::render("admin/image/images");
        }
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
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'alt_text' => 'nullable|string',
        ]);

        // Get uploaded file
        $image = $request->file('image');

        // Generate unique file name
        $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

        // Store the image in storage/app/public/images
        $image->storeAs('images', $imageName, 'public');

        // Get full path to temp file to read dimensions


        $manager = new ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
        $imageData = $manager->read($image->getRealPath());

        $width = $imageData->width();
        $height = $imageData->height();
        $width = $imageData->width();
        $height = $imageData->height();
        // Save to DB
        Image::create([
            'user_id'   => $request->user()->id,
            'file_path' => 'storage/images/' . $imageName,
            'file_size' => $image->getSize(),
            'file_name' => $imageName,
            'file_type' => $image->getClientOriginalExtension(),
            'caption'   => $request->input('caption'),
            'alt_text'  => $request->input('alt_text'),
            'title'     => $request->input('title'),
            'width'     => $width,
            'height'    => $height,
        ]);

        return redirect(route("images.index"))->with('success', 'Image created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }
}
