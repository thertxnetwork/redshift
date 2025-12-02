# Implementation Guide

This document provides a comprehensive guide to setting up and running the Redshift full-stack mobile application.

## Prerequisites

Ensure you have the following installed:

- **Node.js**: v20.x or later
- **npm**: v10.x or later
- **PHP**: 8.3 or later
- **Composer**: 2.x or later
- **SQLite** (included with PHP) or **MySQL 8.0+** / **PostgreSQL 16+**
- **Android Studio** (for Android development)
- **Expo Go** app on your Android device (optional, for quick testing)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/thertxnetwork/redshift.git
cd redshift
```

### 2. Backend Setup (Laravel 12.x)

#### 2.1 Install Dependencies

```bash
cd backend
composer install
```

#### 2.2 Configure Environment

```bash
cp .env.example .env
php artisan key:generate
```

The default `.env` is configured to use SQLite, which works out of the box. If you want to use MySQL or PostgreSQL, update the database configuration in `.env`:

```env
# For MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=redshift
DB_USERNAME=root
DB_PASSWORD=your_password

# For PostgreSQL
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=redshift
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

#### 2.3 Run Migrations and Seeders

```bash
php artisan migrate --seed
```

This will:
- Create all necessary database tables
- Create roles (super_admin, admin, moderator, user)
- Create permissions
- Create default admin and user accounts

**Default Credentials:**
- **Admin**: admin@redshift.com / password
- **User**: user@redshift.com / password

#### 2.4 Start the Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

To verify it's running, visit: `http://localhost:8000/api/admin/dashboard/stats` (will return 401 if not authenticated)

### 3. Frontend Setup (React Native Expo)

#### 3.1 Install Dependencies

```bash
cd ../frontend
npm install
```

#### 3.2 Configure Environment

```bash
cp .env.example .env
```

Update the `.env` file with your API URL:

```env
# For Android emulator (localhost)
EXPO_PUBLIC_API_URL=http://10.0.2.2:8000/api

# For physical device (replace with your computer's IP)
EXPO_PUBLIC_API_URL=http://192.168.1.100:8000/api

# For local testing
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

**Finding your computer's IP:**
- **Windows**: `ipconfig` (look for IPv4 Address)
- **macOS/Linux**: `ifconfig` or `ip addr` (look for inet)

#### 3.3 Start the Development Server

```bash
npx expo start
```

This will open the Expo Developer Tools in your browser.

#### 3.4 Run on Android

**Option 1: Android Emulator (Recommended)**
1. Make sure Android Studio is installed with an emulator
2. Start an Android emulator
3. Press `a` in the Expo terminal, or click "Run on Android device/emulator" in the web UI

**Option 2: Physical Device**
1. Install "Expo Go" app from Google Play Store
2. Scan the QR code shown in the terminal with the Expo Go app
3. Make sure your phone and computer are on the same network

## Testing the Application

### 1. Login Flow

1. Open the app on your Android device/emulator
2. You should see the Login screen
3. Enter one of the test credentials:
   - Admin: `admin@redshift.com` / `password`
   - User: `user@redshift.com` / `password`
4. Click "Sign In"
5. You should be redirected to the Home screen showing user profile information

### 2. API Testing

You can test the API endpoints using curl or Postman:

#### Register a new user:
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@redshift.com",
    "password": "password"
  }'
```

#### Get authenticated user (replace TOKEN with the token from login):
```bash
curl -X GET http://localhost:8000/api/auth/user \
  -H "Authorization: Bearer TOKEN"
```

#### Get notifications:
```bash
curl -X GET http://localhost:8000/api/notifications \
  -H "Authorization: Bearer TOKEN"
```

## Architecture Overview

### Backend (Laravel 12.x)

```
backend/
├── app/
│   ├── Enums/               # PHP 8.3 Enums (NotificationType, RoleType)
│   ├── Http/
│   │   └── Controllers/
│   │       ├── Auth/        # Authentication (login, register, logout)
│   │       └── Api/         # API controllers (notifications, etc.)
│   ├── Models/              # Eloquent models (User)
│   └── ...
├── database/
│   ├── migrations/          # Database migrations
│   └── seeders/             # Database seeders (roles, permissions)
├── routes/
│   └── api.php             # API routes
└── ...
```

**Key Features:**
- ✅ Laravel Sanctum for token-based authentication
- ✅ Spatie Laravel Permission for RBAC
- ✅ PHP 8.3 enums for type safety
- ✅ API Resources for JSON transformation
- ✅ Request validation
- ✅ Database migrations and seeders

### Frontend (React Native Expo)

```
frontend/
└── src/
    ├── api/                 # API client and methods
    │   ├── axios.config.ts  # Axios with interceptors
    │   ├── auth.api.ts      # Auth API methods
    │   └── notifications.api.ts
    ├── hooks/               # Custom React hooks
    │   ├── useAuth.ts       # Auth hooks (login, logout, etc.)
    │   └── useNotifications.ts
    ├── screens/             # App screens
    │   ├── auth/            # Login, Register
    │   └── main/            # Home, Profile, etc.
    ├── store/               # Zustand state management
    │   └── authStore.ts     # Auth state
    └── types/               # TypeScript types
        ├── user.types.ts
        ├── notification.types.ts
        └── api.types.ts
```

**Key Features:**
- ✅ TypeScript strict mode
- ✅ Zustand for state management
- ✅ TanStack Query for data fetching
- ✅ Expo Secure Store for token storage
- ✅ React Native Paper for UI components
- ✅ Type-safe API client with Axios

## Common Issues and Solutions

### Issue 1: "Network Error" when logging in

**Solution**: Make sure the API URL in `frontend/.env` is correct:
- For Android emulator: Use `http://10.0.2.2:8000/api`
- For physical device: Use your computer's IP address

### Issue 2: Backend server not starting

**Solution**: 
1. Check if port 8000 is already in use
2. Make sure database is configured correctly
3. Run `php artisan config:clear` to clear cached config

### Issue 3: Frontend TypeScript errors

**Solution**:
1. Run `npm install` to ensure all dependencies are installed
2. Delete `node_modules` and `package-lock.json`, then run `npm install` again
3. Restart your IDE/editor

### Issue 4: "Class 'Spatie\Permission\PermissionServiceProvider' not found"

**Solution**:
1. Run `composer install` in the backend directory
2. Run `composer dump-autoload`
3. Clear cache with `php artisan cache:clear`

## Next Steps

### Additional Features to Implement

1. **Profile Management**
   - Edit profile information
   - Upload avatar
   - Change password

2. **Notifications**
   - List all notifications
   - Mark as read/unread
   - Delete notifications
   - Push notification support

3. **Admin Panel**
   - User management (CRUD)
   - Role management (CRUD)
   - Send notifications to users/roles

4. **UI Enhancements**
   - Dark mode support
   - Skeleton loaders
   - Animations and transitions
   - Pull-to-refresh

5. **Security**
   - Rate limiting
   - Input validation
   - CORS configuration
   - Biometric authentication

## Development Tips

### Backend Development

```bash
# Watch for changes (automatic reload)
php artisan serve --host=0.0.0.0 --port=8000

# Clear all caches
php artisan optimize:clear

# Run tests
php artisan test

# Check code style
./vendor/bin/pint

# Generate API documentation
php artisan scramble:generate
```

### Frontend Development

```bash
# Type check
npx tsc --noEmit

# Clear Expo cache
npx expo start -c

# Build for production
npx expo build:android
```

## Support

For issues or questions:
1. Check the [README.md](../README.md)
2. Review [backend/README.md](../backend/README.md) and [frontend/README.md](../frontend/README.md)
3. Open an issue on GitHub

## License

Apache License 2.0
