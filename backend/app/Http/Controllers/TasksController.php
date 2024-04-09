<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Utils\TaskUtil;
use Symfony\Component\HttpFoundation\Response;

class TasksController extends Controller
{
    public function index()
    {
        return TaskResource::collection(auth()->user()->tasks);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Task::create([
            ...$request->validated(),
            'owner_id' => auth()->user()->id,
        ]);

        return new TaskResource($task);
    }

    public function show(Task $task)
    {
        if (!TaskUtil::isUserTaskOwner(auth()->user(), $task)) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        if (!TaskUtil::isUserTaskOwner(auth()->user(), $task)) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $task->fill($request->validated());
        $task->save();

        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        if (!TaskUtil::isUserTaskOwner(auth()->user(), $task)) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $task->delete();

        return response()->json(status: Response::HTTP_NO_CONTENT);
    }
}
