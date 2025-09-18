import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useUserStore } from "@/core/store/user.store";
import { Fonts } from "@/constants/theme";

export default function UserScreen() {
  const background = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const subtextColor = useThemeColor({}, "subtext");
  const cardColor = useThemeColor({}, "card");
  const accentColor = useThemeColor({}, "accent");

  const { resetUser, username, gmail } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            await resetUser();
            router.replace("/auth/login");
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Perfil</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Perfil Card */}
      <View style={[styles.profileCard, { backgroundColor: cardColor }]}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/e6/6c/ae/e66cae93b7d9fe0a5f224c9100d12e96.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={[styles.username, { color: textColor }]}>
          {username || "Usuario"}
        </Text>
        <Text style={[styles.subtitle, { color: subtextColor }]}>
          {gmail || "correo@ejemplo.com"}
        </Text>
      </View>

      {/* Botón Logout */}
      <TouchableOpacity
        onLongPress={handleLogout}
        style={[styles.logoutButton, { backgroundColor: accentColor }]}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
  headerSpacer: {
    width: 28,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#fff",
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: Fonts.sans,
  },
  logoutButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
});
