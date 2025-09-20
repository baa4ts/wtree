import React, { useCallback, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Pressable,
} from "react-native";
import { router } from "expo-router";

import { useSensorList } from "@/core/hook/sensor.tanStack";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Fonts } from "@/constants/theme";

import SensorListCard from "../SensorCardList";

export default function SensorList() {
  const { data: sensors, isLoading, refetch } = useSensorList();
  const [refreshing, setRefreshing] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const accentColor = useThemeColor({}, "accent");
  const subtextColor = useThemeColor({}, "subtext");

  const sensorArray = sensors?.sensores ?? [];

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

  if (sensorArray.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <Text style={[styles.emptyText, { color: subtextColor }]}>
          No hay sensores aún
        </Text>
        <Pressable
          onPress={() => router.push("/(stack)/nuevo")}
          style={[styles.addButton, { backgroundColor: accentColor }]}
        >
          <Text style={styles.addButtonText}>Agregar un sensor</Text>
        </Pressable>
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
      {sensorArray.map((sensor) => (
        <SensorListCard
          key={sensor.sensorID}
          sensorID={sensor.sensorID}
          sensorName={sensor.sensorUsername}
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
  emptyText: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    marginBottom: 25,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    fontWeight: "600",
    color: "#fff",
  },
});
