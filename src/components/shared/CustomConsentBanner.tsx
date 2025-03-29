// src/components/shared/CustomConsentBanner.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../styles/theme';
import { useConsentBanner } from '../../hooks';

interface CustomConsentBannerProps {
  compact?: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
}

/**
 * A customizable consent banner that can be shown programmatically
 */
const CustomConsentBanner: React.FC<CustomConsentBannerProps> = ({
  compact = false,
  title = 'Cookie Preferences',
  description = 'This app collects data to improve your experience. Some features require your consent to work properly.',
  onClose
}) => {
  const { acceptAll, acceptEssentialOnly } = useConsentBanner();

  const handleAcceptAll = () => {
    acceptAll();
    onClose?.();
  };

  const handleEssentialOnly = () => {
    acceptEssentialOnly();
    onClose?.();
  };

  if (compact) {
    return (
      <View style={styles.compactBanner}>
        <View style={styles.iconContainer}>
          <Icon name="cookie" size={20} color={theme.colors.primary} />
        </View>
        
        <Text style={styles.customBannerDescription} numberOfLines={2}>
          {description}
        </Text>
        
        <View style={[styles.customButtonContainer, styles.compactButtonContainer]}>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton, { marginRight: theme.spacing.xs }]}
            onPress={handleEssentialOnly}
          >
            <Text style={styles.buttonTextSecondary}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleAcceptAll}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.customBanner}>
      {onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={20} color={theme.colors.text.secondary} />
        </TouchableOpacity>
      )}
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="cookie" size={24} color={theme.colors.primary} />
        </View>
        
        <View style={{ flex: 1 }}>
          <Text style={styles.customBannerTitle}>{title}</Text>
          <Text style={styles.customBannerDescription}>{description}</Text>
        </View>
      </View>
      
      <View style={styles.customButtonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton, { marginRight: theme.spacing.sm }]}
          onPress={handleEssentialOnly}
        >
          <Text style={styles.buttonTextSecondary}>Essential Only</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleAcceptAll}
        >
          <Text style={styles.buttonText}>Accept All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customBanner: {
    marginVertical: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    position: 'relative',
  },
  compactBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  customBannerTitle: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  customBannerDescription: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text.secondary,
  },
  customButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  compactButtonContainer: {
    marginTop: 0,
    marginLeft: theme.spacing.sm,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: theme.colors.background.elevated,
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontWeight: '500',
    fontSize: theme.typography.small.fontSize,
  },
  buttonTextSecondary: {
    color: theme.colors.text.secondary,
    fontWeight: '500',
    fontSize: theme.typography.small.fontSize,
  }
});

export default CustomConsentBanner;