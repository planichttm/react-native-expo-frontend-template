// src/screens/auth/LoginScreen.tsx
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../../../App';
import { useAuth } from '../../context/AuthContext';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { authConfig, isProviderEnabled, isFeatureEnabled } from '../../config/auth.config';
import { supabase } from '../../services/supabase';

type LoginScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'Login'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signIn, signInWithGoogle } = useAuth();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      console.log('Session token:', session?.access_token);
      
      if (event === 'SIGNED_IN' && session) {
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigation]);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: authConfig.ui.darkMode ? '#1a202c' : '#ffffff' }
    ]}>
      <Text h3 style={[
        styles.title,
        { color: authConfig.ui.darkMode ? '#ffffff' : '#000000' }
      ]}>Login</Text>

      {isProviderEnabled('email') && (
        <>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            disabled={isLoading}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            disabled={isLoading}
          />
          <Button
            title="Login"
            onPress={handleEmailLogin}
            loading={isLoading}
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: authConfig.ui.primaryColor }}
          />
          {isFeatureEnabled('registration') && (
            <Button
              title="Register"
              type="clear"
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
              titleStyle={{ color: authConfig.ui.primaryColor }}
            />
          )}
        </>
      )}

      {isProviderEnabled('google') && (
        <Button
          title="Continue with Google"
          onPress={handleGoogleLogin}
          disabled={isLoading}
          icon={
            <Icon
              name="google"
              size={20}
              color="white"
              style={styles.googleIcon}
            />
          }
          buttonStyle={styles.googleButton}
          containerStyle={styles.buttonContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 15,
  },
  googleIcon: {
    marginRight: 10,
  }
});

export default LoginScreen;