<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_should_create_a_user(): void
    {
        // Arrange
        ['name' => $name, 'email' => $email] = User::factory()->make()->toArray();
        $password = 'password';

        // Act
        $response = $this->postJson('api/v1/users', compact('name', 'email', 'password'));

        // Assert
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'name' => $name,
            'email' => $email,
        ]);
    }

    public function test_store_invalid_payload_should_return_unprocesseble_content(): void
    {
        // Act
        $response = $this->postJson('api/v1/users', []);

        // Assert
        $response->assertStatus(422);
    }

    public function test_login_should_return_user_details(): void
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->postJson('api/v1/users/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        // Assert
        $response->assertStatus(200)
        ->assertJson(fn (AssertableJson $json) =>
            $json->has('data')
                ->has('data.token')
                ->where('data.name', $user->name)
                ->where('data.email', $user->email)
                ->etc()
        );   
    }

    public function test_invalid_login_should_return_unauthorized(): void
    {
        // Arrange
        $user = User::factory()->create();

        // Act
        $response = $this->postJson('api/v1/users/login', [
            'email' => $user->email,
            'password' => 'wrongpass',
        ]);

        // Assert
        $response->assertStatus(401);
    }

    public function test_logout_should_return_no_content_and_delete_all_tokens(): void
    {
        // Arrange
        $user = User::factory()->create();

        $user->createToken($user->email);
        $user->createToken($user->email);
        $user->createToken($user->email);
        
        $this->assertCount(3, $user->tokens->toArray());

        // Act
        $response = $this->actingAs($user)->patchJson('api/v1/users/logout');

        // Assert
        $response->assertStatus(204);

        $user->refresh();
        $this->assertCount(0, $user->tokens->toArray());
    }
}
