import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { Location as Loc } from '../db/models';

// Current watch subscription
let locationSubscription: Location.LocationSubscription | null = null;

// Start watching user location
export const startLocationWatch = async (
  onUpdate: (coords: { latitude: number; longitude: number }) => void
) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission denied', 'Location permission is required.');
    return;
  }

  locationSubscription = await Location.watchPositionAsync(
    { accuracy: Location.Accuracy.Highest, distanceInterval: 5 },
    (loc) => {
      const coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      onUpdate(coords);
    }
  );
};

// Stop watching user location
export const stopLocationWatch = () => {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
  }
};

// Optional: Check if user is within a location radius
export const isWithinRadius = (userCoords: { latitude: number; longitude: number }, loc: Loc) => {
  const R = 6371000; // Earth radius in meters
  const dLat = ((loc.latitude - userCoords.latitude) * Math.PI) / 180;
  const dLon = ((loc.longitude - userCoords.longitude) * Math.PI) / 180;
  const lat1 = (userCoords.latitude * Math.PI) / 180;
  const lat2 = (loc.latitude * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= loc.radius;
};
