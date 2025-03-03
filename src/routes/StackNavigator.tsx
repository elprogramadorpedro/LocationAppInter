import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { ProductsScreen } from '../screens/Products/ProductsScreen';
import { SettingScreen } from '../screens/settings/SettingScreen';
import { ProductScreen } from '../screens/Products/ProductScreen';


//typado

export type RootStackParams ={
  Home : undefined,
  Product: {id:number, name:string},
  Products:undefined,
  Settings: undefined,
}

const Stack = createStackNavigator<RootStackParams>();





export const StackNavigator =()=> {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:true,
      headerStyle:{
        elevation:0,
        shadowColor:'transparent'
      }
    }}
    
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
    </Stack.Navigator>
  );
}