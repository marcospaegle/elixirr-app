<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function() {
    Route::post('users', [AuthController::class, 'store']);
    Route::post('users/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::patch('users/logout', [AuthController::class, 'logout']);
        Route::apiResource('tasks', TasksController::class);
    });
});
