// src/hooks/useConsentBanner.ts
import { useState, useCallback } from 'react';
import { useConsent } from '../context/ConsentContext';
import { useSystemHelpers } from './useSystemHelpers';

export const useConsentBanner = () => {
  const { consent, hasConsent, updateConsent, showConsentBanner, hideConsentBanner, isBannerVisible } = useConsent();
  const { saveData, getData } = useSystemHelpers();
  const [isCustomBannerVisible, setIsCustomBannerVisible] = useState(false);

  /**
   * Show a custom consent banner if not permanently dismissed
   */
  const showCustomBanner = useCallback(async () => {
    const isDismissed = await getData<boolean>('consentBannerDismissed', false);
    if (!isDismissed) {
      setIsCustomBannerVisible(true);
    }
  }, [getData]);

  /**
   * Hide the custom banner
   */
  const hideCustomBanner = useCallback(() => {
    setIsCustomBannerVisible(false);
  }, []);

  /**
   * Permanently dismiss the custom banner
   */
  const dismissCustomBannerPermanently = useCallback(async () => {
    await saveData('consentBannerDismissed', true);
    setIsCustomBannerVisible(false);
  }, [saveData]);

  /**
   * Accept all consent options
   */
  const acceptAll = useCallback(() => {
    updateConsent({ essential: true, marketing: true });
    hideConsentBanner();
    hideCustomBanner();
  }, [updateConsent, hideConsentBanner, hideCustomBanner]);

  /**
   * Accept only essential cookies
   */
  const acceptEssentialOnly = useCallback(() => {
    updateConsent({ essential: true, marketing: false });
    hideConsentBanner();
    hideCustomBanner();
  }, [updateConsent, hideConsentBanner, hideCustomBanner]);

  /**
   * Check if a feature is available based on required consent
   */
  const isFeatureAvailable = useCallback((requiresMarketing: boolean = false) => {
    if (requiresMarketing) {
      return hasConsent('marketing');
    }
    return true;
  }, [hasConsent]);

  return {
    consent,
    hasConsent,
    updateConsent,
    
    // Main consent banner (from context)
    showConsentBanner,
    hideConsentBanner,
    isBannerVisible,
    
    // Custom banner
    isCustomBannerVisible,
    showCustomBanner,
    hideCustomBanner,
    dismissCustomBannerPermanently,
    
    // Quick actions
    acceptAll,
    acceptEssentialOnly,
    isFeatureAvailable
  };
};