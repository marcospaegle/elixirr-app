<?php

use App\Enums\Priority;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->text('description');
            $table->date('due_date');
            
            $table->enum(
                column: 'priority',
                allowed: collect(Priority::cases())->map(fn(Priority $priority) => $priority->value)->toArray()
            )->default(Priority::LOW);

            $table->foreignIdFor(User::class, 'owner_id')
                ->constrained('users');

            $table->timestamps();
        });
    }
};
