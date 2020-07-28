import { Navigation } from 'react-native-navigation';
import { SCREENS } from '../constants/screen';

export const tabbedNavigation = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREENS.Home,
              passProps: {
                text: 'This is Home',
              },
            },
          },
        ],
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: true,
          },
        },
      },
    },
  });

export default tabbedNavigation;
