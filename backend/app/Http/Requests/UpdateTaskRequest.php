<?php

namespace App\Http\Requests;

use App\Enums\Priority;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['nullable', 'max:255'],
            'description' => ['nullable'],
            'priority' => ['nullable', Rule::enum(Priority::class)],
            'due_date' => ['nullable', 'date'],
        ];
    }
}
