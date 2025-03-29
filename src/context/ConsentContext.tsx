// src/context/ConsentContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { system } from '../styles/system';
import { theme } from '../styles/theme';

// Type for consent state
export type ConsentType = {
  essential: boolean;
  marketing: boolean;
};

// Type for the context
type CookieConsentContextType = {
  consent: ConsentType;
  updateConsent: (newConsent: ConsentType) => void;
  hasConsent: (type: keyof ConsentType) => boolean;
  showConsentBanner: () => void;
  hideConsentBanner: () => void;
  isBannerVisible: boolean;
};

// Create the context
const ConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

// Provider props type
type ProviderProps = {
  children: ReactNode;
};

export const ConsentProvider: React.FC<ProviderProps> = ({ children }) => {
  // State for consent status (essential is always true)
  const [consent, setConsent] = useState<ConsentType>({ essential: true, marketing: false });
  // State for banner visibility
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  // Load saved consent on initial render
  useEffect(() => {
    const loadConsent = async () => {
      try {
        const savedConsent = await AsyncStorage.getItem('userConsent');
        if (savedConsent) {
          setConsent(JSON.parse(savedConsent));
          setIsBannerVisible(false);
        }
      } catch (error) {
        console.error('Error loading consent settings:', error);
      }
    };

    loadConsent();
  }, []);

  // Update consent settings and save to storage
  const updateConsent = async (newConsent: ConsentType) => {
    try {
      await AsyncStorage.setItem('userConsent', JSON.stringify(newConsent));
      setConsent(newConsent);
      setIsBannerVisible(false);
    } catch (error) {
      console.error('Error saving consent settings:', error);
    }
  };

  // Show the consent banner programmatically
  const showConsentBanner = () => {
    setIsBannerVisible(true);
  };

  // Hide the consent banner programmatically
  const hideConsentBanner = () => {
    setIsBannerVisible(false);
  };

  // Helper to check if a specific consent type is granted
  const hasConsent = (type: keyof ConsentType) => consent[type] === true;

  return (
    <ConsentContext.Provider value={{ 
      consent, 
      updateConsent, 
      hasConsent, 
      showConsentBanner, 
      hideConsentBanner,
      isBannerVisible
    }}>
      {/* Display consent banner if needed */}
      {isBannerVisible && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            This app collects data to improve your experience. 
            Without consent to marketing cookies, some features will not be available.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => updateConsent({ essential: true, marketing: false })}
              style={styles.declineButton}
            >
              <Text style={styles.buttonText}>Essential Cookies Only</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => updateConsent({ essential: true, marketing: true })}
              style={styles.acceptButton}
            >
              <Text style={styles.buttonText}>Accept All</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {children}
    </ConsentContext.Provider>
  );
};

// Hook for easy access to the context
export const useConsent = (): CookieConsentContextType => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
};

// Banner-specific styles that don't need to be reused elsewhere
const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.card,
    padding: theme.spacing.md,
    zIndex: 1000,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadow.md,
  },
  bannerText: {
    ...system.bodyText,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  acceptButton: {
    ...system.button,
    paddingHorizontal: theme.spacing.md,
  },
  declineButton: {
    ...system.button,
    backgroundColor: theme.colors.background.elevated,
    paddingHorizontal: theme.spacing.md,
  },
  buttonText: {
    ...system.buttonText,
  },
});