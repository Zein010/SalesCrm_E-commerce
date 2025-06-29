<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            "name" => fake()->name(),
            "description" => fake()->sentence(),
            "category_id" => [0, Category::inRandomOrder()->first()?->id ?: 0][rand(0, 1)],
            "user_id" => User::inRandomOrder()->first()?->id,
        ];
    }
}
