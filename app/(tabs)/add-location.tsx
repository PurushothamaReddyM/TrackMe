import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";

export default function AddLocation() {
  const [name, setName] = useState("");
  const router = useRouter();

  const saveLocation = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a location name.");
      return;
    }

    try {
      const stored = await AsyncStorage.getItem("@locations");
      const locations = stored ? JSON.parse(stored) : [];

      const newLocation = {
        id: uuid.v4().toString(),
        name: name.trim(),
      };

      locations.push(newLocation);
      await AsyncStorage.setItem("@locations", JSON.stringify(locations));

      Alert.alert("Success", `Location "${name}" added!`, [
        { text: "OK", onPress: () => router.push("/home") },
      ]);
    } catch (error) {
      console.log("Error saving location:", error);
      Alert.alert("Error", "Failed to save location.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Location 📍</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter location name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button} onPress={saveLocation}>
        <Text style={styles.buttonText}>Save Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f4f8fb",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
