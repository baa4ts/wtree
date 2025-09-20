import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts } from "@/constants/theme";
import { useUserStore } from "@/core/store/user.store";
import { useThemeColor } from "@/hooks/use-theme-color";
import { RegisterData } from "@/interfaces/user.interface";

export default function RegisterScreen() {
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const accent = useThemeColor({}, "accent");

  const router = useRouter();
  const { registerUser } = useUserStore();

  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    password: "",
    gmail: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !registerData.username ||
      !registerData.password ||
      !registerData.gmail
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    const success = await registerUser(registerData);
    setLoading(false);

    if (success) {
      router.replace("/");
    } else {
      Alert.alert("Error", "No se pudo registrar el usuario");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <Text style={[styles.title, { color: text, fontFamily: Fonts.rounded }]}>
        Registrar Usuario
      </Text>

      <TextInput
        placeholder="Nombre de usuario"
        placeholderTextColor={`${text}99`}
        style={[
          styles.input,
          { borderColor: accent, color: text, fontFamily: Fonts.sans },
        ]}
        value={registerData.username}
        onChangeText={(username) =>
          setRegisterData((prev) => ({ ...prev, username }))
        }
        editable={!loading}
      />

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor={`${text}99`}
        style={[
          styles.input,
          { borderColor: accent, color: text, fontFamily: Fonts.sans },
        ]}
        value={registerData.gmail}
        onChangeText={(gmail) =>
          setRegisterData((prev) => ({ ...prev, gmail }))
        }
        editable={!loading}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={`${text}99`}
        secureTextEntry
        style={[
          styles.input,
          { borderColor: accent, color: text, fontFamily: Fonts.sans },
        ]}
        value={registerData.password}
        onChangeText={(password) =>
          setRegisterData((prev) => ({ ...prev, password }))
        }
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: accent }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={[styles.buttonText, { fontFamily: Fonts.sans }]}>
            Registrar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("/auth/login")}
        disabled={loading}
      >
        <Text
          style={[styles.linkText, { color: accent, fontFamily: Fonts.sans }]}
        >
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
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  linkText: { fontSize: 14, marginTop: 16, textAlign: "center" },
});
