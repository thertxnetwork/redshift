<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\NotificationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Authentication routes (public)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    // Protected auth routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });
});

// Protected API routes
Route::middleware('auth:sanctum')->group(function () {
    
    // Notifications
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::get('/unread-count', [NotificationController::class, 'unreadCount']);
        Route::put('/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::put('/{id}/unread', [NotificationController::class, 'markAsUnread']);
        Route::put('/mark-all-read', [NotificationController::class, 'markAllAsRead']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
    });
    
    // Admin routes (require permissions)
    Route::prefix('admin')->middleware('role:super_admin|admin')->group(function () {
        // Dashboard
        Route::get('/dashboard/stats', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'total_users' => \App\Models\User::count(),
                    'active_users' => \App\Models\User::whereNotNull('email_verified_at')->count(),
                    'total_notifications' => \Illuminate\Notifications\DatabaseNotification::count(),
                ],
            ]);
        });
        
        // Users management (coming soon in full implementation)
        // Route::apiResource('users', UserController::class);
        
        // Roles management (coming soon in full implementation)
        // Route::apiResource('roles', RoleController::class);
    });
});

