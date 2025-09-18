import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Fonts } from "@/constants/theme";

interface ToggleButtonsProps {
  showNotifications: boolean;
  setShowNotifications: (val: boolean) => void;
  textColor: string;
  accentColor: string;
}

export default function ToggleButtons({
  showNotifications,
  setShowNotifications,
  textColor,
  accentColor,
}: ToggleButtonsProps) {
  const notificationButtonStyle = showNotifications
    ? [styles.toggleButton, { backgroundColor: accentColor }]
    : styles.toggleButton;
  const sensorButtonStyle = !showNotifications
    ? [styles.toggleButton, { backgroundColor: accentColor }]
    : styles.toggleButton;

  const notificationTextStyle = showNotifications
    ? styles.toggleTextWhite
    : [styles.toggleText, { color: textColor }];
  const sensorTextStyle = !showNotifications
    ? styles.toggleTextWhite
    : [styles.toggleText, { color: textColor }];

  const notificationIconColor = showNotifications ? "#fff" : textColor;
  const sensorIconColor = !showNotifications ? "#fff" : textColor;

  return (
    <View style={styles.toggleRow}>
      <Pressable
        style={notificationButtonStyle}
        onPress={() => setShowNotifications(true)}
      >
        <Ionicons
          name="alert-circle-outline"
          size={22}
          color={notificationIconColor}
        />
        <Text style={notificationTextStyle}>Notificaciones</Text>
      </Pressable>
      <Pressable
        style={sensorButtonStyle}
        onPress={() => setShowNotifications(false)}
      >
        <Ionicons name="radio-outline" size={22} color={sensorIconColor} />
        <Text style={sensorTextStyle}>Sensores</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 12,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    fontWeight: "600",
    color: "#000", // color por defecto
  },
  toggleTextWhite: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    fontWeight: "600",
    color: "#fff",
  },
});
