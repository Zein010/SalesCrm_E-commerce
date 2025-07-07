<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    protected $model = Client::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      
        return [
            "first_name" => fake()->firstName(),
            "last_name" => fake()->lastName(),
            "email" =>fake()->email(),
            
            "phone" => fake()->phoneNumber(),
            "username" => fake()->userName(),
            "password" => Hash::make('password')
            //
        ];
    }
}
