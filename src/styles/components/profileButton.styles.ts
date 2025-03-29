// src/styles/components/profileButton.styles.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface ProfileButtonStyles {
  container: ViewStyle;
  compactContainer: ViewStyle;
  text: TextStyle;
}

export const profileButtonStyles = StyleSheet.create<ProfileButtonStyles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.md,
    marginRight: 8,
  },
  compactContainer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  text: {
    color: '#ffffff', 
    marginLeft: 6, 
    fontSize: 14, 
    fontWeight: '500'
  }
});