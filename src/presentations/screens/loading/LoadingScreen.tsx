import React from 'react'
   import { View, Text, ActivityIndicator } from "react-native";

export const LoadingScreen = () => {
  return (
   <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <ActivityIndicator size={30} color="black" />
    <Text style={{marginTop: 20}}>Cargando...</Text>
    <Text>LoadingScreen</Text>
   </View>
  )
}
