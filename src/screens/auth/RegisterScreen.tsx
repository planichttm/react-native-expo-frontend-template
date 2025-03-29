// src/screens/auth/RegisterScreen.tsx
import { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../App';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { authStyles } from '../../styles/screens/auth.styles';
import { authConfig } from '../../config/auth.config';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password);
      alert('Check your email for verification link');
      navigation.navigate('Login');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[
      authStyles.container,
      { backgroundColor: authConfig.ui.darkMode ? '#1a202c' : '#ffffff' }
    ]}>
      <Text h3 style={[
        authStyles.title,
        { color: authConfig.ui.darkMode ? '#ffffff' : '#000000' }
      ]}>Register</Text>
      
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        disabled={isLoading}
        containerStyle={authStyles.inputContainer}
      />
      
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        disabled={isLoading}
        containerStyle={authStyles.inputContainer}
      />
      
      <Button
        title="Register"
        onPress={handleRegister}
        loading={isLoading}
        containerStyle={authStyles.buttonContainer}
        buttonStyle={{ backgroundColor: authConfig.ui.primaryColor }}
      />
      
      <Button
        title="Back to Login"
        type="clear"
        onPress={() => navigation.goBack()}
        disabled={isLoading}
        titleStyle={{ color: authConfig.ui.primaryColor }}
        containerStyle={authStyles.buttonContainer}
      />
    </View>
  );
};

export default RegisterScreen;