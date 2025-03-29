// src/screens/UserProfile/UserProfileScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, Divider } from '@rneui/themed';
import { profileStyles } from '../../styles/screens/profile.styles';
import { system } from '../../styles/system';
import { theme } from '../../styles/theme';
import ConsentSettings from '../../components/shared/ConsentSettings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { authConfig, isFeatureEnabled } from '../../config/auth.config';
import { useAuthHelpers, useUIHelpers } from '../../hooks';

const UserProfileScreen = () => {
  const { user, getDisplayName, handleSignOut, handleSignIn } = useAuthHelpers();
  const { showConfirm, withLoading } = useUIHelpers();
  const [isLoading, setIsLoading] = useState(false);

  // Handle sign out with confirmation
  const confirmSignOut = () => {
    showConfirm(
      'Sign Out',
      'Are you sure you want to sign out?',
      async () => {
        setIsLoading(true);
        await handleSignOut();
        setIsLoading(false);
      }
    );
  };

  // Handle account deletion with confirmation
  const confirmDeleteAccount = () => {
    showConfirm(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      async () => {
        setIsLoading(true);
        try {
          await handleSignOut(); // For now we just sign out
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to delete account:', error);
          setIsLoading(false);
        }
      },
      undefined,
      'Delete',
      'Cancel'
    );
  };

  // Handle sign in with loading state
  const onSignIn = async () => {
    await withLoading(async () => {
      await handleSignIn();
    });
  };

  return (
    <ScrollView style={system.container}>
      {/* Header section - Adapts based on authentication state */}
      <View style={profileStyles.header}>
        <Text style={profileStyles.title}>User Profile</Text>
        {user ? (
          // Logged-in user info
          <Text style={profileStyles.email}>{getDisplayName()}</Text>
        ) : (
          // Not logged-in message
          <Text style={profileStyles.email}>
            You are currently not signed in
          </Text>
        )}
      </View>
      
      {/* Consent Settings Section - Always visible */}
      <View style={system.contentContainer}>
        <Text style={profileStyles.sectionTitle}>
          Privacy settings
        </Text>
        <ConsentSettings />
      </View>
      
      <Divider style={profileStyles.divider} />
      
      {/* Account Actions Section - Changes based on auth state */}
      <View style={system.contentContainer}>
        <Text style={profileStyles.sectionTitle}>
          Account Actions
        </Text>
        
        <View style={profileStyles.buttonContainer}>
          {user ? (
            // Logged-in actions
            <>
              <Button
                title="Sign Out"
                onPress={confirmSignOut}
                buttonStyle={profileStyles.signOutButton}
                containerStyle={profileStyles.buttonWrapper}
                loading={isLoading}
                disabled={isLoading}
              />
              
              {isFeatureEnabled('deleteAccount') && (
                <Button
                  title="Delete Account"
                  onPress={confirmDeleteAccount}
                  buttonStyle={profileStyles.deleteButton}
                  containerStyle={profileStyles.buttonWrapper}
                  loading={isLoading}
                  disabled={isLoading}
                />
              )}
            </>
          ) : (
            // Not logged-in action - Sign In button
            <Button
              title="Sign In with Google"
              onPress={onSignIn}
              buttonStyle={profileStyles.signInButton}
              containerStyle={profileStyles.buttonWrapper}
              icon={<Icon name="google" color="white" size={20} style={{ marginRight: theme.spacing.sm }} />}
              loading={isLoading}
              disabled={isLoading}
            />
          )}
        </View>
      </View>
      
      <Divider style={profileStyles.divider} />
      
      {/* Legal Information Section - Always visible */}
      <View style={[system.contentContainer, { paddingBottom: theme.spacing.xl }]}>
        <Text style={profileStyles.sectionTitle}>
          Legal Information
        </Text>
        
        <View style={profileStyles.legalButtonsContainer}>
          <Button
            title="Impressum"
            onPress={() => {}}
            buttonStyle={profileStyles.legalButton}
            containerStyle={profileStyles.legalButtonWrapper}
          />
          
          <Button
            title="Privacy Policy"
            onPress={() => {}}
            buttonStyle={profileStyles.legalButton}
            containerStyle={profileStyles.legalButtonWrapper}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;