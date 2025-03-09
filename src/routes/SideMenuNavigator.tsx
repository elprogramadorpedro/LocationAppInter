import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
 // import {StackNavigator} from './StackNavigator';
  import {ProfileScreen} from '../screens/profile/ProfileScreen';
  import {globalColors} from '../theme/theme';
  import {View, Text, useWindowDimensions} from 'react-native'; // Cambiado a react-native
import { BottonTapNavigator } from './BottonTapNavigator';
import { IonIcon } from '../components/shared/IonIcon';

  
  const Drawer = createDrawerNavigator();

  const dimensions = useWindowDimensions();
  
  export const SideMenuNavigator = () => {
    return (
      <Drawer.Navigator
      
        
        // personalizando aún más el drawer
        drawerContent={props => <CustomDrawerContent {...props} />}
        // me permite personalizar el drawer screenOptions
        screenOptions={{

          drawerType: (dimensions.width>=758) ? 'permanent':'slide',  
          headerShown: false,
          
  
          drawerActiveBackgroundColor: globalColors.primary, // fondo color del drawer
          drawerActiveTintColor: 'white', // tipografía color del drawer
  
          drawerItemStyle: {
            borderRadius: 100,
            paddingHorizontal: 20,
          },
        }}
        >
       {/* <Drawer.Screen name="StackNavigator" component={StackNavigator} />*/}
        <Drawer.Screen 
        options={{ drawerIcon: ({ color }) => (<IonIcon name='bonfire-outline' color={color} />) }}
        
         name="Stack" component={BottonTapNavigator} />
        <Drawer.Screen 
        name="Profile"
         component={ProfileScreen}/>
       


      </Drawer.Navigator>
    );
  };
  
  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView {...props}>
        <View
          style={{
            height: 200,
            backgroundColor: globalColors.primary,
            margin: 30,
            borderRadius: 50,
          }}></View>


          <DrawerItemList {...props}/> 

          <Text>Texto complementar</Text>
      </DrawerContentScrollView>
    );
  };