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
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";
import { Fonts } from "@/constants/theme";
import SensorCardNotification from "@/components/SensorCard";
import SensorCardList from "@/components/SensorList";
import {
  useSensorList,
  useSensorNotification,
} from "@/core/hook/sensor.tanStack";
import { getDayMoments } from "@/auxiliar/day";
import { useUserStore } from "@/core/store/user.store";

export default function NotificationsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);

  const router = useRouter();
  const { resetUser, username } = useUserStore();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const subtextColor = useThemeColor({}, "subtext");
  const accentColor = useThemeColor({}, "accent");

  const {
    data: notifications,
    isLoading: loadingNotifications,
    error: errorNotifications,
    refetch: refetchNotifications,
  } = useSensorNotification();

  const {
    data: sensors,
    isLoading: loadingSensors,
    error: errorSensors,
  } = useSensorList();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetchNotifications();
    setRefreshing(false);
  }, [refetchNotifications]);

  // Seguridad: arrays por defecto
  const notificationArray = notifications?.datos ?? [];
  const sensorArray = sensors?.sensores ?? [];

  const hasNotifications = notificationArray.length > 0;
  const hasSensors = sensorArray.length > 0;

  // Loading global
  if (loadingNotifications) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
      </SafeAreaView>
    );
  }

  // Error global
  if (errorNotifications) {
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header textColor={textColor} username={username} router={router} />
      <ToggleButtons
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        textColor={textColor}
        accentColor={accentColor}
      />

      {showNotifications ? (
        hasNotifications ? (
          <NotificationList
            notifications={notificationArray}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <EmptyState
            iconName="notifications-outline"
            message="No tienes notificaciones nuevas."
            subtextColor={subtextColor}
          />
        )
      ) : hasSensors ? (
        <SensorList
          sensors={sensorArray}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <EmptyState message="No hay sensores aún" />
      )}
    </SafeAreaView>
  );
}

// ---------------- Components ----------------

const Header = ({ textColor, username, router }: any) => (
  <View style={styles.header}>
    <View>
      <Text style={[styles.greeting, { color: textColor }]}>
        Buenas {getDayMoments()}
      </Text>
      <Text style={[styles.username, { color: textColor }]}>{username}</Text>
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
);

const ToggleButtons = ({
  showNotifications,
  setShowNotifications,
  textColor,
  accentColor,
}: any) => (
  <View style={styles.toggleRow}>
    <Pressable
      style={[
        styles.toggleButton,
        showNotifications && { backgroundColor: accentColor },
      ]}
      onPress={() => setShowNotifications(true)}
    >
      <Ionicons
        name="alert-circle-outline"
        size={22}
        color={showNotifications ? "#fff" : textColor}
      />
      <Text
        style={[
          styles.toggleText,
          { color: showNotifications ? "#fff" : textColor },
        ]}
      >
        Notificaciones
      </Text>
    </Pressable>
    <Pressable
      style={[
        styles.toggleButton,
        !showNotifications && { backgroundColor: accentColor },
      ]}
      onPress={() => setShowNotifications(false)}
    >
      <Ionicons
        name="radio-outline"
        size={22}
        color={!showNotifications ? "#fff" : textColor}
      />
      <Text
        style={[
          styles.toggleText,
          { color: !showNotifications ? "#fff" : textColor },
        ]}
      >
        Sensores
      </Text>
    </Pressable>
  </View>
);

const NotificationList = ({ notifications, refreshControl }: any) => (
  <ScrollView
    style={styles.scrollArea}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    refreshControl={refreshControl}
  >
    {notifications.map((sensor: any) => (
      <SensorCardNotification
        key={sensor.sensorID + sensor.fecha}
        valor={sensor.valor}
        fecha={sensor.fecha}
        sensorName={sensor.sensorUsername}
        sensorDescription={sensor.sensorDescripction}
        sensorID={sensor.sensorID}
      />
    ))}
  </ScrollView>
);

const SensorList = ({ sensors, refreshControl }: any) => (
  <ScrollView
    style={styles.scrollArea}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    refreshControl={refreshControl}
  >
    {sensors.map((sensor: any) => (
      <SensorCardList
        key={sensor.sensorID}
        sensorName={sensor.sensorUsername}
        sensorID={sensor.sensorID}
      />
    ))}
  </ScrollView>
);

const EmptyState = ({ iconName, message, subtextColor }: any) => (
  <View style={styles.emptyState}>
    {iconName && <Ionicons name={iconName} size={70} color={subtextColor} />}
    <Text style={[styles.emptyText, subtextColor && { color: subtextColor }]}>
      {message}
    </Text>
  </View>
);

// ---------------- Styles ----------------

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

  /* Toggle */
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
  toggleText: { fontSize: 16, fontFamily: Fonts.sans, fontWeight: "600" },

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
