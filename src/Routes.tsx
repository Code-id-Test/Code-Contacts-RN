import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactDetailsScreen, HomeScreen, NewContactScreen } from './screens';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={{
          title: 'Contact Details',
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          // headerRight
        }}
      />
      <Stack.Screen
        name="NewContact"
        component={NewContactScreen}
        options={{
          title: 'Create a Contact',
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          // headerRight
        }}
      />
    </Stack.Navigator>
  );
};
