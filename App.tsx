// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, Platform, View } from 'react-native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Providers
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ConsentProvider, useConsent } from './src/context/ConsentContext';

// Config and Utils
import { isTabVisible } from './src/config/tabsConfig';
import { wrapScreensWithConsentCheck } from './src/utils/consentUtils';
import { navigationRef } from './src/services/navigationService';

// Components
import { ProfileButton } from './src/components/shared/ProfileButton';

// Screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import UserProfileScreen from './src/screens/UserProfile/UserProfileScreen';

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  UserProfile: undefined;
  // Add more tabs here as needed
};

// Theme configuration
const theme = createTheme({
  mode: 'dark',
  lightColors: {
    primary: '#38bdf8',
  },
  darkColors: {
    primary: '#38bdf8',
    background: '#1a202c',
  },
});

// Define tab icon mapping
const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  Home: 'home',
  UserProfile: 'account',
};

// Define tab display names
const TAB_TITLES: Record<keyof MainTabParamList, string> = {
  Home: 'Home',
  UserProfile: 'Profile',
};

// Define base tab screen components mapping
const BASE_TAB_SCREENS: Record<keyof MainTabParamList, React.ComponentType<any>> = {
  Home: HomeScreen,
  UserProfile: UserProfileScreen,
};

// Wrap screens with consent check based on configuration
const TAB_SCREENS = wrapScreensWithConsentCheck(BASE_TAB_SCREENS, TAB_TITLES);

// Create Navigation Stacks
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Auth Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

// Header Right Component combining profile button
const HeaderRight = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ProfileButton compact={false} />
    </View>
  );
};

// Main App Navigator with Tabs
const MainNavigator = () => {
  const { consent } = useConsent();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#718096',
        tabBarStyle: {
          backgroundColor: '#1a202c',
          borderTopColor: '#2d3748',
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          paddingTop: 5,
          height: Platform.OS === 'ios' ? 90 : 60,
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
        headerRight: () => <HeaderRight navigation={navigation} />,
        tabBarIcon: ({ color, size }) => {
          const iconName = TAB_ICONS[route.name] || 'help-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Always include all main tabs */}
      <Tab.Screen
        name="Home"
        component={TAB_SCREENS.Home}
        options={{ title: TAB_TITLES.Home }}
      />
      
      <Tab.Screen
        name="UserProfile"
        component={TAB_SCREENS.UserProfile}
        options={{ 
          tabBarButton: () => null, 
          title: TAB_TITLES.UserProfile 
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainApp">
      <Stack.Screen 
        name="Auth" 
        component={AuthNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MainApp" 
        component={MainNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={UserProfileScreen} 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1a202c',
          },
          headerTintColor: '#ffffff'
        }} 
      />
    </Stack.Navigator>
  );
};

// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="#1a202c" />
        <AuthProvider>
          <ConsentProvider>
            <NavigationContainer ref={navigationRef}>
              <RootNavigator />
            </NavigationContainer>
          </ConsentProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}