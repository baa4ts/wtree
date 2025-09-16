// FILE: screens/register.tsx
import { Fonts } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { RegisterData } from "@/interfaces/user.interface";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
    const background = useThemeColor({}, "background");
    const text = useThemeColor({}, "text");
    const accent = useThemeColor({}, "accent");

    const router = useRouter();

    const [registerData, setRegisterData] = useState<RegisterData>({
        username: "",
        password: "",
        gmail: ""
    });

    const handleRegister = () => {
        console.log("Register Data:", registerData);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
            <Text style={[styles.title, { color: text, fontFamily: Fonts.rounded }]}>Registrar Usuario</Text>

            <TextInput
                placeholder="Nombre de usuario"
                placeholderTextColor={text + "99"}
                style={[styles.input, { borderColor: accent, color: text, fontFamily: Fonts.sans }]}
                value={registerData.username}
                onChangeText={username => setRegisterData(prev => ({ ...prev, username }))}
            />

            <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor={text + "99"}
                style={[styles.input, { borderColor: accent, color: text, fontFamily: Fonts.sans }]}
                value={registerData.gmail}
                onChangeText={gmail => setRegisterData(prev => ({ ...prev, gmail }))}
            />

            <TextInput
                placeholder="Contraseña"
                placeholderTextColor={text + "99"}
                secureTextEntry
                style={[styles.input, { borderColor: accent, color: text, fontFamily: Fonts.sans }]}
                value={registerData.password}
                onChangeText={password => setRegisterData(prev => ({ ...prev, password }))}
            />

            <TouchableOpacity style={[styles.button, { backgroundColor: accent }]} onPress={handleRegister}>
                <Text style={[styles.buttonText, { fontFamily: Fonts.sans }]}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/auth/login")}>
                <Text style={[styles.linkText, { color: accent, fontFamily: Fonts.sans }]}>
                    ¿Ya tienes cuenta? Inicia sesión aquí
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: "center" },
    title: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16
    },
    button: {
        marginTop: 12,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center"
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
    linkText: { fontSize: 14, marginTop: 16, textAlign: "center" }
});
