// FILE: screens/NotificationsScreen/index.js
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Reporte } from "@/interfaces/sensor.interfaces";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Fonts } from "@/constants/theme";
import SensorCard from "@/components/SensorCard";

export default function NotificationsScreen() {
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const subtext = useThemeColor({}, "subtext");
  const accent = useThemeColor({}, "accent");
  const router = useRouter();

  const sensorUsername = "Sensor Sala";
  const sensorDescripction = "Sensor de temperatura en sala principal";

  const notifications: Reporte[] = [
    {
      id: 1,
      sensorID: "SENSOR1000",
      valor: 512,
      fecha: "2025-08-22T14:00:00Z",
    },
    {
      id: 2,
      sensorID: "SENSOR1001",
      valor: 230,
      fecha: "2025-08-22T14:01:00Z",
    },
    {
      id: 3,
      sensorID: "SENSOR1002",
      valor: 1023,
      fecha: "2025-08-22T14:02:00Z",
    },
    { id: 4, sensorID: "SENSOR1003", valor: 76, fecha: "2025-08-22T14:03:00Z" },
    {
      id: 5,
      sensorID: "SENSOR1004",
      valor: 845,
      fecha: "2025-08-22T14:04:00Z",
    },
  ];

  const getDayMoments = (): "días" | "tardes" | "noches" => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "días";
    if (hora >= 12 && hora < 19) return "tardes";
    return "noches";
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.greeting,
              { color: text, fontFamily: Fonts.rounded },
            ]}
          >
            Buenas {getDayMoments()}
          </Text>
          <Text
            style={[styles.username, { color: text, fontFamily: Fonts.sans }]}
          >
            Carlos Morals
          </Text>
        </View>
        <View style={styles.iconsRow}>
          <TouchableOpacity onPress={() => router.push("/(stack)/nuevo")}>
            <Ionicons
              name="add-outline"
              size={34}
              color={text}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(stack)/user")}>
            <Ionicons
              name="person-circle-outline"
              size={34}
              color={text}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={70} color={subtext} />
          <Text
            style={[
              styles.emptyText,
              { color: subtext, fontFamily: Fonts.rounded },
            ]}
          >
            No tienes sensores registrados
          </Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: accent }]}
            onPress={() => router.push("/(stack)/nuevo")}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: Fonts.sans,
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              Registrar sensor nuevo
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((item) => (
            <SensorCard
              key={item.id}
              valor={item.valor}
              fecha={item.fecha}
              sensorName={sensorUsername}
              sensorDescription={sensorDescripction}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollArea: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },

  /* Header */
  header: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 18, fontWeight: "500" },
  username: { fontSize: 24, fontWeight: "700", marginTop: 6 },
  iconsRow: { flexDirection: "row", alignItems: "center" },
  icon: { marginLeft: 18 },

  /* Card */
  notificationCard: {
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
  notificationTitle: { fontSize: 18, fontWeight: "700" },
  notificationDate: { fontSize: 12, marginTop: 4 },

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
  sensorName: { fontSize: 16, fontWeight: "700", color: "#fff" },
  sensorDescription: { fontSize: 14, marginTop: 4, color: "#ddd" },

  /* Empty State */
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: "center",
  },
  addButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
});
