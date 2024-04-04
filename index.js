import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Routes from './src/Routes';
import { name as appName } from './app.json';
import store from './store';

const ReduxApp = () => (
  <NavigationContainer>
    <Provider store={store}>
      <Routes />
    </Provider>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
