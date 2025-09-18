import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Fonts } from "@/constants/theme";

interface EmptyStateProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  message: string;
  subtextColor?: string;
}

export default function EmptyState({
  iconName,
  message,
  subtextColor,
}: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      {iconName && <Ionicons name={iconName} size={70} color={subtextColor} />}
      <Text style={[styles.emptyText, subtextColor && { color: subtextColor }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
