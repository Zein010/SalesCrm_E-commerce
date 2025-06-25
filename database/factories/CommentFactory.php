<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Comment;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    protected $model=Comment::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "client_id" => Client::inRandomOrder()->first()?->id,
            "item_id" => Item::inRandomOrder()->first()?->id,
            "content" => fake()->sentence(),
            'is_review' => fake()->boolean(),
            //
        ];
    }
}
