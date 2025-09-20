import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { useThemeColor } from "@/hooks/use-theme-color";
import { getIconName } from "@/auxiliar/getIconName";
import { formatDate } from "@/auxiliar/time";
import { getColorNoDinamic } from "@/auxiliar/getColors2";

export interface SensorCardProps {
  valor: number;
  fecha: string;
  sensorName: string;
  sensorDescription: string;
  sensorID: string;
}

export default function SensorCardNotification({
  valor,
  fecha,
  sensorName,
  sensorDescription,
  sensorID,
}: SensorCardProps) {
  const textColor = useThemeColor({}, "text");
  const subtextColor = useThemeColor({}, "subtext");
  const cardColor = useThemeColor({}, "card");
  const accentColor = useThemeColor({}, "accent");
  const fireColor = useThemeColor({}, "fire");
  const sheetColor = useThemeColor({}, "sheet");

  const dynamicColor = getColorNoDinamic(
    valor,
    accentColor,
    fireColor,
    sheetColor,
  );

  const dynamicStyles = StyleSheet.create({
    card: { backgroundColor: cardColor },
    title: { color: textColor },
    date: { color: subtextColor },
    valueCircle: { borderColor: dynamicColor },
    valueText: { color: dynamicColor },
    bottomRow: { backgroundColor: "#111" },
  });

  return (
    <Pressable onPress={() => router.push(`/(stack)/${sensorID}`)}>
      <View style={[styles.card, dynamicStyles.card]}>
        <View style={styles.topRow}>
          <Ionicons
            name={getIconName(valor)}
            size={60}
            color={dynamicColor}
            style={styles.icon}
          />
          <View style={styles.info}>
            <Text style={[styles.title, dynamicStyles.title]}>
              {sensorName}
            </Text>
            <Text style={[styles.date, dynamicStyles.date]}>
              {formatDate(fecha)}
            </Text>
          </View>
          <View style={[styles.valueCircle, dynamicStyles.valueCircle]}>
            <Text style={[styles.valueText, dynamicStyles.valueText]}>
              {valor}
            </Text>
          </View>
        </View>

        <View style={[styles.bottomRow, dynamicStyles.bottomRow]}>
          <Text style={styles.sensorDescription}>{sensorDescription}</Text>
        </View>
      </View>
    </Pressable>
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
  icon: { marginRight: 16 },
  info: { flex: 1, justifyContent: "center" },
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
  bottomRow: { padding: 12, borderRadius: 12 },
  sensorDescription: { fontSize: 14, marginTop: 4, color: "#ddd" },
});
