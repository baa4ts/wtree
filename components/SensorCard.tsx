import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export interface SensorCardProps {
  valor: number;
  fecha: string;
  sensorName: string;
  sensorDescription: string;
}

export default function SensorCard({
  valor,
  fecha,
  sensorName,
  sensorDescription,
}: SensorCardProps) {
  const text = useThemeColor({}, "text");
  const subtext = useThemeColor({}, "subtext");
  const card = useThemeColor({}, "card");
  const accent = useThemeColor({}, "accent");
  const fire = useThemeColor({}, "fire");
  const sheet = useThemeColor({}, "sheet");

  const getIconName = (v: number) => {
    if (v <= 400) return "water-outline";
    if (v <= 649) return "leaf-outline";
    return "flame-outline";
  };

  const getColor = (v: number) => {
    if (v <= 400) return sheet;
    if (v <= 649) return accent;
    return fire;
  };

  const formatDate = (f: string) => {
    const d = new Date(f);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <View style={[styles.card, { backgroundColor: card }]}>
      <View style={styles.topRow}>
        <Ionicons
          name={getIconName(valor)}
          size={60}
          color={getColor(valor)}
          style={{ marginRight: 16 }}
        />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={[styles.title, { color: text }]}>{sensorName}</Text>
          <Text style={[styles.date, { color: subtext }]}>
            {formatDate(fecha)}
          </Text>
        </View>
        <View style={[styles.valueCircle, { borderColor: getColor(valor) }]}>
          <Text style={[styles.valueText, { color: getColor(valor) }]}>
            {valor}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.bottomRow,
          { backgroundColor: "#111", borderRadius: 12 },
        ]}
      >
        <Text style={styles.sensorDescription}>{sensorDescription}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  title: { fontSize: 18, fontWeight: "700" },
  date: { fontSize: 12, marginTop: 4 },
  valueCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  valueText: { fontWeight: "700", fontSize: 14 },
  bottomRow: { padding: 12 },
  sensorDescription: { fontSize: 14, marginTop: 4, color: "#ddd" },
});
