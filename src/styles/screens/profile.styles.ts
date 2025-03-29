// src/styles/screens/profile.styles.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface ProfileStyles {
  // Containers
  container: ViewStyle;
  contentContainer: ViewStyle;
  
  // Header
  header: ViewStyle;
  avatar: ViewStyle;
  userInfo: ViewStyle;
  
  // Text
  title: TextStyle;
  email: TextStyle;
  providerText: TextStyle;
  sectionTitle: TextStyle;
  divider: ViewStyle;
  
  // Sections
  section: ViewStyle;
  
  // Buttons
  buttonContainer: ViewStyle;
  buttonWrapper: ViewStyle;
  signInButton: ViewStyle;
  signOutButton: ViewStyle;
  deleteButton: ViewStyle;
  
  // Legal buttons
  legalButtonsContainer: ViewStyle;
  legalButtonWrapper: ViewStyle;
  legalButton: ViewStyle;
  
  // Error
  errorText: TextStyle;
}

export const profileStyles = StyleSheet.create<ProfileStyles>({
  // Containers
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.main,
  },
  contentContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    backgroundColor: theme.colors.background.card,
    marginBottom: theme.spacing.md,
  },
  userInfo: {
    alignItems: 'center',
  },
  
  // Text
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  providerText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text.muted,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.lg,
  },
  
  // Sections
  section: {
    marginBottom: theme.spacing.lg,
  },
  
  // Buttons
  buttonContainer: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  buttonWrapper: {
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
  },
  signOutButton: {
    backgroundColor: theme.colors.background.elevated,
    paddingVertical: theme.spacing.md,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
    paddingVertical: theme.spacing.md,
  },
  
  // Legal buttons
  legalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  legalButtonWrapper: {
    borderRadius: theme.borderRadius.md,
    width: '48%', // Almost half width to fit side by side with a small gap
  },
  legalButton: {
    backgroundColor: theme.colors.background.elevated,
    paddingVertical: theme.spacing.md,
  },
  
  // Error
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    textAlign: 'center',
    marginVertical: theme.spacing.md,
  },
});