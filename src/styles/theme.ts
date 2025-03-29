// src/styles/theme.ts
import { TextStyle } from 'react-native';

// FontWeight type to match React Native's TextStyle
type FontWeight = TextStyle['fontWeight'];

export const theme = {
  colors: {
    primary: '#38bdf8',
    secondary: '#10b981',
    tertiary: '#8b5cf6',
    danger: '#f56565',
    warning: '#f59e0b',
    success: '#48bb78',
    background: {
      main: '#1a202c',
      card: '#2d3748',
      elevated: '#4a5568',
      input: '#2d3748'
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0aec0',
      muted: '#718096',
      error: '#f56565',
      link: '#38bdf8'
    },
    border: '#2d3748',
    divider: '#4a5568',
    chart: {
      blue: '#38bdf8',
      green: '#10b981',
      purple: '#8b5cf6',
      orange: '#f59e0b',
      red: '#f56565',
      pink: '#f472b6',
      cyan: '#06b6d4',
      yellow: '#fbbf24'
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold' as FontWeight,
      lineHeight: 36
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as FontWeight,
      lineHeight: 32
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold' as FontWeight,
      lineHeight: 28
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as FontWeight,
      lineHeight: 26
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as FontWeight,
      lineHeight: 24
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as FontWeight,
      lineHeight: 20
    },
    small: {
      fontSize: 12,
      fontWeight: 'normal' as FontWeight,
      lineHeight: 18
    }
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8
    }
  }
};

// Type definitions for better TypeScript support
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;
export type ThemeBorderRadius = typeof theme.borderRadius;
export type ThemeTypography = typeof theme.typography;
export type ThemeShadow = typeof theme.shadow;

// Theme typing
export type Theme = typeof theme;