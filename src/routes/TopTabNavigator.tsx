import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { AboutScreen } from '../screens/about/AboutScreen';

const Tab = createMaterialTopTabNavigator();

export const TopTabNavigator =()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="about" component={AboutScreen} />
    </Tab.Navigator>
  );
}