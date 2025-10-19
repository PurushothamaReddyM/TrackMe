import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Location {
  id: string;
  name: string;
}

export default function HomeScreen() {
  const router = useRouter(); // <-- Add this
  const [locations, setLocations] = useState<Location[]>([]);

  // Refresh locations whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchLocations = async () => {
        const stored = await AsyncStorage.getItem("@locations");
        if (stored) setLocations(JSON.parse(stored));
      };
      fetchLocations();
    }, [])
  );

  // Navigate to add-location
  const goToAddLocation = () => {
    router.push("/add-location"); // <-- programmatic navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TrackMe 🗺️</Text>
      <Text style={styles.subtitle}>Track and manage your favorite locations easily.</Text>

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
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={goToAddLocation}>
        <Text style={styles.buttonText}>Add Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f8fb",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#666",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
