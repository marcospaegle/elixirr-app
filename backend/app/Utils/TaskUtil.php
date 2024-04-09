<?php

namespace App\Utils;

use App\Models\Task;
use App\Models\User;

class TaskUtil
{
    public static function isUserTaskOwner(User $user, Task $task): bool
    {
        return $task->owner()->is($user);
    }
}
