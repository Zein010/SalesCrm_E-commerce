<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use App\Models\Client;
use App\Models\Comment;
use App\Models\Item;
use App\Models\Tag;
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
        User::where(["id!=" => 11])->delete();
        Category::truncate();
        Tag::truncate();
        Item::truncate();
        Client::truncate();
        Category::factory(5)->create();
        Category::factory(10)->create();
        Tag::factory(15)->create();
        User::factory(10)->has(Item::factory(14))->create();
        Client::factory(10)->create();
        Comment::factory(20)->create();
    }
}
