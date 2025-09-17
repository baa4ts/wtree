// FILE: screens/SensorForm.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { Fonts } from "@/constants/theme";

interface SensorData {
  sensorID: string;
  sensorUsername: string;
  sensorDescription: string;
}

export default function SensorForm() {
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const subtext = useThemeColor({}, "subtext");
  const accent = useThemeColor({}, "accent");

  const router = useRouter();

  const [sensor, setSensor] = useState<SensorData>({
    sensorID: "",
    sensorUsername: "",
    sensorDescription: "",
  });

  const handleSave = () => {
    if (!sensor.sensorID.trim() || !sensor.sensorUsername.trim()) {
      Alert.alert("Error", "El ID y el nombre son obligatorios");
      return;
    }

    console.log("Sensor ID:", sensor.sensorID);
    console.log("Sensor Name:", sensor.sensorUsername);
    console.log("Sensor Description:", sensor.sensorDescription || "(empty)");
  };

  const handleChange = (key: keyof SensorData, value: string) => {
    setSensor((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={[styles.title, { color: text, fontFamily: Fonts.sans }]}>
        Nuevo sensor
      </Text>

      <View style={styles.tipsRow}>
        <Ionicons name="information-circle-outline" size={18} color={subtext} />
        <Text
          style={[
            styles.tipsText,
            { color: subtext, fontFamily: Fonts.rounded },
          ]}
        >
          Tips: El sensor ID se obtiene en el momento que conectas tu sensor a
          tu red Wifi
        </Text>
      </View>

      <TextInput
        style={[styles.input, { borderColor: accent, color: text }]}
        placeholder="ID del sensor"
        placeholderTextColor={subtext}
        value={sensor.sensorID}
        onChangeText={(value) => handleChange("sensorID", value)}
      />
      <TextInput
        style={[styles.input, { borderColor: accent, color: text }]}
        placeholder="Nombre del sensor"
        placeholderTextColor={subtext}
        value={sensor.sensorUsername}
        onChangeText={(value) => handleChange("sensorUsername", value)}
      />
      <TextInput
        style={[styles.textbox, { borderColor: accent, color: text }]}
        placeholder="Descripción del sensor"
        placeholderTextColor={subtext}
        value={sensor.sensorDescription}
        onChangeText={(value) => handleChange("sensorDescription", value)}
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonsRow}>
        {/* Cancelar a la izquierda */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "#e63946", marginRight: 8 },
          ]}
          onPress={() =>
            Alert.alert("Aviso", "Mantén presionado para cancelar")
          }
          onLongPress={() => router.back()}
        >
          <Text style={[styles.buttonText, { fontFamily: Fonts.sans }]}>
            Cancelar
          </Text>
        </TouchableOpacity>

        {/* Guardar a la derecha */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: accent, marginLeft: 8 }]}
          onPress={() => Alert.alert("Aviso", "Mantén presionado para guardar")}
          onLongPress={handleSave}
        >
          <Text style={[styles.buttonText, { fontFamily: Fonts.sans }]}>
            Guardar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  tipsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  tipsText: {
    fontSize: 14,
    marginLeft: 6,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  textbox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 24,
    fontSize: 16,
    textAlignVertical: "top",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
