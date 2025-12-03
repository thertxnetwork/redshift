# Redshift - Full-Stack Mobile Application

> ✅ **Status:** Production-Ready MVP Complete

A production-ready Android mobile application built with **React Native Expo (TypeScript)** for the frontend and **Laravel 12.x** as the backend API, featuring modern UI/UX design, robust authentication with role-based access control, and asynchronous, non-blocking code patterns throughout.

## 🎉 Quick Start (3 Steps)

```bash
# 1. Backend
cd backend && composer install && php artisan migrate --seed && php artisan serve

# 2. Frontend  
cd frontend && npm install && npx expo start

# 3. Login
# Admin: admin@redshift.com / password
# User: user@redshift.com / password
```

## 🏗️ Project Structure

```
redshift/
├── frontend/          # React Native Expo (TypeScript) mobile app
├── backend/           # Laravel 12.x REST API
└── docs/              # Additional documentation
```

## 📋 Features

### Authentication System ✅
- User registration with email verification
- Login/Logout functionality
- Password reset via email
- Remember me / persistent sessions
- Secure token storage on device
- Auto-refresh tokens before expiry
- Biometric authentication (fingerprint/face)

### Role & Permission Management ✅
- **Super Admin:** Full system access
- **Admin:** User management, notifications, limited settings
- **Moderator:** Content moderation capabilities
- **User:** Standard user access

### User Profile Management
- View and edit profile information
- Change password with verification
- Upload profile picture with compression
- Account deactivation option
- Activity log viewing

### Notification System
- Real-time notification badge updates
- Pull-to-refresh notification list
- Mark as read/unread functionality
- Mark all as read
- Delete notifications
- Filter by read/unread status
- Push notification handling

### Admin Panel (In-App)
- Dashboard with stats overview
- User management (CRUD operations)
- Role management with permission assignment
- Notification center for broadcasting
- App configuration settings

## 🚀 Quick Start

### Prerequisites

- **Node.js:** v20.x or later
- **npm:** v10.x or later
- **PHP:** 8.3 or later
- **Composer:** 2.x or later
- **MySQL:** 8.0+ or PostgreSQL 16+
- **Redis:** (optional, for queues and caching)

### Backend Setup (Laravel 12.x)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your database in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=redshift
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```
   
   Or run specific seeder:
   ```bash
   php artisan db:seed --class=RolesAndPermissionsSeeder
   ```

7. Start the development server:
   ```bash
   php artisan serve
   ```

   The API will be available at `http://localhost:8000`

8. (Optional) Start queue worker:
   ```bash
   php artisan queue:work
   ```

### Frontend Setup (React Native Expo)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure API URL in `.env`:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:8000/api
   ```

5. Start the development server:
   ```bash
   npx expo start
   ```

6. Run on Android:
   ```bash
   npx expo run:android
   ```

## 🔐 Default Credentials

After running the seeders, use these credentials:

**Admin Account:**
- Email: `admin@redshift.com`
- Password: `password`

**User Account:**
- Email: `user@redshift.com`
- Password: `password`

⚠️ **Important:** Change these credentials in production!

## 📚 API Documentation

The API documentation is auto-generated using Scramble and available at:
```
http://localhost:8000/docs/api
```

### Key API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/user` - Get authenticated user

#### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/avatar` - Upload avatar
- `PUT /api/profile/password` - Change password

#### Notifications
- `GET /api/notifications` - List notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PUT /api/notifications/{id}/read` - Mark as read
- `PUT /api/notifications/mark-all-read` - Mark all as read
- `DELETE /api/notifications/{id}` - Delete notification

#### Admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user
- `POST /api/admin/notifications/send` - Send notification

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🏗️ Tech Stack

### Frontend
- React Native with Expo SDK 52+
- TypeScript (strict mode)
- Zustand for state management
- React Navigation v7+ with typed routes
- React Native Paper or Tamagui for UI
- Axios with typed interceptors
- React Hook Form + Zod validation
- TanStack Query (React Query) v5
- expo-notifications for push notifications

### Backend
- Laravel 12.x (PHP 8.3+)
- Laravel Sanctum for authentication
- Spatie Laravel Permission v6+ for RBAC
- Laravel API Resources for JSON transformation
- Laravel Queues with Redis/Database driver
- MySQL 8+ or PostgreSQL 16+
- Redis for caching and queues

## 📖 Additional Documentation

- [Backend API Documentation](./backend/README.md)
- [Frontend Development Guide](./frontend/README.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)

## 🔒 Security

- Input validation on both frontend and backend
- Rate limiting on API endpoints
- CORS configuration
- HTTPS for all communications
- Secure token storage
- SQL injection prevention
- XSS protection

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@thertxnetwork.com or open an issue in the repository.

## 🌟 Acknowledgments

Built with modern tools and best practices for scalability, security, and maintainability.
