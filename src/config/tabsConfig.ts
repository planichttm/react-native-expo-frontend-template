// src/config/tabsConfig.ts
import { MainTabParamList } from '../../App';

/**
 * Configuration for tab visibility.
 * Each tab can have different visibility settings.
 */
export interface TabVisibilityConfig {
  // Always visible regardless of consent
  alwaysVisible: boolean; 
  // Requires marketing consent to be visible
  requiresMarketingConsent: boolean;
  // Requires user to be signed in
  requiresSignedIn: boolean;
}

/**
 * Complete configuration for all tabs.
 * Set appropriate values for each tab to control visibility.
 */
export const TABS_CONFIG: Record<keyof MainTabParamList, TabVisibilityConfig> = {
  Home: {
    alwaysVisible: true, // Changed to true to make sure Home is always visible
    requiresMarketingConsent: false,
    requiresSignedIn: false // Changed to false to make Home accessible without authentication
  },
  UserProfile: {
    alwaysVisible: true,
    requiresMarketingConsent: false,
    requiresSignedIn: true
  },
};

/**
 * Determines if a tab should be visible based on the user's consent status and authentication state
 */
export function isTabVisible(
  tabName: keyof MainTabParamList,
  consent: { essential: boolean; marketing: boolean },
  isAuthenticated: boolean
): boolean {
  const config = TABS_CONFIG[tabName];
  
  // Tab is always visible regardless of consent or auth
  if (config.alwaysVisible) {
    return true;
  }
  
  // Check if tab requires authentication
  if (config.requiresSignedIn && !isAuthenticated) {
    return false;
  }
  
  // Tab requires marketing consent and user has granted it
  if (config.requiresMarketingConsent && consent.marketing) {
    return true;
  }
  
  // In all other cases, the tab should be visible if it doesn't require marketing consent
  return !config.requiresMarketingConsent;
}

/**
 * Get a filtered list of visible tabs based on consent status and authentication state
 */
export function getVisibleTabs(
  consent: { essential: boolean; marketing: boolean },
  isAuthenticated: boolean
): Array<keyof MainTabParamList> {
  return Object.keys(TABS_CONFIG)
    .filter((tabName) => isTabVisible(tabName as keyof MainTabParamList, consent, isAuthenticated))
    .map((tabName) => tabName as keyof MainTabParamList);
}