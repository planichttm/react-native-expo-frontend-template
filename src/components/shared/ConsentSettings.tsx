// src/components/shared/ConsentSettings.tsx
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useConsent } from '../../context/ConsentContext';
import { system } from '../../styles/system';
import { components } from '../../styles/components';
import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

/**
 * Component for managing consent settings
 */
const ConsentSettings: React.FC = () => {
  const { consent, updateConsent } = useConsent();
  
  // Essential cookies are always required
  const handleEssentialChange = () => {
    // Do nothing - essential cookies cannot be disabled
  };
  
  const handleMarketingChange = (value: boolean) => {
    updateConsent({
      ...consent,
      marketing: value
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cookie Settings</Text>
      
      <Text style={styles.description}>
        Here you can manage your cookie settings. Please note 
        that some features of the App will not be available without marketing cookies.
      </Text>
      
      <View style={styles.optionRow}>
        <View style={styles.textContainer}>
          <Text style={styles.optionTitle}>Essential cookies</Text>
          <Text style={styles.optionDescription}>
            Necessary for the basic functions of the app. These cookies cannot be disabled.
          </Text>
        </View>
        <Switch 
          value={consent.essential}
          onValueChange={handleEssentialChange}
          disabled={true}
          trackColor={{ false: theme.colors.background.elevated, true: `${theme.colors.primary}80` }}
          thumbColor={consent.essential ? theme.colors.primary : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.optionRow}>
        <View style={styles.textContainer}>
          <Text style={styles.optionTitle}>Marketing & Analytics</Text>
          <Text style={styles.optionDescription}>
            Enables advanced features such as analytics, personalization and comparison features.
            These cookies help improve your experience and display more relevant content.
          </Text>
        </View>
        <Switch 
          value={consent.marketing}
          onValueChange={handleMarketingChange}
          trackColor={{ false: theme.colors.background.elevated, true: `${theme.colors.primary}80` }}
          thumbColor={consent.marketing ? theme.colors.primary : '#f4f3f4'}
        />
      </View>
      
      <Text style={styles.note}>
        Note: Changes to cookie settings will take effect immediately.
        The availability of certain features in the app is subject to these settings.
      </Text>
    </View>
  );
};

// Using a mix of shared styles and component-specific styles
const styles = StyleSheet.create({
  container: {
    ...system.card,
    backgroundColor: theme.colors.background.card,
  },
  title: {
    ...system.title,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...system.bodyText,
    marginBottom: theme.spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  optionTitle: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  optionDescription: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text.secondary,
  },
  note: {
    ...system.smallText,
    fontStyle: 'italic',
    marginTop: theme.spacing.md,
  }
});

export default ConsentSettings;