// app/(tabs)/settings.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Settings() {
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [defaultRadius, setDefaultRadius] = useState("100"); // meters
  const [sosContact, setSosContact] = useState("");

  // Load saved settings when screen mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem("@settings");
        if (stored) {
          const { ttsEnabled, defaultRadius, sosContact } = JSON.parse(stored);
          setTtsEnabled(ttsEnabled);
          setDefaultRadius(defaultRadius);
          setSosContact(sosContact);
        }
      } catch (error) {
        console.log("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  // Save settings to AsyncStorage
  const saveSettings = async () => {
    try {
      const settings = { ttsEnabled, defaultRadius, sosContact };
      await AsyncStorage.setItem("@settings", JSON.stringify(settings));
      Alert.alert(
        "Settings saved!",
        `Radius: ${defaultRadius}m\nTTS: ${ttsEnabled ? "On" : "Off"}\nSOS: ${sosContact}`
      );
    } catch (error) {
      console.log("Error saving settings:", error);
      Alert.alert("Error saving settings");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Text-to-Speech (TTS)</Text>
        <Switch value={ttsEnabled} onValueChange={setTtsEnabled} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Default Geofence Radius (m)</Text>
        <TextInput
          value={defaultRadius}
          onChangeText={setDefaultRadius}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>SOS Contact Number</Text>
        <TextInput
          value={sosContact}
          onChangeText={setSosContact}
          placeholder="+91XXXXXXXXXX"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

// --------------------- STYLES ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f8fb",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
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
