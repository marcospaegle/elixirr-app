<?php

namespace App\Models;

use App\Enums\Priority;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'due_date', 'priority', 'owner_id', 'slug'];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'priority' => Priority::class,
            'due_date' => 'datetime:Y-m-d',
        ];
    }

    protected static function booted()
    {
        static::saving(fn(Task $t) => $t->slug = Str::slug($t->title, '-'));
    }
}
