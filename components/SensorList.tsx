import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { useThemeColor } from "@/hooks/use-theme-color";

export interface SensorCardProps {
  sensorName: string;
  sensorID: string;
}

export default function SensorCardList({
  sensorName,
  sensorID,
}: SensorCardProps) {
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "card");

  return (
    <Pressable onPress={() => router.push(`/(stack)/${sensorID}`)}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sensorName, { color: textColor }]}>
          {sensorName}
        </Text>
        <Text style={[styles.sensorID, { color: textColor }]}>
          ID: {sensorID}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  sensorName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  sensorID: {
    fontSize: 14,
    fontWeight: "500",
  },
});
