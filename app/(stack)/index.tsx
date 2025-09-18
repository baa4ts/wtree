import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";
import { Fonts } from "@/constants/theme";
import SensorCard from "@/components/SensorCard";
import { useSensor } from "@/core/hook/sensor.tanStack";
import { getDayMoments } from "@/auxiliar/day";
import { useUserStore } from "@/core/store/user.store";

export default function NotificationsScreen() {
  const [refreshStatus, setRefreshStatus] = useState(false);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const subtextColor = useThemeColor({}, "subtext");
  const accentColor = useThemeColor({}, "accent");
  const router = useRouter();

  const { data, isLoading, error, refetch } = useSensor();
  const { resetUser, username } = useUserStore();

  const onRefresh = useCallback(async () => {
    setRefreshStatus(true);
    await refetch();
    setRefreshStatus(false);
  }, [refetch]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: subtextColor }]}>
            Error al obtener los reportes. Por favor, intenta de nuevo.
          </Text>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: accentColor }]}
            onPress={() => {
              resetUser();
              router.replace("/auth/login");
            }}
          >
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const hasSensors = data?.datos && data.datos.length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: textColor }]}>
            Buenas {getDayMoments()}
          </Text>
          <Text style={[styles.username, { color: textColor }]}>
            {username}
          </Text>
        </View>

        <View style={styles.iconsRow}>
          <TouchableOpacity onPress={() => router.push("/(stack)/nuevo")}>
            <Ionicons
              name="add-outline"
              size={34}
              color={textColor}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(stack)/user")}>
            <Ionicons
              name="person-circle-outline"
              size={34}
              color={textColor}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenido principal */}
      {hasSensors ? (
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshStatus} onRefresh={onRefresh} />
          }
        >
          {data.datos.map((sensor) => (
            <SensorCard
              key={sensor.sensorID + sensor.fecha}
              valor={sensor.valor}
              fecha={sensor.fecha}
              sensorName={sensor.sensorUsername}
              sensorDescription={sensor.sensorDescripction}
              sensorID={sensor.sensorID}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons
            name="alert-circle-outline"
            size={70}
            color={subtextColor}
          />
          <Text style={[styles.emptyText, { color: subtextColor }]}>
            No tienes sensores registrados o aún no hay notificaciones.
            Recomendamos esperar 10 minutos o revisar cómo conectar el sensor.
          </Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: accentColor }]}
            onPress={() => router.push("/(stack)/nuevo")}
          >
            <Text style={styles.addButtonText}>Registrar sensor nuevo</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollArea: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  scrollContent: { paddingBottom: 140 },

  /* Header */
  header: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 18, fontWeight: "500", fontFamily: Fonts.rounded },
  username: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 6,
    fontFamily: Fonts.sans,
  },
  iconsRow: { flexDirection: "row", alignItems: "center" },
  icon: { marginLeft: 18 },

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
    fontFamily: Fonts.rounded,
  },
  addButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#fff",
    fontFamily: Fonts.sans,
    fontSize: 16,
    fontWeight: "700",
  },

  /* Error State */
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    fontFamily: Fonts.rounded,
  },
  logoutButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  logoutButtonText: {
    color: "#fff",
    fontFamily: Fonts.sans,
    fontSize: 16,
    fontWeight: "700",
  },
});
