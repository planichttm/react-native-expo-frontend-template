// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import UserProfileScreen from './src/screens/UserProfile/UserProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;  // Add this back
};

export type MainTabParamList = {
  Home: undefined;
  UserProfile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('UserProfile')}
          style={{ marginRight: 15 }}
        >
          <Icon name="account" size={24} color="#ffffff" />
        </TouchableOpacity>
      ),
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else {
          iconName = 'help-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#38bdf8',
      tabBarInactiveTintColor: '#718096',
      tabBarStyle: {
        backgroundColor: '#1a202c',
        borderTopColor: '#2d3748',
        borderTopWidth: 1,
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      headerStyle: {
        backgroundColor: '#1a202c',
        borderBottomWidth: 1,
        borderBottomColor: '#2d3748',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        color: '#ffffff',
        fontSize: 18,
      },
      headerTintColor: '#ffffff',
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        title: 'Dashboard',
      }}
    />
    <Tab.Screen 
      name="UserProfile" 
      component={UserProfileScreen}
      options={{
        title: 'Profile',
        tabBarButton: () => null, // Hide from tab bar
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="MainApp" component={MainNavigator} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}