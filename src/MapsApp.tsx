
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StackNavigator } from './presentations/navigations/StackNavigator';


export const MapsApp = () => {
  return (
<NavigationContainer>
<StackNavigator/>
</NavigationContainer>
  )
}
