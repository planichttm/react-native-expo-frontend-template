// src/hooks/useAuthHelpers.ts
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

/**
 * Hook for providing enhanced authentication functionality and utilities
 */
export const useAuthHelpers = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const { user, signInWithGoogle, signOut } = auth;

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!user;

  /**
   * Get display name from the user's email
   */
  const getDisplayName = () => {
    if (!user?.email) return 'User';
    return user.email.split('@')[0];
  };

  /**
   * Sign in with Google and navigate to main app
   */
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      return true;
    } catch (error) {
      console.error('Sign in failed:', error);
      return false;
    }
  };

  /**
   * Sign out and navigate to auth screen
   */
  const handleSignOut = async () => {
    try {
      await signOut();
      return true;
    } catch (error) {
      console.error('Sign out failed:', error);
      return false;
    }
  };

  /**
   * Navigate to profile screen
   */
  const navigateToProfile = () => {
    navigation.navigate('Profile' as never);
  };

  return {
    ...auth,
    isAuthenticated,
    getDisplayName,
    handleSignIn,
    handleSignOut,
    navigateToProfile
  };
};