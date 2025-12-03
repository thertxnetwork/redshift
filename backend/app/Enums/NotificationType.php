<?php

namespace App\Enums;

enum NotificationType: string
{
    case System = 'system';
    case AdminMessage = 'admin_message';
    case AccountUpdate = 'account_update';
    
    public function label(): string
    {
        return match($this) {
            self::System => 'System Notification',
            self::AdminMessage => 'Admin Message',
            self::AccountUpdate => 'Account Update',
        };
    }
}
