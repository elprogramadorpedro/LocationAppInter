import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '../../../infrastructure/interfaces/locations';
import { FAB } from '../ui/FAB';
import { useLocationStore } from '../../store/location/useLocationStore';

interface Props {
  showsUserLocation: boolean;
  initialLocation: Location;
  routeCoords?: { latitude: number; longitude: number }[];
  isRouteStarted?: boolean;
  onExitRoute?: () => void;
}

export const Map = forwardRef<{ animateCamera: (params: any) => void }, Props>(
  ({ showsUserLocation = true, initialLocation, routeCoords = [], isRouteStarted, onExitRoute }, ref) => {
    const mapRef = useRef<MapView>(null);
    const cameraLocation = useRef<Location>(initialLocation);
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);
    const [simIndex, setSimIndex] = useState(0);

    const {
      getLocation,
      lastKnownLocation,
      watchLocation,
      clearWachLocation,
      userLocationsList,
    } = useLocationStore();

    useImperativeHandle(ref, () => ({
      animateCamera: (params: any) => {
        if (mapRef.current) {
          mapRef.current.animateCamera(params);
        }
      },
    }));

    const moveCameraToLocation = (location: Location) => {
      if (!mapRef.current) return;
      mapRef.current.animateCamera({ center: location });
    };

    // Simulación de avance automático sobre la ruta (modo "carro")
    useEffect(() => {
      if (!isRouteStarted || routeCoords.length === 0 || !isFollowingUser) return;

      setSimIndex(0);
      const interval = setInterval(() => {
        setSimIndex(prev => {
          if (prev < routeCoords.length - 1) {
            moveCameraToLocation(routeCoords[prev + 1]);
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [isRouteStarted, routeCoords, isFollowingUser]);

    useEffect(() => {
      watchLocation();
      return () => {
        clearWachLocation();
      };
    }, []);

    useEffect(() => {
      if (lastKnownLocation && isFollowingUser && routeCoords.length === 0) {
        moveCameraToLocation(lastKnownLocation);
      }
    }, [lastKnownLocation, isFollowingUser, routeCoords.length]);

    // Lógica refinada para el botón compass
    const moveToCurrentLocation = async () => {
      if (routeCoords.length > 0) {
        setIsFollowingUser(true); // Reactiva el seguimiento automático si estaba desactivado
        moveCameraToLocation(routeCoords[simIndex]);
        return;
      }
      const location = await getLocation();
      if (location && location.latitude && location.longitude) {
        moveCameraToLocation(location);
      } else if (lastKnownLocation) {
        moveCameraToLocation(lastKnownLocation);
      } else {
        console.log('No se pudo obtener la ubicación actual.');
      }
    };

    return (
      <>
        <MapView
          ref={mapRef}
          showsUserLocation={showsUserLocation}
          provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
          style={styles.map}
          onTouchStart={() => setIsFollowingUser(false)}
          initialRegion={{
            latitude: cameraLocation.current.latitude,
            longitude: cameraLocation.current.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {routeCoords.length > 0 && isShowingPolyline && (
            <Polyline
              coordinates={routeCoords}
              strokeColor="#007AFF"
              strokeWidth={5}
            />
          )}

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
          iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
          onPress={() => setIsShowingPolyline(!isShowingPolyline)}
          style={{
            bottom: 140,
            right: 20,
          }}
        />

        <FAB
          iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
          onPress={() => setIsFollowingUser(!isFollowingUser)}
          style={{
            bottom: 80,
            right: 20,
          }}
        />

        <FAB
          iconName="compass-outline"
          onPress={moveToCurrentLocation}
          style={{
            bottom: 20,
            right: 20,
          }}
        />

        {/* Botón rojo para salir de la ruta */}
        {isRouteStarted && routeCoords.length > 0 && (
          <TouchableOpacity
            style={styles.exitRouteBtn}
            onPress={() => {
              if (onExitRoute) onExitRoute();
            }}
          >
            <Text style={styles.exitRouteText}>Exit</Text>
          </TouchableOpacity>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  exitRouteBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 10,
  },
  exitRouteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});