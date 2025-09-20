import React, { useState, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";

import SensorCardNotification from "@/components/SensorCard";
import { useSensorNotification } from "@/core/hook/sensor.tanStack";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Fonts } from "@/constants/theme";

interface SensorNotification {
  sensorID: string;
  valor: string | number;
  fecha: string;
  sensorUsername: string;
  sensorDescripction: string;
}

export default function NotificationList() {
  const { data: notifications, isLoading, refetch } = useSensorNotification();
  const [refreshing, setRefreshing] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const accentColor = useThemeColor({}, "accent");
  const subtextColor = useThemeColor({}, "subtext");

  const notificationArray: SensorNotification[] = notifications?.datos ?? [];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch?.();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

  if (notificationArray.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <Text style={{ color: subtextColor, fontFamily: Fonts.sans }}>
          No tienes notificaciones nuevas.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollArea}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {notificationArray.map((notification) => (
        <SensorCardNotification
          key={notification.sensorID + notification.fecha}
          valor={Number(notification.valor)}
          fecha={notification.fecha}
          sensorName={notification.sensorUsername}
          sensorDescription={notification.sensorDescripction}
          sensorID={notification.sensorID}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  scrollContent: { paddingBottom: 140 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});
