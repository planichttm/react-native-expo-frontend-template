// src/styles/hoc.styles.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from './theme';

interface HOCStyles {
  container: ViewStyle;
  icon: TextStyle;
  title: TextStyle;
  featureName: TextStyle;
  message: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

export const hocStyles = StyleSheet.create<HOCStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.main,
  },
  icon: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.primary,
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  featureName: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
    maxWidth: 300,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontWeight: '600',
    fontSize: theme.typography.body.fontSize,
  },
});