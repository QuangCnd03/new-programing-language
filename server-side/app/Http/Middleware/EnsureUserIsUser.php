<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsUser
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::guard('api_users')->check()) {
            return response()->json(['message' => 'Unauthorized. You must be a user to access this route.'], 401);
        }

        return $next($request);
    }
}
