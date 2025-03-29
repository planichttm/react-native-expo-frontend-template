// src/styles/components/consent.styles.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface ConsentStyles {
  container: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  optionRow: ViewStyle;
  textContainer: ViewStyle;
  optionTitle: TextStyle;
  optionDescription: TextStyle;
  note: TextStyle;
  
  // Banner styles
  banner: ViewStyle;
  bannerText: TextStyle;
  buttonContainer: ViewStyle;
  acceptButton: ViewStyle;
  declineButton: ViewStyle;
  buttonText: TextStyle;
  
  // Custom banner styles
  customBanner: ViewStyle;
  compactBanner: ViewStyle;
  iconContainer: ViewStyle;
  closeButton: ViewStyle;
  content: ViewStyle;
  customBannerTitle: TextStyle;
  customBannerDescription: TextStyle;
  customButtonContainer: ViewStyle;
  compactButtonContainer: ViewStyle;
}

export const consentStyles = StyleSheet.create<ConsentStyles>({
  container: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  optionTitle: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  optionDescription: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text.secondary,
  },
  note: {
    fontSize: theme.typography.small.fontSize,
    fontStyle: 'italic',
    color: theme.colors.text.muted,
    marginTop: theme.spacing.sm,
  },
  
  // Banner styles
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.main,
    padding: theme.spacing.md,
    zIndex: 1000,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.card
  },
  bannerText: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  acceptButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginHorizontal: theme.spacing.sm
  },
  declineButton: {
    backgroundColor: theme.colors.background.card,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginHorizontal: theme.spacing.sm
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontWeight: '500'
  },
  
  // Custom banner styles
  customBanner: {
    marginVertical: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    position: 'relative',
  },
  compactBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  customBannerTitle: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  customBannerDescription: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.text.secondary,
  },
  customButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  compactButtonContainer: {
    marginTop: 0,
    marginLeft: theme.spacing.sm,
  },
});