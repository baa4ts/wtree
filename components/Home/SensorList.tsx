import React, { useCallback, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";

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

  // Loading
  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
      </View>
    );
  }

  // Empty state
  if (sensorArray.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <Text style={{ color: subtextColor, fontFamily: Fonts.sans }}>
          No hay sensores aún
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
});
