// src/hooks/useSystemHelpers.ts
import { useState, useEffect } from 'react';
import { Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/theme';

interface DeviceInfo {
  platform: 'ios' | 'android' | 'web';
  width: number;
  height: number;
  isSmallDevice: boolean;
}

/**
 * Hook for providing system and device related utilities
 */
export const useSystemHelpers = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    const { width, height } = Dimensions.get('window');
    return {
      platform: Platform.OS as 'ios' | 'android' | 'web',
      width,
      height,
      isSmallDevice: width < 375
    };
  });

  // Update device info on dimension change
  useEffect(() => {
    const handleDimensionChange = ({ window }: { window: { width: number; height: number } }) => {
      setDeviceInfo(prev => ({
        ...prev,
        width: window.width,
        height: window.height,
        isSmallDevice: window.width < 375
      }));
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionChange);

    return () => {
      // Handle cleanup differently based on React Native version
      if (typeof subscription?.remove === 'function') {
        subscription.remove();
      }
    };
  }, []);

  /**
   * Save data to AsyncStorage
   */
  const saveData = async (key: string, value: any): Promise<boolean> => {
    try {
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  };

  /**
   * Get data from AsyncStorage
   */
  const getData = async <T>(key: string, defaultValue?: T): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue === null) return defaultValue || null;
      
      try {
        return JSON.parse(jsonValue) as T;
      } catch {
        // If it's not valid JSON, return as string
        return jsonValue as unknown as T;
      }
    } catch (error) {
      console.error('Error getting data:', error);
      return defaultValue || null;
    }
  };

  /**
   * Remove data from AsyncStorage
   */
  const removeData = async (key: string): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  };

  return {
    deviceInfo,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    isWeb: Platform.OS === 'web',
    saveData,
    getData,
    removeData,
    getThemeColor: (colorPath: string, fallback: string = '#38bdf8') => {
      // Simple utility to access nested theme colors with a path string
      try {
        const parts = colorPath.split('.');
        let result: any = theme.colors;
        
        for (const part of parts) {
          if (result[part] === undefined) return fallback;
          result = result[part];
        }
        
        return typeof result === 'string' ? result : fallback;
      } catch (error) {
        return fallback;
      }
    }
  };
};