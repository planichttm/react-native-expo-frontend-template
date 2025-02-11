# react-native-frontend-template

This repository is a React Native frontend template built with Expo and Metro. It includes a complete authentication flow with login and registration screens integrated with Supabase. The template is designed for quick setup and easy customization, featuring a modular folder structure and configurable authentication providers.

## Features

- **React Native with Expo:** Rapid development and testing using Expo.
- **Authentication:** Built-in login and registration screens using Supabase.
- **Configurable Auth Providers:** Enable or disable email and Google authentication via `auth.config.ts`.
- **User Profile Management:** Basic user profile and account deletion functionality.
- **Modular Structure:** Organized folders for configuration, context, screens, services, and types.
- **Environment Variables:** Easily configure Supabase API details via a `.env` file.
- **Optional Supabase Integration:** Use the `USE_SUPABASE` environment variable (if implemented) to enable or disable Supabase features.

## Folder Structure

```
.
├── src
│   ├── config
│   │   └── auth.config.ts      # Authentication configuration
│   ├── context
│   │   ├── AuthContext.tsx      # Authentication context and provider
│   │   └── UserProfileContext.tsx (if used)
│   ├── repositories
│   │   └── userProfileRepository.ts  # (Optional) Repository for user profile data
│   ├── screens
│   │   ├── auth
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── Home
│   │   │   └── HomeScreen.tsx
│   │   └── UserProfile
│   │       └── UserProfileScreen.tsx
│   ├── services
│   │   └── supabase.ts          # Supabase client and authentication functions
│   ├── styles
│   │   └── auth.styles.ts       # (Optional) Authentication-related styles
│   └── types
│       ├── auth.types.ts
│       └── userProfile.types.ts
├── App.tsx                    # Main application entry point
├── app.json                   # Expo configuration
├── package.json
├── tsconfig.json
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (install globally via `npm install -g expo-cli`)

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd token-comparison-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory (this file is ignored by Git) with the following content (adjust the values as needed):

```dotenv
EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

These variables are used by the Supabase service defined in `src/services/supabase.ts`.

### Auth Providers Configuration

You can configure which authentication providers are enabled in `src/config/auth.config.ts`. For example:

- **Email Provider:** Set `enabled` to `true` or `false`.
- **Google Provider:** Set `enabled` to `true` to enable Google OAuth. Make sure to set the `clientId` and `redirectUrl` from your Google project.

The configuration also lets you toggle features like registration, password reset, and account deletion, as well as customize UI settings (e.g., primary color and dark mode).

### Running the App

Start your Expo project by running:

```bash
npx expo start --web
```

This command will start the Expo development server. You can also run the app on Android or iOS by using:

```bash
npm run android
```

or

```bash
npm run ios
```

For web testing, use:

```bash
npm run web
```

### Authentication Flow

- **Login Screen:** Located at `src/screens/auth/LoginScreen.tsx`. Supports email login and Google OAuth (if enabled in the configuration).
- **Register Screen:** Located at `src/screens/auth/RegisterScreen.tsx`. Allows new users to sign up using email.
- **User Profile:** Managed by `src/screens/UserProfile/UserProfileScreen.tsx` where users can view their profile, sign out, or delete their account (if the feature is enabled).

## Local Development

### Option 1: Separate Server Wrapper

If you prefer to have a separate file for starting the local server, create a file named `src/server.ts` (or within another suitable folder) with the following content:

```typescript
// src/server.ts
import App from './App';
import { registerRootComponent } from 'expo';

const PORT = process.env.PORT || 3000;

// For local testing, you can register the root component with Expo's AppRegistry:
registerRootComponent(App);

// If you need to create an HTTP server manually (for web testing), you can set up Express here.
```

*Note:* Most Expo projects are started using the Expo CLI, so you typically run the app with Expo rather than starting an Express server manually.

### Option 2: Using Expo CLI

Since this template uses Expo, you generally start the project with Expo CLI:

```bash
npm start
```

This will open the Expo developer tools in your browser. From there, you can launch the app in a web browser, on an Android emulator, or on an iOS simulator.

### Testing Supabase Integration

Ensure your `.env` file contains valid values for Supabase. If you’d like to disable Supabase (for initial testing without authentication), you can remove or leave the Supabase variables empty. Adjust your configuration in `src/config/auth.config.ts` accordingly if needed.

## Additional Notes

- **Supabase Integration:**  
  The Supabase client is set up in `src/services/supabase.ts`. Make sure your environment variables are correctly configured.
  
- **Expo and Metro:**  
  The template uses Expo with Metro runtime. If needed, you can install additional packages:
  ```bash
  npm install @expo/metro-runtime metro-runtime
  ```

- **Navigation:**  
  The app uses React Navigation. Navigation is configured in `App.tsx` with stack and tab navigators.

- **Customization:**  
  Feel free to modify the configuration in `src/config/auth.config.ts` and adjust the folder structure as needed for your project.

## License

This project is licensed under the MIT License.
````markdown
