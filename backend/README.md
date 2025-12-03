# Laravel 12.x Backend API

Production-ready REST API built with Laravel 12.x, featuring Sanctum authentication, role-based access control, and comprehensive notification system.

## 🛠️ Setup

### Requirements
- PHP 8.3+
- Composer 2.x
- MySQL 8.0+ or PostgreSQL 16+
- Redis (optional, for queues/cache)

### Installation

1. Install dependencies:
   ```bash
   composer install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. Update `.env` with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=redshift
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. Run migrations and seed database:
   ```bash
   php artisan migrate --seed
   ```

5. Start development server:
   ```bash
   php artisan serve
   ```

## 🔐 Default Users

After seeding:

**Super Admin:**
- Email: admin@redshift.com
- Password: password

**Test User:**
- Email: user@redshift.com  
- Password: password

⚠️ Change these credentials in production!

## 🚀 API Endpoints

See the main [README.md](../README.md) for complete API documentation.

## 📊 Permissions System

### Roles
1. **Super Admin** - All permissions
2. **Admin** - User management, notifications
3. **Moderator** - Content moderation
4. **User** - Standard access

### Permissions
- users.view, users.create, users.update, users.delete
- roles.view, roles.create, roles.update, roles.delete
- permissions.view, permissions.assign
- notifications.send, notifications.manage
- settings.view, settings.update

## 📄 License

Apache License 2.0
