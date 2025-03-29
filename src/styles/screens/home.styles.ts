// src/styles/screens/home.styles.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface HomeStyles {
  container: ViewStyle;
  content: ViewStyle;
  welcomeTitle: TextStyle;
  welcomeDescription: TextStyle;
  mainCard: ViewStyle;
  mainCardTitle: TextStyle;
  mainCardDescription: TextStyle;
  cardRow: ViewStyle;
  card: ViewStyle;
  iconContainer: ViewStyle;
  cardTitle: TextStyle;
  cardDescription: TextStyle;
  cardButton: ViewStyle;
  buttonText: TextStyle;
}

export const homeStyles = StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  welcomeTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  welcomeDescription: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontSize: theme.typography.body.fontSize,
  },
  mainCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
    width: '100%',
    borderWidth: 0,
    padding: theme.spacing.lg,
    ...theme.shadow.md,
  },
  mainCardTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  mainCardDescription: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 24,
    fontSize: theme.typography.body.fontSize,
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    flex: 1,
    margin: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.card,
    borderWidth: 0,
    minWidth: '30%',
    padding: theme.spacing.md,
    ...theme.shadow.sm,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.small.fontSize,
    textAlign: 'center',
  },
  cardButton: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontWeight: '600',
    fontSize: theme.typography.caption.fontSize,
  },
});