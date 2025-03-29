// src/utils/consentUtils.ts
import { MainTabParamList } from '../../App';
import { TABS_CONFIG } from '../config/tabsConfig';
import withConsentCheck from '../hoc/withConsentCheck';
import withAuthCheck from '../hoc/withAuthCheck';

/**
 * Wraps components with consent check and/or auth check based on configuration
 * 
 * @param screens Record mapping tab names to screen components
 * @param titles Record mapping tab names to display titles
 * @returns A new record with wrapped components where necessary
 */
export function wrapScreensWithConsentCheck<T extends Record<keyof MainTabParamList, React.ComponentType<any>>>(
  screens: T,
  titles: Record<keyof MainTabParamList, string>
): T {
  const wrappedScreens = { ...screens };
  
  // Go through each screen
  Object.entries(TABS_CONFIG).forEach(([tabName, config]) => {
    const name = tabName as keyof MainTabParamList;
    let WrappedComponent = screens[name];
    
    // If the tab requires marketing consent, wrap it with consent check
    if (config.requiresMarketingConsent && !config.alwaysVisible) {
      WrappedComponent = withConsentCheck(
        WrappedComponent,
        titles[name],
        'marketing'
      );
    }
    
    // If the tab requires authentication, wrap it with auth check
    if (config.requiresSignedIn) {
      WrappedComponent = withAuthCheck(
        WrappedComponent,
        titles[name]
      );
    }
    
    wrappedScreens[name] = WrappedComponent;
  });
  
  return wrappedScreens;
}