// src/hoc/withConsentCheck.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useConsent } from '../context/ConsentContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hocStyles } from '../styles/hoc.styles';

/**
 * Higher-Order Component that checks if the user has given the required consent
 * before rendering the wrapped component. If not, it shows a restriction message.
 * 
 * @param WrappedComponent The component to wrap
 * @param featureName The name of the feature for display purposes
 * @param requiredConsent The type of consent required (usually 'marketing')
 * @param customMessage Optional custom message to display if access is restricted
 */
const withConsentCheck = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  featureName: string,
  requiredConsent: 'essential' | 'marketing' = 'marketing',
  customMessage?: string
) => {
  const WithConsentCheck: React.FC<P> = (props) => {
    const { hasConsent } = useConsent();
    const navigation = useNavigation();
    
    // Check if the user has the required consent
    if (!hasConsent(requiredConsent)) {
      // If not, show the restricted feature message
      return (
        <View style={hocStyles.container}>
          <Icon name="lock" size={60} style={hocStyles.icon} />
          
          <Text style={hocStyles.title}>Feature Restricted</Text>
          
          <Text style={hocStyles.featureName}>{featureName}</Text>
          
          <Text style={hocStyles.message}>
            {customMessage || `To access this feature, you must accept marketing cookies. Please update your settings in your profile.`}
          </Text>
          
          <TouchableOpacity 
            style={hocStyles.button}
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <Text style={hocStyles.buttonText}>Go to Settings</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    // Otherwise, render the original component
    return <WrappedComponent {...props} />;
  };
  
  // Update the display name for debugging purposes
  WithConsentCheck.displayName = `WithConsentCheck(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  
  return WithConsentCheck;
};

export default withConsentCheck;