// src/hoc/withAuthCheck.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hocStyles } from '../styles/hoc.styles';
import { useAuthHelpers } from '../hooks';

/**
 * Higher-Order Component that checks if the user is authenticated
 * before rendering the wrapped component. If not, it shows a login prompt.
 * 
 * @param WrappedComponent The component to wrap
 * @param featureName The name of the feature for display purposes
 */
const withAuthCheck = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  featureName: string
) => {
  const WithAuthCheck: React.FC<P> = (props) => {
    const { user, handleSignIn } = useAuthHelpers();
    const [isLoading, setIsLoading] = useState(false);
    
    // Handle sign in with loading state
    const onSignIn = async () => {
      setIsLoading(true);
      try {
        await handleSignIn();
      } catch (error) {
        console.error('Sign in failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check if the user is authenticated
    if (!user) {
      // If not, show the login prompt
      return (
        <View style={hocStyles.container}>
          <Icon name="lock" size={60} style={hocStyles.icon} />
          
          <Text style={hocStyles.title}>Authentication Required</Text>
          
          <Text style={hocStyles.featureName}>{featureName}</Text>
          
          <Text style={hocStyles.message}>
            You need to sign in to access this feature. Please log in to continue.
          </Text>
          
          <TouchableOpacity 
            style={hocStyles.button}
            onPress={onSignIn}
            disabled={isLoading}
          >
            <Text style={hocStyles.buttonText}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    // Otherwise, render the original component
    return <WrappedComponent {...props} />;
  };
  
  // Update the display name for debugging purposes
  WithAuthCheck.displayName = `WithAuthCheck(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  
  return WithAuthCheck;
};

export default withAuthCheck;