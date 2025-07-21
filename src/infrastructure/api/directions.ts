export const fetchRoute = async (
  origin: string,
  destination: string,
  mode: string,
  apiKey: string
): Promise<{ coordinates: { latitude: number; longitude: number }[] }> => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&mode=${mode}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.routes || !data.routes.length) return { coordinates: [] };

  // Decodifica el polyline
  const points = decodePolyline(data.routes[0].overview_polyline.points);
  return { coordinates: points };
};

// Decodificador de polyline (puedes usar una librería como @mapbox/polyline)
import polyline from '@mapbox/polyline';
function decodePolyline(encoded: string) {
  return polyline.decode(encoded).map(([lat, lng]) => ({
    latitude: lat,
    longitude: lng,
  }));
}