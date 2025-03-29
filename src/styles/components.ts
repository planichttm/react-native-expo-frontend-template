// src/styles/components.ts
import { StyleSheet } from 'react-native';
import { theme } from './theme';

/**
 * Shared component styles that can be used across multiple specific components
 */
export const components = StyleSheet.create({
  // Card styles
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderWidth: 0,
    ...theme.shadow.sm,
  },
  cardTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  cardDescription: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  
  // Form controls
  formControl: {
    marginBottom: theme.spacing.md,
  },
  formLabel: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    fontSize: theme.typography.caption.fontSize,
  },
  formInput: {
    backgroundColor: theme.colors.background.input,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    color: theme.colors.text.primary,
  },
  
  // Button styles
  button: {
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontWeight: '600',
    fontSize: theme.typography.body.fontSize,
  },
  buttonIcon: {
    marginRight: theme.spacing.sm,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.background.elevated,
  },
  buttonDanger: {
    backgroundColor: theme.colors.danger,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonOutlineText: {
    color: theme.colors.primary,
  },
  buttonContainer: {
    marginVertical: theme.spacing.sm,
  },
  
  // List styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  listItemText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.body.fontSize,
  },
  listItemDescription: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.small.fontSize,
  },
  
  // Header styles
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.elevated,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
  },
  
  // Banner styles (e.g., for notifications, alerts)
  banner: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerInfo: {
    backgroundColor: theme.colors.primary + '20', // Adding transparency
  },
  bannerWarning: {
    backgroundColor: theme.colors.warning + '20',
  },
  bannerError: {
    backgroundColor: theme.colors.danger + '20',
  },
  bannerSuccess: {
    backgroundColor: theme.colors.success + '20',
  },
  bannerText: {
    flex: 1,
    color: theme.colors.text.primary,
    fontSize: theme.typography.body.fontSize,
  },
  
  // Icon container
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.elevated,
    marginRight: theme.spacing.sm,
  },
});