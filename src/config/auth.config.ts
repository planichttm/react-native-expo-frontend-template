// src/config/auth.config.ts

export interface AuthProviderConfig {
    enabled: boolean;
    clientId?: string;
    options?: {
      redirectUrl?: string;
      scopes?: string[];
    };
  }
  
  export interface AuthConfig {
    providers: {
      email: AuthProviderConfig;
      google: AuthProviderConfig;
    };
    features: {
      registration: boolean;
      passwordReset: boolean;
      deleteAccount: boolean;
    };
    ui: {
      logoUrl?: string;
      primaryColor: string;
      darkMode: boolean;
    };
  }
  
  export const authConfig: AuthConfig = {
    providers: {
      email: {
        enabled: false,  // Setze auf false um Email-Login zu deaktivieren
      },
      google: {
        enabled: true,  // Setze auf false um Google-Login zu deaktivieren
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        options: {
          redirectUrl: process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URI,
          scopes: ['profile', 'email']
        }
      }
    },
    features: {
      registration: true,     // Setze auf false um Registrierung zu deaktivieren
      passwordReset: true,    // Setze auf false um Passwort-Reset zu deaktivieren
      deleteAccount: true     // Setze auf false um Account-Löschung zu deaktivieren
    },
    ui: {
      logoUrl: undefined,     // Optional: URL zu deinem Logo
      primaryColor: '#38bdf8',
      darkMode: true
    }
  };
  
  // Helper function to check if a provider is enabled
  export const isProviderEnabled = (providerName: keyof AuthConfig['providers']): boolean => {
    return authConfig.providers[providerName]?.enabled || false;
  };
  
  // Helper function to check if a feature is enabled
  export const isFeatureEnabled = (featureName: keyof AuthConfig['features']): boolean => {
    return authConfig.features[featureName] || false;
  };