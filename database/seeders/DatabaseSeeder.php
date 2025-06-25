<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\Comment;
use App\Models\Item;
use Database\Factories\ItemFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Comment::truncate();
        User::truncate();
        Item::truncate();
        Client::truncate();
        User::factory(10)->has(Item::factory())->create();
        Client::factory(10)->create();
        Comment::factory(20)->create();
    }
}
