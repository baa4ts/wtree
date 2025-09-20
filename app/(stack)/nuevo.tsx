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
import { actionNewSensor } from "@/core/actions/sensores.actions";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key: keyof SensorData, value: string) => {
    setSensor((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!sensor.sensorID.trim() || !sensor.sensorUsername.trim()) {
      Alert.alert("Error", "El ID y el nombre son obligatorios");
      return;
    }

    setIsSubmitting(true);

    const success = await actionNewSensor({
      sensorDescripction: sensor.sensorDescription,
      sensorID: sensor.sensorID,
      sensorUsername: sensor.sensorUsername,
    });

    setIsSubmitting(false);

    if (success) {
      router.dismiss();
    } else {
      Alert.alert(
        "Error",
        "No se pudo registrar el sensor. Intenta nuevamente. Con otros datos",
      );
      setSensor({ sensorID: "", sensorUsername: "", sensorDescription: "" });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Nuevo sensor</Text>

      <View style={styles.tipsRow}>
        <Text style={[styles.tipsText, { color: subtextColor }]}>
          Importante: Al registrar un sensor, puede tardar en salir en la
          aplicación, debido a que hasta que el sensor no notifique el servidor
          no lo registrará
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="ID del sensor"
        placeholderTextColor={subtextColor}
        value={sensor.sensorID}
        onChangeText={(value) => handleChange("sensorID", value)}
        editable={!isSubmitting}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del sensor"
        placeholderTextColor={subtextColor}
        value={sensor.sensorUsername}
        maxLength={20}
        onChangeText={(value) => handleChange("sensorUsername", value)}
        editable={!isSubmitting}
      />
      <TextInput
        style={styles.textbox}
        placeholder="Descripción del sensor"
        placeholderTextColor={subtextColor}
        value={sensor.sensorDescription}
        onChangeText={(value) => handleChange("sensorDescription", value)}
        multiline
        maxLength={33}
        numberOfLines={4}
        editable={!isSubmitting}
      />

      <View style={styles.tipsRow}>
        <Ionicons
          name="information-circle-outline"
          size={18}
          color={subtextColor}
        />
        <Text style={[styles.tipsText, { color: subtextColor }]}>
          Tips: El sensor ID se obtiene en el momento que conectas tu sensor a
          tu red WiFi
        </Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.cancelButton,
            isSubmitting && styles.disabledButton,
          ]}
          onPress={() =>
            Alert.alert("Aviso", "Mantén presionado para cancelar")
          }
          onLongPress={() => router.back()}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.saveButton,
            { backgroundColor: accentColor },
            isSubmitting && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Guardar</Text>
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
  saveButton: {
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
});
