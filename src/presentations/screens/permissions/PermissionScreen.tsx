import React from 'react'
import { View, Text, Pressable } from "react-native";
import { globalStyles } from '../../../config/theme/styles';
import { usePermissionStore } from '../../store/permission/usePerrmissionStore';


export const PermissionScreen = () => {

 const {locationStatus, requestLocationPermission} = usePermissionStore();


  return (
    

        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Habilitar ubicacion</Text>


        <Pressable
         style={globalStyles.btnPrimary}
         onPress={requestLocationPermission}
         >
          <Text style={{color:'white'}}>Habilitar ubicacion</Text>
          </Pressable>
        

        <Text>Estado Actual: {locationStatus} </Text>
       </View>

  )
}
