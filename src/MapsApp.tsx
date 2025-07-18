import 'react-native-gesture-handler';

//import enableLatestRenderer from 'react-native-maps';
//enableLatestRenderer(); 


import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {StackNavigator} from './presentations/navigations/StackNavigator';
import {PermissionsChecker} from './presentations/providers/PermissionsChecker';

export const MapsApp = () => {
  return (
    <NavigationContainer>
      <PermissionsChecker>
        <StackNavigator />
      </PermissionsChecker>
    </NavigationContainer>
  );
};
