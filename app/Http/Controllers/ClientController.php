<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Client $clients, Request $request)
    {
        if ($request->isNotFilled("per_page")) {
            return Inertia::render('admin/client/clients');
        } else {

            return  $clients::selectRaw("username,phone,email,id,concat(first_name,' ',last_name) as name")->paginate($request->query("per_page", 10));
        }

        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/client/clients.new');

        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Client $clients)
    {

        $validated = $request->validate([
            "first_name" => "required|alpha",
            "last_name" => "required|alpha",
            "phone" => "required|unique:clients",
            "username" => "required|unique:clients|regex:/^[a-zA-Z0-9._]+$/",
            "email" => "required|unique:clients|email:rfc,dns",
            "password" => "required|min:8"
        ]);

        $validated["password"] = Hash::make($validated["password"]);
        //
        $client =    $clients::create($validated);

        return redirect(route("clients.edit", ["client" => $client->id]))->with('success', 'Client updated successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        return Inertia::render('admin/client/clients.edit', ["client" => $client]);

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {

        // Validate request
        $validated = $request->validate([
            "email" => ["required", "email", Rule::unique("clients")->ignore($client->id)],
            "username" => ["required", Rule::unique("clients")->ignore($client->id), 'regex:/^[a-zA-Z0-9._]+$/'],
            "first_name" => ["required", "alpha"],
            "last_name" => ["required", "alpha"],
            "phone" => ["required", Rule::unique("clients")->ignore($client->id)],
            "password" => ["nullable", "min:8", "confirmed"]
        ]);

        // Prepare updates
        $updates = [];
        $fields = ["first_name", "last_name", "username", "email", "phone"];

        foreach ($fields as $field) {
            if ($request->has($field) && $client->$field !== $request->input($field)) {
                $updates[$field] = $request->input($field);
                // Log changes if needed
                // $logger[$field] = "$field changed from {$client->$field} to {$request->input($field)}";
            }
        }

        // Handle password separately
        if ($request->filled('password')) {
            $updates['password'] = Hash::make($request->input("password"));
        }

        // Only update if there are changes
        if (!empty($updates)) {
            $client->update($updates);
        }


        return redirect()->back()->with('success', 'Client updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
