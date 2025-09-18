import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Router } from "expo-router";

import { getDayMoments } from "@/auxiliar/day";
import { Fonts } from "@/constants/theme";

interface HeaderProps {
  textColor: string;
  username: string;
  router: Router;
}

export default function Header({ textColor, username, router }: HeaderProps) {
  return (
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
}

const styles = StyleSheet.create({
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
});
