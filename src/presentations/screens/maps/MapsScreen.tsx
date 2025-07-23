import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Map } from '../../components/maps/Map';
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useEffect, useState, useRef } from 'react';
import { DirectionPanel } from '../../components/direcctions/DirectionPanel';
import { fetchRoute } from '../../../infrastructure/api/directions';
import { GOOGLE_MAPS_API_KEY } from '@env';

export const MapsScreen = () => {
  const [showStartRouteBtn, setShowStartRouteBtn] = useState(false);
  const [showDirections, setShowDirections] = useState(true);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('car');
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [isRouteStarted, setIsRouteStarted] = useState(false);

  const mapRef = useRef<{ animateCamera: (params: any) => void }>(null);

  const modeMap: Record<string, string> = {
    car: 'driving',
    bus: 'transit',
    walk: 'walking',
    bike: 'bicycling',
  };

  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) getLocation();
  }, []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  const handleStartRoute = () => {
    setIsRouteStarted(true);
    setShowStartRouteBtn(false);
  };

  const handleExitRoute = () => {
    setIsRouteStarted(false);
    setRouteCoords([]);
    setShowDirections(true);
    setShowStartRouteBtn(false);
    setOrigin('');
    setDestination('');
    setMode('car');
  };

  const handleSubmit = async (
    newOrigin: string,
    newDestination: string,
    newMode: string,
  ) => {
    if (!newOrigin || !newDestination) {
      console.log('Debes ingresar origen y destino');
      return;
    }
    try {
      const apiMode = modeMap[newMode] || 'driving';
      const result = await fetchRoute(
        newOrigin,
        newDestination,
        apiMode,
        GOOGLE_MAPS_API_KEY,
      );
      setRouteCoords(result.coordinates);
      setShowStartRouteBtn(true);
      setShowDirections(false);
    } catch (e) {
      console.log('Error buscando ruta');
    }
  };

  const handleClose = () => {
    setShowDirections(false);
    setOrigin('');
    setDestination('');
    setMode('car');
    setRouteCoords([]);
    setShowStartRouteBtn(false);
    setIsRouteStarted(false);
  };

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <View style={styles.container}>
      {showDirections && (
        <DirectionPanel
          origin={origin}
          destination={destination}
          mode={mode}
          setOrigin={setOrigin}
          setDestination={setDestination}
          setMode={setMode}
          onClose={handleClose}
          onSwap={handleSwap}
          onSubmit={handleSubmit}
          GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
        />
      )}
      <Map
        ref={mapRef}
        initialLocation={lastKnownLocation}
        showsUserLocation={true}
        routeCoords={routeCoords}
        isRouteStarted={isRouteStarted}
        onExitRoute={handleExitRoute}
      />
      {!showDirections && routeCoords.length > 0 && showStartRouteBtn && (
        <TouchableOpacity
          style={styles.startRouteBtn}
          onPress={handleStartRoute}
        >
          <Text style={styles.startRouteText}>Start route</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  startRouteBtn: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 4,
  },
  startRouteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});