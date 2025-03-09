import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabOneScreen } from '../screens/tabs/TabOneScreen';
//import { TabTwoScreen } from '../screens/tabs/TabTwoScreen';
//import { TabThreeScreen } from '../screens/tabs/TabThreeScreen';
//import { TabForScreen } from '../screens/tabs/TabForScreen';
//import { TabFiveScreen } from '../screens/tabs/TabFiveScreen';
import { globalColors } from '../theme/theme';
import { ImageBackgroundBase, Text } from 'react-native';
import { TopTabNavigator } from './TopTabNavigator';
import { StackNavigator } from './StackNavigator';
import { IonIcon } from '../components/shared/IonIcon';

const Tab = createBottomTabNavigator();


export const BottonTapNavigator = () => {

    return (
        <Tab.Navigator


       
       
        screenOptions={{
            tabBarLabelStyle:{
                backgroundColor:globalColors.background,
                marginBottom:5,
            },
            headerStyle:{
                elevation:0,
                borderColor: 'transparent',
                shadowColor: 'transparent'
            },
            tabBarStyle:{
                borderTopWidth:0,
                elevation:0
            }
        }}

        
        
        >
          <Tab.Screen name="Tap1" options={{title:'Tab1', tabBarIcon:({ color })=> (<Text style={{color}}>Tab1</Text>)}} component={TabOneScreen} />
          <Tab.Screen name="Tap2" options={{title:'Tab2', tabBarIcon:({ color })=> (<Text style={{color}}>Tab2</Text>)}} component={TopTabNavigator} />
          <Tab.Screen name="Tap3" options={{title:'Tab3', tabBarIcon:({ color })=> (<Text style={{color}}>Tab3</Text>)}} component={StackNavigator} />
          <Tab.Screen name="Tap4" options={{title:'Libro', tabBarIcon:({ color })=> (<IonIcon name='book-outline' color={color} />)}} component={TopTabNavigator} />
       
        </Tab.Navigator>
      );
}
