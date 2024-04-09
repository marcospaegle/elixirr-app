<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Support\Str;
use Tests\TestCase;

class TasksControllerTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_store_should_create_task(): void
    {
        // Arrange
        $user = User::factory()->create();
        $data = [
            'title' => 'eum id minima',
            'description' => 'Error et occaecati fugit tenetur est.',
            'due_date' => '2024-04-10 00:00:00',
            'priority' => 'high',
        ];

        // Act
        $response = $this->actingAs($user)->postJson('/api/v1/tasks', $data);

        // Assert
        $response->assertStatus(201);
        $this->assertDatabaseHas('tasks', $data);
    }

    public function test_store_invalid_payload_should_return_unprocessable_content()
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->actingAs($user)->postJson('/api/v1/tasks', []);

        // Assert
        $response->assertStatus(422);
    }

    public function test_index_should_return_only_the_logged_user_tasks()
    {
        // Arrange
        User::factory()->count(2)
            ->has(Task::factory()->count(10))
            ->create();

        $user = User::first();

        // Act
        $response = $this->actingAs($user)->getJson('/api/v1/tasks');

        // Assert
        $this->assertCount(20, Task::all());

        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
                $json->has('data', 10)
                    ->etc()
            );
    }

    public function test_index_should_return_empty_array()
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->actingAs($user)->getJson('/api/v1/tasks');

        // Assert
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
                $json->has('data', 0)
                    ->etc()
            );
    }

    public function test_show_should_return_the_user_task()
    {
        // Arrange
        $user = User::factory()
            ->has(Task::factory())
            ->create();

        $task = $user->tasks->first();

        // Act
        $response = $this->actingAs($user)->getJson('/api/v1/tasks/' . $task->id);

        // Assert
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
                $json->has('data')
                    ->where('data.id', $task->id)
                    ->where('data.title', $task->title)
                    ->where('data.description', $task->description)
                    ->where('data.priority', $task->priority->value)
                    ->where('data.due_date', $task->due_date->format('Y-m-d'))
                    ->where('data.slug', Str::slug($task->title))
                    ->etc()
            );
    }

    public function test_show_task_from_other_user_should_return_unauthorized()
    {
        // Arrange
        $user = User::factory()
            ->has(Task::factory())
            ->create();

        $task = $user->tasks->first();

        $unauthorizedUser = User::factory()
            ->create();

        // Act
        $response = $this->actingAs($unauthorizedUser)->getJson('/api/v1/tasks/' . $task->id);

        // Assert
        $response->assertStatus(401);
    }

    public function test_should_update_task()
    {
        // Arrange
        $user = User::factory()
            ->has(Task::factory())
            ->create();

        $task = $user->tasks->first();

        $data = Task::factory()
            ->make()
            ->toArray();

        // Act
        $response = $this->actingAs($user)->patchJson('/api/v1/tasks/' . $task->id, $data);

        // Assert
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
                $json->has('data')
                    ->where('data.id', $task->id)
                    ->where('data.title', $data['title'])
                    ->where('data.description', $data['description'])
                    ->where('data.priority', $data['priority'])
                    ->where('data.due_date', $data['due_date'])
                    ->where('data.slug', Str::slug($data['title']))
                    ->etc()
            );
        $this->assertDatabaseHas('tasks', $data);
    }

    public function test_update_task_from_other_user_should_return_unauthorized()
    {
        // Arrange
        $user = User::factory()
            ->has(Task::factory())
            ->create();

        $task = $user->tasks->first();

        $unauthorizedUser = User::factory()
            ->create();

        $data = Task::factory()->make()
            ->toArray();

        // Act
        $response = $this->actingAs($unauthorizedUser)->patchJson('/api/v1/tasks/' . $task->id, $data);

        // Assert
        $response->assertStatus(401);
    }

    public function test_should_delete_task()
    {
        // Arrange
        $user = User::factory()
            ->has(Task::factory()->count(3))
            ->create();

        $task = $user->tasks->first();

        // Act
        $response = $this->actingAs($user)->deleteJson('/api/v1/tasks/' . $task->id);

        // Assert
        $response->assertStatus(204);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
        $this->assertDatabaseCount('tasks', 2);
    }

    public function test_delete_task_from_other_user_should_return_unauthorized()
    {
        // Arrange
        $user = User::factory()
            ->has(Task::factory())
            ->create();

        $task = $user->tasks->first();

        $unauthorizedUser = User::factory()
            ->create();

        // Act
        $response = $this->actingAs($unauthorizedUser)->deleteJson('/api/v1/tasks/' . $task->id);

        // Assert
        $response->assertStatus(401);
    }
}
