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

The authentication providers and features are configured in `src/config/auth.config.ts`. For example:

- **Email Provider:**  
  Set `enabled` to `true` or `false` to enable/disable email login.

- **Google Provider (OAuth):**  
  Set `enabled` to `true` to enable Google OAuth. Make sure to supply the Google client ID and redirect URL.  

  #### How to Set Up Google OAuth:
  
  1. **Create a Project in Google Cloud Console:**  
     Visit [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
  
  2. **Configure OAuth Credentials:**  
     Navigate to **APIs & Services > Credentials** and create an OAuth client ID.  
     - Select **Web application** (for web-based apps) or the appropriate application type.
     - Add your Supabase redirect URL (typically in the form `https://<your-supabase-project>.supabase.co/auth/v1/callback`) to the **Authorized redirect URIs**.
  
  3. **Obtain Client ID and Secret:**  
     Copy the client ID (and secret if needed) from your Google Cloud project.
  
  4. **Configure in Your Project:**  
     In `src/config/auth.config.ts`, set the Google provider’s `clientId` and `redirectUrl` (which can be read from environment variables such as `EXPO_PUBLIC_GOOGLE_CLIENT_ID` and `EXPO_PUBLIC_GOOGLE_REDIRECT_URI`).
  
  5. **Enable Google OAuth in Supabase:**  
     In your Supabase project, enable Google OAuth and provide the client ID and secret from your Google Cloud project.
  
  6. **Tutorial:**  
     For a detailed guide, check out this [YouTube tutorial](https://www.youtube.com/watch?v=dE2vtnv83Fc).

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

- **Login Screen:** Located at `src/screens/auth/LoginScreen.tsx`. Supports email login and Google OAuth (if enabled).
- **Register Screen:** Located at `src/screens/auth/RegisterScreen.tsx`. Allows new users to sign up using email.
- **User Profile:** Managed by `src/screens/UserProfile/UserProfileScreen.tsx` where users can view their profile, sign out, or delete their account (if enabled).

## Local Development

### Option 1: Separate Server Wrapper

If you prefer a separate file for starting a local server, create a file named `src/server.ts` (or in another suitable folder) with the following content:

```typescript
// src/server.ts
import App from './App';
import { registerRootComponent } from 'expo';

const PORT = process.env.PORT || 3000;

// For local testing, register the root component with Expo's AppRegistry:
registerRootComponent(App);

// (Optional) You can set up an HTTP server manually here if needed.
```

*Note:* Most Expo projects are started using the Expo CLI, so you typically run the app with Expo rather than starting an Express server manually.

### Option 2: Using Expo CLI

Since this template uses Expo, you generally start the project with the Expo CLI:

```bash
npm start
```

This will open the Expo developer tools in your browser. From there, you can launch the app in a web browser, on an Android emulator, or on an iOS simulator.

### Testing Supabase Integration

Ensure your `.env` file contains valid values for Supabase. If you’d like to disable Supabase (for initial testing without authentication), remove or leave the Supabase variables empty and adjust the configuration in `src/config/auth.config.ts` accordingly.

## Additional Notes

- **Supabase Integration:**  
  The Supabase client is set up in `src/services/supabase.ts`. Ensure your environment variables are correctly configured.
  
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

Simply copy the entire block above (including the triple backticks) into your `README.md` file.
