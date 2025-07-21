import { View, StyleSheet } from "react-native";
import { Map } from '../../components/maps/Map' // Adjust the import path as necessary  
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useEffect, useState } from "react";
import { DirectionPanel } from "../../components/direcctions/DirectionPanel";



export const MapsScreen = () => {

  const [showDirections, setShowDirections] = useState(true);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('car');


  const handleClose = () => setShowDirections(false);

const handleSwap = () => {
  setOrigin(destination);
  setDestination(origin);
};

const handleSubmit = (newOrigin: string, newDestination: string, newMode: string) => {
  setOrigin(newOrigin);
  setDestination(newDestination);
  setMode(newMode);
  // Aquí iría la lógica para buscar la ruta entre origen y destino
  // Por ejemplo, llamar a una API de direcciones
};

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
      <DirectionPanel
      
       onClose={handleClose}
  onSwap={handleSwap}
  onSubmit={handleSubmit}

          
      
      />
        <Map initialLocation={lastKnownLocation} showsUserLocation={true}/>   
         
     </View>

  )
}



const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
 
 },

});