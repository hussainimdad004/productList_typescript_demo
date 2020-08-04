import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import store from '../../shared/redux/store';
import { registerScreens } from '../view/screens';
import { tabbedNavigation } from './navigation';

/**
 * Register screens and components for react native navigation
 */
registerScreens({ store, Provider });

const app = () => {
  console.disableYellowBox = true;
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: { visible: true },
    });
    tabbedNavigation();
  });
};

export default app;
