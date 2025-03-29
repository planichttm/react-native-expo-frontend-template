// src/styles/screens/auth.styles.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface AuthStyles {
  container: ViewStyle;
  title: TextStyle;
  inputContainer: ViewStyle;
  buttonContainer: ViewStyle;
  alternativeContainer: ViewStyle;
  socialButton: ViewStyle;
  googleButton: ViewStyle;
  googleIcon: TextStyle;
  linkText: TextStyle;
  dividerContainer: ViewStyle;
  divider: ViewStyle;
  dividerText: TextStyle;
  errorText: TextStyle;
}

export const authStyles = StyleSheet.create<AuthStyles>({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    backgroundColor: theme.colors.background.main,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  buttonContainer: {
    marginVertical: theme.spacing.md,
  },
  alternativeContainer: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  googleIcon: {
    marginRight: theme.spacing.sm,
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  dividerText: {
    color: theme.colors.text.secondary,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.small.fontSize,
  },
  errorText: {
    color: theme.colors.danger,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
});