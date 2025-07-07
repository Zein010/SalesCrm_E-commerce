<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Item $items, Request $request)
    {
        if ($request->isNotFilled("per_page")) {
            return Inertia::render('admin/item/items');
        } else {
            return $items::with(["user" => function ($query) {
                return $query->select("id", "name");
            }])->paginate($request->query("per_page", 10));
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render("admin/item/items.new");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

    }

    /**
     * Display the specified resource.
     */
    public function show(Item $items, string $id)
    {
        //

        return $items::get($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
        return Inertia::render('admin/item/edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Item $items, Request $request, string $id)
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
