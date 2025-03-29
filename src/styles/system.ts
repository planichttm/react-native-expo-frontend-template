// src/styles/system.ts
import { StyleSheet } from 'react-native';
import { theme } from './theme';

/**
 * System-wide reusable styles that can be used across the app
 */
export const system = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Cards and Sections
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  cardTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  cardContent: {
    marginBottom: theme.spacing.md,
  },
  
  // Text styles
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  bodyText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  smallText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text.muted,
  },
  errorText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
  link: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
  },

  // Form elements
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.background.input,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    color: theme.colors.text.primary,
  },
  label: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  
  // Buttons
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: theme.colors.background.elevated,
  },
  buttonDanger: {
    backgroundColor: theme.colors.danger,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  
  // Dividers and spacing
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.md,
  },
  spacer: {
    height: theme.spacing.md,
  },
  
  // Icons
  icon: {
    marginRight: theme.spacing.sm,
  },
  
  // Shadows
  shadow: {
    ...theme.shadow.md,
  },
});