// src/hooks/useUIHelpers.ts
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useConsent } from '../context/ConsentContext';
import { theme } from '../styles/theme';
import NavigationService from '../services/navigationService';

/**
 * Hook for providing UI-related utilities and helpers
 */
export const useUIHelpers = () => {
  const navigation = useNavigation();
  const { hasConsent } = useConsent();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Show an alert dialog with OK button
   */
  const showAlert = (title: string, message: string, onOk?: () => void) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: onOk }]
    );
  };

  /**
   * Show a confirmation dialog with Cancel and Confirm buttons
   */
  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel'
  ) => {
    Alert.alert(
      title,
      message,
      [
        { text: cancelLabel, style: 'cancel', onPress: onCancel },
        { text: confirmLabel, style: 'destructive', onPress: onConfirm }
      ]
    );
  };

  /**
   * Execute a function with loading state handling
   */
  const withLoading = async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fn();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Navigate to another screen using the NavigationService
   */
  const navigateTo = useCallback((routeName: string, params?: any) => {
    NavigationService.navigate(routeName, params);
  }, []);

  /**
   * Go back to previous screen
   */
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  /**
   * Check if a feature is accessible based on consent
   */
  const canAccessFeature = (requiresMarketing = false) => {
    if (requiresMarketing) {
      return hasConsent('marketing');
    }
    return true;
  };

  /**
   * Get color based on status value (0-1)
   */
  const getStatusColor = (value: number) => {
    if (value >= 0.7) return theme.colors.success;
    if (value >= 0.4) return theme.colors.warning;
    return theme.colors.danger;
  };

  return {
    isLoading,
    error,
    setError,
    showAlert,
    showConfirm,
    withLoading,
    navigateTo,
    goBack,
    canAccessFeature,
    getStatusColor
  };
};