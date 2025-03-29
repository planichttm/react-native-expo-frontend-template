// src/types/navigation.types.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, AuthStackParamList, MainTabParamList } from '../../App';

// Type for navigation props for components within the Root stack
export type RootStackNavigationProp<T extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, T>;

// Type for navigation props for components within the Auth stack
export type AuthStackNavigationProp<T extends keyof AuthStackParamList> = 
  CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, T>,
    StackNavigationProp<RootStackParamList>
  >;

// Type for navigation props for components within the Main tab navigator
export type MainTabNavigationProp<T extends keyof MainTabParamList> = 
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, T>,
    StackNavigationProp<RootStackParamList>
  >;

// Type for route props for components within the Root stack
export type RootStackRouteProp<T extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, T>;

// Type for route props for components within the Auth stack
export type AuthStackRouteProp<T extends keyof AuthStackParamList> = 
  RouteProp<AuthStackParamList, T>;

// Type for route props for components within the Main tab navigator
export type MainTabRouteProp<T extends keyof MainTabParamList> = 
  RouteProp<MainTabParamList, T>;

// Helper type for navigation without hard-coding the screen name
export type AppNavigate = <RouteName extends keyof RootStackParamList>(
  ...args: 
    undefined extends RootStackParamList[RouteName] 
      ? [screen: RouteName] | [screen: RouteName, params: RootStackParamList[RouteName]] 
      : [screen: RouteName, params: RootStackParamList[RouteName]]
) => void;