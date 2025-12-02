<?php

namespace App\Enums;

enum RoleType: string
{
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';
    case Moderator = 'moderator';
    case User = 'user';
    
    public function label(): string
    {
        return match($this) {
            self::SuperAdmin => 'Super Admin',
            self::Admin => 'Admin',
            self::Moderator => 'Moderator',
            self::User => 'User',
        };
    }
    
    public function description(): string
    {
        return match($this) {
            self::SuperAdmin => 'Full system access',
            self::Admin => 'User management, notifications, limited settings',
            self::Moderator => 'Content moderation capabilities',
            self::User => 'Standard user access',
        };
    }
}
