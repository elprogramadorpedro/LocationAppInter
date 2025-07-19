import { View, StyleSheet } from "react-native";
import { Map } from '../../components/maps/Map' // Adjust the import path as necessary  
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useEffect } from "react";



export const MapsScreen = () => {

  const {lastKnownLocation, getLocation}= useLocationStore();

  useEffect(()=>{
    if(lastKnownLocation===null)
       getLocation();
  },[])

  if(lastKnownLocation===null){
    return (<LoadingScreen/>)

  }

  return (
   
    <View style={styles.container}>
        <Map initialLocation={lastKnownLocation} showsUserLocation={true}/>   
         
     </View>

  )
}



const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
 
 },

});