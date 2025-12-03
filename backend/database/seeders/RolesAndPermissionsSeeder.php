<?php

namespace Database\Seeders;

use App\Enums\RoleType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User permissions
            'users.view',
            'users.create',
            'users.update',
            'users.delete',
            
            // Role permissions
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',
            
            // Permission permissions
            'permissions.view',
            'permissions.assign',
            
            // Notification permissions
            'notifications.send',
            'notifications.manage',
            
            // Settings permissions
            'settings.view',
            'settings.update',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles and assign permissions
        
        // Super Admin - All permissions
        $superAdmin = Role::create([
            'name' => RoleType::SuperAdmin->value,
            'guard_name' => 'web'
        ]);
        $superAdmin->givePermissionTo(Permission::all());

        // Admin - Most permissions except critical system ones
        $admin = Role::create([
            'name' => RoleType::Admin->value,
            'guard_name' => 'web'
        ]);
        $admin->givePermissionTo([
            'users.view', 'users.create', 'users.update',
            'roles.view',
            'permissions.view',
            'notifications.send', 'notifications.manage',
            'settings.view',
        ]);

        // Moderator - Content moderation
        $moderator = Role::create([
            'name' => RoleType::Moderator->value,
            'guard_name' => 'web'
        ]);
        $moderator->givePermissionTo([
            'users.view',
            'notifications.send',
        ]);

        // User - Basic permissions
        $user = Role::create([
            'name' => RoleType::User->value,
            'guard_name' => 'web'
        ]);
        // Users have no special permissions by default

        // Create default admin user
        $adminUser = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@redshift.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $adminUser->assignRole(RoleType::SuperAdmin->value);

        // Create regular user for testing
        $regularUser = User::create([
            'name' => 'Test User',
            'email' => 'user@redshift.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $regularUser->assignRole(RoleType::User->value);

        $this->command->info('Roles and permissions created successfully!');
        $this->command->info('Admin email: admin@redshift.com');
        $this->command->info('Admin password: password');
    }
}

