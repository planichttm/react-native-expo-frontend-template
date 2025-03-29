// src/services/navigationService.ts
import { createRef } from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

/**
 * Create a navigation ref that can be used outside of React components
 */
export const navigationRef = createRef<NavigationContainerRef<any>>();

/**
 * Navigate to a specific route
 */
export function navigate(name: string, params?: any) {
  if (navigationRef.current) {
    // @ts-ignore
    navigationRef.current.navigate(name, params);
  } else {
    // Save the navigation intent for when the navigator is ready
    // This could be stored and executed when navigationRef becomes available
    console.warn('Navigation attempted before navigator was ready');
  }
}

/**
 * Go back to the previous screen
 */
export function goBack() {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  }
}

/**
 * Replace the current screen with a new one
 */
export function replace(name: string, params?: any) {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.replace(name, params));
  }
}

/**
 * Reset the entire navigation state
 */
export function reset(routes: Array<{ name: string; params?: any }>, index: number = 0) {
  if (navigationRef.current) {
    navigationRef.current.reset({
      index,
      routes,
    });
  }
}

/**
 * Check if we can go back
 */
export function canGoBack(): boolean {
  return navigationRef.current ? navigationRef.current.canGoBack() : false;
}

/**
 * Get the current route name
 */
export function getCurrentRoute() {
  return navigationRef.current ? navigationRef.current.getCurrentRoute() : undefined;
}

/**
 * Singleton NavigationService that can be used anywhere
 */
const NavigationService = {
  navigate,
  goBack,
  replace,
  reset,
  canGoBack,
  getCurrentRoute,
};

export default NavigationService;