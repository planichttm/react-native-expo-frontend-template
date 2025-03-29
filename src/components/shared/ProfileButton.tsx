// src/components/shared/ProfileButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../styles/theme';
import { system } from '../../styles/system';
import { useAuthHelpers } from '../../hooks';

interface ProfileButtonProps {
  compact?: boolean;
}

/**
 * A reusable profile button that navigates to the user profile screen
 */
export const ProfileButton: React.FC<ProfileButtonProps> = ({ 
  compact = false 
}) => {
  const { navigateToProfile, isAuthenticated } = useAuthHelpers();
  
  return (
    <TouchableOpacity
      onPress={navigateToProfile}
      style={[
        styles.container,
        compact && styles.compactContainer
      ]}
    >
      <Icon 
        name="account-circle" 
        size={compact ? 18 : 22} 
        color={isAuthenticated ? theme.colors.primary : theme.colors.text.primary} 
      />
      
      {!compact && (
        <Text style={styles.text}>
          Profile
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  compactContainer: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  text: {
    ...system.buttonText,
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.caption.fontSize,
  }
});

export default ProfileButton;