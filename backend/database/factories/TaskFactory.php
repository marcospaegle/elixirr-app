<?php

namespace Database\Factories;

use App\Enums\Priority;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->words(asText: true),
            'description' => fake()->paragraph(1),
            'due_date' => fake()->dateTimeBetween(Carbon::now(), Carbon::now()->addDays(10)),
            'priority' => collect(Priority::cases())->random(),
        ];
    }
}
