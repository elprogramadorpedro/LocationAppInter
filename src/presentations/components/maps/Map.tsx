import { Platform } from 'react-native'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { Location } from '../../../infrastructure/interfaces/locations';
import { FAB } from '../ui/FAB';


interface Props{
    showsUserLocation: boolean;
    initialLocation:Location;
}

export const Map = ({showsUserLocation=true, initialLocation}:Props) => {
  return (
    <>
       <MapView
           provider={ Platform.OS === 'ios' ? undefined: PROVIDER_GOOGLE} // remove if not using Google Maps
           style={styles.map}
           showsUserLocation={showsUserLocation}
           region={{
             latitude: initialLocation.latitude,
             longitude: initialLocation.longitude,
             latitudeDelta: 0.015,
             longitudeDelta: 0.0121,
           }}
         >
            
    <Marker
   coordinate={{
             latitude: 10.48801,
             longitude: -66.87919

            
           }}

              title="Marker Title"
              description='Marker Description' 
    />


         </MapView>


<FAB

iconName='compass-outline'
onPress={() => console.log('FAB Pressed')}
style={{
  bottom: 20,
  right: 20,  
}}

/>
  




    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
