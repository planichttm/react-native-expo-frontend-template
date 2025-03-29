# react-native-frontend-template

This repository is a React Native frontend template built with Expo and Metro. It includes a complete authentication flow with login and registration screens integrated with Supabase, along with a comprehensive consent management system. The template follows clean architecture principles for better maintainability and scalability.

## Features

- **React Native with Expo:** Rapid development and testing using Expo.
- **Authentication:** Built-in login and registration screens using Supabase.
- **Configurable Auth Providers:** Enable or disable email and Google authentication via `auth.config.ts`.
- **User Profile Management:** Basic user profile and account deletion functionality.
- **Consent Management:** Complete cookie/consent system with customizable banners and settings.
- **Higher Order Components:** Authentication and consent checks to protect routes and features.
- **Clean Architecture:** Well-organized layers with domain, services, repositories, hooks, and screens.
- **Comprehensive Styling System:** Theme-based styling with reusable components.
- **Environment Variables:** Easily configure Supabase API details via a `.env` file.

## Architecture Overview

This application follows a Clean Architecture pattern with distinct layers:

1. **Repositories** - Data access layer that communicates with external sources
2. **Services** - Simple data transformation and coordination with repositories
3. **Domain/Use Cases** - Business logic and orchestration of complex operations
4. **Hooks** - UI state management and bridging between use cases and UI
5. **Screens** - UI components and event handling
6. **HOCs** - Higher Order Components for cross-cutting concerns

## Folder Structure

```
.
├── src
│   ├── components
│   │   └── shared                # Reusable UI components
│   │       ├── ConsentSettings.tsx
│   │       ├── CustomConsentBanner.tsx
│   │       └── ProfileButton.tsx
│   ├── config
│   │   ├── auth.config.ts        # Authentication configuration
│   │   └── tabsConfig.ts         # Tab visibility configuration
│   ├── context
│   │   ├── AuthContext.tsx       # Authentication context and provider
│   │   ├── ConsentContext.tsx    # Consent management context
│   │   └── UserProfileContext.tsx
│   ├── domain                    # Business logic layer
│   │   └── README.md
│   ├── hoc                       # Higher Order Components
│   │   ├── withAuthCheck.tsx     # Authentication protection
│   │   └── withConsentCheck.tsx  # Consent-based feature protection
│   ├── hooks                     # Custom React hooks
│   │   ├── useAuthHelpers.ts
│   │   ├── useConsentBanner.ts
│   │   ├── useSystemHelpers.ts
│   │   └── useUIHelpers.ts
│   ├── repositories              # Data access layer
│   │   └── userProfileRepository.ts
│   ├── screens
│   │   ├── auth
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── Home
│   │   │   └── HomeScreen.tsx
│   │   └── UserProfile
│   │       └── UserProfileScreen.tsx
│   ├── services
│   │   ├── navigationService.ts  # Global navigation service
│   │   └── supabase.ts           # Supabase client and auth functions
│   ├── styles                    # Styling system
│   │   ├── components            # Component-specific styles
│   │   ├── screens               # Screen-specific styles
│   │   ├── components.ts         # Shared component styles
│   │   ├── hoc.styles.ts         # HOC-specific styles
│   │   ├── system.ts             # System-wide styles
│   │   └── theme.ts              # Theme configuration
│   ├── types                     # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── navigation.types.ts
│   │   └── userProfile.types.ts
│   └── utils                     # Utility functions
│       └── consentUtils.ts       # Consent-related utilities
├── App.tsx                       # Main application entry point
├── app.json                      # Expo configuration
├── package.json
├── tsconfig.json
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (install globally via `npm install -g expo-cli`)

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd react-native-frontend-template
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
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
EXPO_PUBLIC_GOOGLE_REDIRECT_URI=your-redirect-uri
```

These variables are used by the Supabase service defined in `src/services/supabase.ts`.

### Auth Providers Configuration

The authentication providers and features are configured in `src/config/auth.config.ts`:

- **Email Provider:** Set `enabled` to `true` or `false` to enable/disable email login.
- **Google Provider (OAuth):** Set `enabled` to `true` to enable Google OAuth.

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
   In `src/config/auth.config.ts`, set the Google provider's `clientId` and `redirectUrl` (which can be read from environment variables).

5. **Enable Google OAuth in Supabase:**  
   In your Supabase project, enable Google OAuth and provide the client ID and secret from your Google Cloud project.

6. **Tutorial:**  
   For a detailed guide, check out this [YouTube tutorial](https://www.youtube.com/watch?v=dE2vtnv83Fc).

### Consent System Configuration

The application includes a comprehensive consent management system:

- **Context:** `src/context/ConsentContext.tsx` provides the main consent management functionality.
- **Components:** `ConsentSettings.tsx` and `CustomConsentBanner.tsx` offer UI components for consent management.
- **HOC:** `withConsentCheck.tsx` protects features based on consent status.
- **Hooks:** `useConsentBanner.ts` provides helper functions for working with consent banners.

The tab visibility based on consent status can be configured in `src/config/tabsConfig.ts`.

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

## Key Components

### Authentication Flow

- **Login Screen:** Located at `src/screens/auth/LoginScreen.tsx`. Supports email login and Google OAuth (if enabled).
- **Register Screen:** Located at `src/screens/auth/RegisterScreen.tsx`. Allows new users to sign up using email.
- **Auth Context:** Managed by `src/context/AuthContext.tsx` which handles authentication state.
- **Auth Helpers:** `src/hooks/useAuthHelpers.ts` provides additional authentication utilities.

### User Profile

- **Profile Screen:** Located at `src/screens/UserProfile/UserProfileScreen.tsx` where users can:
  - View their profile
  - Manage consent settings
  - Sign out
  - Delete their account (if enabled)

### Consent Management

- **Consent Context:** `src/context/ConsentContext.tsx` manages consent state.
- **Consent Banner:** `src/components/shared/CustomConsentBanner.tsx` provides a customizable banner.
- **Consent Settings:** `src/components/shared/ConsentSettings.tsx` allows users to update their consent preferences.
- **Feature Protection:** `src/hoc/withConsentCheck.tsx` protects features that require specific consent.

### Navigation

- **Navigation Service:** `src/services/navigationService.ts` provides navigation functionality that can be used outside of React components.
- **Tab Configuration:** `src/config/tabsConfig.ts` controls tab visibility based on consent and authentication status.

## Styling System

The template includes a comprehensive styling system:

- **Theme:** `src/styles/theme.ts` defines colors, spacing, typography, etc.
- **System Styles:** `src/styles/system.ts` provides system-wide reusable styles.
- **Component Styles:** Component-specific styles in `src/styles/components/`.
- **Screen Styles:** Screen-specific styles in `src/styles/screens/`.

## Additional Notes

- **Clean Architecture:** The template follows clean architecture principles with clear separation of concerns. See `src/README.md` for details.
- **HOCs (Higher Order Components):** Used for authentication and consent checks to protect routes and features.
- **Hooks:** Custom hooks provide reusable logic and state management.
- **Utilities:** Helper functions and utilities in `src/utils/`.

## License

This project is licensed under the MIT License.