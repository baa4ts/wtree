// FILE: screens/User.tsx
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserScreen() {
    const background = useThemeColor({}, "background");
    const text = useThemeColor({}, "text");
    const subtext = useThemeColor({}, "subtext");
    const card = useThemeColor({}, "card");
    const accent = useThemeColor({}, "accent");

    const router = useRouter();


    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            {/* Header con flecha atrás */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color={text} />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.headerTitle,
                        { color: text, fontFamily: Fonts.sans },
                    ]}
                >
                    Perfil
                </Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Avatar + nombre */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: "https://i.pinimg.com/736x/e6/6c/ae/e66cae93b7d9fe0a5f224c9100d12e96.jpg" }}
                    style={styles.avatar}
                />
                <Text
                    style={[
                        styles.username,
                        { color: text, fontFamily: Fonts.rounded },
                    ]}
                >
                    Nombre de Usuario
                </Text>
                <Text
                    style={[
                        styles.subtitle,
                        { color: subtext, fontFamily: Fonts.sans },
                    ]}
                >
                    Usuario registrado
                </Text>
            </View>

            {/* Botón salir */}
            <TouchableOpacity onPress={()=> router.push("/")} style={[styles.logoutButton, { backgroundColor: accent }]}>
                <Text
                    style={[
                        styles.logoutText,
                        { fontFamily: Fonts.sans },
                    ]}
                >
                    Cerrar Session
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push("/auth/register")} style={[styles.logoutButton, { backgroundColor: accent }]}>
                <Text
                    style={[
                        styles.logoutText,
                        { fontFamily: Fonts.sans },
                    ]}
                >
                    Register
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push("/auth/login")} style={[styles.logoutButton, { backgroundColor: accent }]}>
                <Text
                    style={[
                        styles.logoutText,
                        { fontFamily: Fonts.sans },
                    ]}
                >
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 24,
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
    },
    profileSection: {
        alignItems: "center",
        marginBottom: 60,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    username: {
        fontSize: 22,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    logoutButton: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
