import * as Notifications from 'expo-notifications';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Location } from '../../src/db/models';
import { getLocations } from '../../src/db/queries';

// ✅ Updated notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);

  // Refresh locations whenever the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadLocations = async () => {
        const data = await getLocations();
        setLocations(data);
      };
      loadLocations();
    }, [])
  );

  // Function to send a test notification
  const sendNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null, // send immediately
    });
  };

  const goToAddLocation = () => {
    // Just navigate, no function in params
    router.push('/add-location');
  };

  const simulateAlert = () =>
    sendNotification('TrackMe Alert 🚨', 'You are near one of your saved locations!');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrackMe 🗺️</Text>
      <Text style={styles.subtitle}>Manage and monitor your favorite locations easily.</Text>

      {locations.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No locations added yet!</Text>
          <Text style={styles.cardSubtitle}>Tap below to add your first one.</Text>
        </View>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>
                Lat: {item.latitude.toFixed(4)}, Lng: {item.longitude.toFixed(4)}
              </Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={goToAddLocation}>
        <Text style={styles.buttonText}>➕ Add Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#34C759' }]}
        onPress={simulateAlert}
      >
        <Text style={styles.buttonText}>🔔 Test Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f8fb' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#555', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardSubtitle: { color: '#666' },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
