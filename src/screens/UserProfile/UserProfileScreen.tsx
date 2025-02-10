// src/screens/UserProfile/UserProfileScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, Avatar } from '@rneui/themed';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { authConfig } from '../../config/auth.config';

type RootNavigationProp = StackNavigationProp<RootStackParamList>;

const UserProfileScreen = () => {
  const { user, signOut, deleteAccount } = useAuth();
  const navigation = useNavigation<RootNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await deleteAccount();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to delete account');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Avatar
        size={100}
        rounded
        icon={{ name: 'user', type: 'font-awesome' }}
        containerStyle={styles.avatar}
        source={user?.user_metadata?.avatar_url ? { uri: user.user_metadata.avatar_url } : undefined}
      />
      
      <Text h4 style={styles.title}>Profile</Text>
      <Text style={styles.email}>{user?.email}</Text>

      {user?.app_metadata?.provider && (
        <Text style={styles.providerText}>
          Signed in with {user.app_metadata.provider}
        </Text>
      )}
      
      <View style={styles.buttonContainer}>
        <Button
          title="Sign Out"
          onPress={handleSignOut}
          loading={isLoading}
          buttonStyle={styles.signOutButton}
          containerStyle={styles.buttonWrapper}
        />
        
        {authConfig.features.deleteAccount && (
          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            loading={isLoading}
            buttonStyle={styles.deleteButton}
            containerStyle={styles.buttonWrapper}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a202c',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#2d3748',
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    marginBottom: 10,
  },
  email: {
    color: '#a0aec0',
    fontSize: 16,
    marginBottom: 5,
  },
  providerText: {
    color: '#718096',
    fontSize: 14,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  buttonWrapper: {
    borderRadius: 8,
  },
  signOutButton: {
    backgroundColor: '#2d3748',
    padding: 15,
  },
  deleteButton: {
    backgroundColor: '#e53e3e',
    padding: 15,
  },
});

export default UserProfileScreen;