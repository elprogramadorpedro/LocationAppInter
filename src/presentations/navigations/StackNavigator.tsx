import { LoadingScreen } from "../screens/loading/LoadingScreen";
import { MapsScreen } from "../screens/maps/MapsScreen";
import { PermissionScreen } from '../screens/permissions/PermissionScreen';
import { createStackNavigator } from '@react-navigation/stack';



//definimos interfaz para manejar parametros
export type RootStackParams = {
  LoadingScreen: undefined;
  PermissionsScreen: undefined;
  MapsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator 
    initialRouteName='LoadingScreen'
    
    screenOptions={{
        headerShown:true,
        cardStyle:{
            backgroundColor: 'green' // Cambia el color de fondo del stack
        }
    }}
    
    
    >  
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="MapsScreen" component={MapsScreen} />
      <Stack.Screen name="PermissionsScreen" component={PermissionScreen} />
    </Stack.Navigator>
  );
};