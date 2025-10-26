import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { LatLng, Marker, Region, UrlTile } from "react-native-maps";
import uuid from "react-native-uuid";
import { GEOFENCING_TASK } from "../../tasks/geofence";

export default function AddLocationScreen() {
  const [name, setName] = useState("");
  const [marker, setMarker] = useState<LatLng | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [radius, setRadius] = useState(50);
  const mapRef = useRef<MapView | null>(null);
  const searchTimeout = useRef<number | null>(null);

  const defaultRegion: Region = {
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // 🛰️ Request all necessary permissions and set initial marker
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return Alert.alert("Permission denied");

      const { status: bgStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (bgStatus !== "granted") Alert.alert("Background location denied");

      const { status: notifStatus } =
        await Notifications.requestPermissionsAsync();
      if (notifStatus !== "granted") Alert.alert("Notifications denied");

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const initialMarker = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setMarker(initialMarker);
      mapRef.current?.animateCamera({ center: initialMarker, zoom: 17 });
    })();
  }, []);

  // 🔍 Search locations using OpenStreetMap’s Nominatim API
  const searchLocation = (query: string) => {
    if (!query.trim()) return;
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&addressdetails=1`,
          { headers: { "User-Agent": "TrackMeApp/1.0" } }
        );
        const data = await res.json();
        setSearchResults(data);
      } catch {
        Alert.alert("Error", "Failed to search locations");
      }
    }, 500) as unknown as number;
  };

  // 💾 Save location and start geofencing
  const saveLocation = async () => {
    if (!name.trim() || !marker)
      return Alert.alert("Enter name and select location");

    try {
      await Location.startGeofencingAsync(GEOFENCING_TASK, [
        {
          identifier: uuid.v4().toString(),
          latitude: marker.latitude,
          longitude: marker.longitude,
          radius,
          notifyOnEnter: true,
          notifyOnExit: true,
        },
      ]);
      Alert.alert("Success", `Location "${name}" added! Geofence active.`);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to start geofencing");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Location & Geofence 📍</Text>

      <TextInput
        style={styles.input}
        placeholder="Location name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Radius (meters)"
        keyboardType="numeric"
        value={radius.toString()}
        onChangeText={(t) => setRadius(Number(t))}
      />
      <TextInput
        style={styles.input}
        placeholder="Search location"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          searchLocation(text);
        }}
      />

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchItem}
              onPress={() => {
                const newMarker = {
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lon),
                };
                setMarker(newMarker);
                setName(item.display_name);
                setSearchResults([]);
                Keyboard.dismiss();
                mapRef.current?.animateCamera({ center: newMarker, zoom: 17 });
              }}
            >
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 200, marginBottom: 10 }}
        />
      )}

      {/* 🗺️ OpenStreetMap Layer */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: marker?.latitude ?? defaultRegion.latitude,
          longitude: marker?.longitude ?? defaultRegion.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {marker && (
          <Marker
            coordinate={marker}
            draggable
            onDragEnd={(e) => setMarker(e.nativeEvent.coordinate)}
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={saveLocation}>
        <Text style={styles.buttonText}>Save & Start Geofence</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f8fb" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  searchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
