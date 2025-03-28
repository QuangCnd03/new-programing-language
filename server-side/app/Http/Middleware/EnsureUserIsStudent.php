<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsStudent
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::guard('api_students')->check()) {
            return response()->json(['message' => 'Unauthorized. You must be a student to access this route.'], 401);
        }

        return $next($request);
    }
}
