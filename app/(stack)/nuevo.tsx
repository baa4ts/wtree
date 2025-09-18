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
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const subtextColor = useThemeColor({}, "subtext");
  const accentColor = useThemeColor({}, "accent");

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
  };

  const handleChange = (key: keyof SensorData, value: string) => {
    setSensor((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={[styles.container, backgroundStyle(backgroundColor)]}>
      <Text style={[styles.title, textStyle(textColor)]}>Nuevo sensor</Text>

      <View style={styles.tipsRow}>
        <Ionicons
          name="information-circle-outline"
          size={18}
          color={subtextColor}
        />
        <Text style={[styles.tipsText, textStyle(subtextColor)]}>
          Tips: El sensor ID se obtiene en el momento que conectas tu sensor a
          tu red Wifi
        </Text>
      </View>

      <TextInput
        style={[styles.input, inputStyle(accentColor, textColor)]}
        placeholder="ID del sensor"
        placeholderTextColor={subtextColor}
        value={sensor.sensorID}
        onChangeText={(value) => handleChange("sensorID", value)}
      />
      <TextInput
        style={[styles.input, inputStyle(accentColor, textColor)]}
        placeholder="Nombre del sensor"
        placeholderTextColor={subtextColor}
        value={sensor.sensorUsername}
        onChangeText={(value) => handleChange("sensorUsername", value)}
      />
      <TextInput
        style={[styles.textbox, inputStyle(accentColor, textColor)]}
        placeholder="Descripción del sensor"
        placeholderTextColor={subtextColor}
        value={sensor.sensorDescription}
        onChangeText={(value) => handleChange("sensorDescription", value)}
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() =>
            Alert.alert("Aviso", "Mantén presionado para cancelar")
          }
          onLongPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, accentButtonStyle(accentColor)]}
          onPress={() => Alert.alert("Aviso", "Mantén presionado para guardar")}
          onLongPress={handleSave}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const backgroundStyle = (bg: string) => ({ backgroundColor: bg });
const textStyle = (color: string) => ({ color });
const inputStyle = (borderColor: string, textColor: string) => ({
  borderColor,
  color: textColor,
});

const accentButtonStyle = (bgColor: string) => ({
  backgroundColor: bgColor,
  marginLeft: 8,
});

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
    fontFamily: Fonts.sans,
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
    fontFamily: Fonts.rounded,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: Fonts.sans,
  },
  textbox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 24,
    fontSize: 16,
    textAlignVertical: "top",
    fontFamily: Fonts.sans,
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
  cancelButton: {
    backgroundColor: "#e63946",
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
});
