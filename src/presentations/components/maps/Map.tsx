import {Platform} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import {Location} from '../../../infrastructure/interfaces/locations';
import {FAB} from '../ui/FAB';
import {useEffect, useRef} from 'react';
import {useLocationStore} from '../../store/location/useLocationStore';

interface Props {
  showsUserLocation: boolean;
  initialLocation: Location;
}

export const Map = ({showsUserLocation = true, initialLocation}: Props) => {
  const mapRef = useRef<MapView>(null);
  const cameraLocation = useRef<Location>(initialLocation);

  const {getLocation, lastKnownLocation, watchLocation, clearWachLocation} = useLocationStore();

  const moveCameraToLocation = (location: Location) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({center: location});
  };

  const moveToCurrentLocation = async () => {
    if(!lastKnownLocation){
      moveCameraToLocation(initialLocation);
    }

    const location = await getLocation();
    if (!location) return;
    moveCameraToLocation(location);
  };


  useEffect(()=>{
 watchLocation();
    return()=>{
        clearWachLocation();
    }
  },[])

  useEffect(()=>{
    if(lastKnownLocation){
      moveCameraToLocation(lastKnownLocation)
    }
 
  },[lastKnownLocation])






  return (
    <>
      <MapView
        ref={map => {
          mapRef.current = map!;
        }}
        showsUserLocation={showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>

          
        <Marker
          coordinate={{
            latitude: 10.48801,
            longitude: -66.87919,
          }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>

      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
