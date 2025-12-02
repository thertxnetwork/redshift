# React Native Expo Frontend

Mobile application built with React Native Expo (TypeScript), featuring authentication, role-based access control, and real-time notifications.

## 🛠️ Setup

### Requirements
- Node.js 20.x+
- npm 10.x+
- Expo CLI
- Android Studio (for Android development)
- iOS: Xcode on macOS (for iOS development)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your API URL:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Run on Android:
   ```bash
   npx expo run:android
   ```

6. Run on iOS (macOS only):
   ```bash
   npx expo run:ios
   ```

## 📁 Project Structure

```
src/
├── api/                    # API client configuration and methods
│   ├── axios.config.ts    # Axios instance with interceptors
│   ├── auth.api.ts        # Authentication API methods
│   └── notifications.api.ts
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Authentication hooks
│   └── useNotifications.ts
├── navigation/           # Navigation configuration
│   └── types.ts          # Navigation type definitions
├── screens/              # App screens
│   ├── auth/            # Authentication screens
│   ├── main/            # Main app screens
│   ├── profile/         # Profile screens
│   ├── notifications/   # Notification screens
│   └── admin/           # Admin screens
├── store/               # State management (Zustand)
│   └── authStore.ts     # Auth state store
├── types/               # TypeScript type definitions
│   ├── user.types.ts
│   ├── notification.types.ts
│   ├── api.types.ts
│   └── index.ts
├── utils/               # Utility functions
└── theme/               # Theme configuration
    └── index.ts
```

## 🚀 Tech Stack

- **Framework:** React Native with Expo SDK 52+
- **Language:** TypeScript (strict mode)
- **State Management:** Zustand with persistence
- **Navigation:** React Navigation v7+
- **UI Library:** React Native Paper
- **HTTP Client:** Axios with typed interceptors
- **Form Handling:** React Hook Form + Zod validation
- **Data Fetching:** TanStack Query (React Query) v5
- **Storage:** 
  - @react-native-async-storage/async-storage (non-sensitive data)
  - expo-secure-store (tokens and sensitive data)
- **Push Notifications:** expo-notifications
- **Icons:** @expo/vector-icons
- **Animations:** react-native-reanimated v3
- **Gestures:** react-native-gesture-handler
- **Date Handling:** date-fns

## 🔐 Authentication

The app uses token-based authentication with Laravel Sanctum:

1. User logs in with email/password
2. Server returns user data and API token
3. Token is securely stored using `expo-secure-store`
4. Token is automatically included in all API requests via Axios interceptors
5. Unauthorized responses (401) automatically clear auth state

## 📱 Available Scripts

```bash
# Start development server
npm start
npx expo start

# Run on Android
npx expo run:android

# Run on iOS (macOS only)
npx expo run:ios

# Run on web
npx expo start --web

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build for production
npx eas build --platform android
npx eas build --platform ios
```

## 🧪 Features

### Implemented
- ✅ TypeScript strict mode configuration
- ✅ Axios configuration with typed interceptors
- ✅ Type definitions for User, Notification, API responses
- ✅ Zustand store for authentication
- ✅ TanStack Query hooks for data fetching
- ✅ Secure token storage
- ✅ API client methods for auth and notifications
- ✅ App providers setup (QueryClient, Paper, Navigation)

### Coming Soon
- 🚧 Authentication screens (Login, Register, Password Reset)
- 🚧 Main app screens (Home, Profile, Notifications)
- 🚧 Admin panel screens
- 🚧 Role-based navigation
- 🚧 Push notification handling
- 🚧 Dark mode support
- 🚧 Biometric authentication
- 🚧 Offline support

## 🎨 UI/UX Features

- Clean, minimalist design
- Dark mode support
- Skeleton loaders
- Pull-to-refresh
- Infinite scroll pagination
- Smooth animations
- Haptic feedback
- Toast notifications

## 🔒 Security

- Secure token storage with expo-secure-store
- Automatic token refresh
- Input validation with Zod
- XSS protection
- Secure API communication

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

## 📄 License

Apache License 2.0
