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
import { LoginData } from "@/interfaces/user.interface";
import { registerForPushNotificationsAsync } from "@/expo/usePushToken";

export default function LoginScreen() {
  const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const accent = useThemeColor({}, "accent");

  const { loginUser } = useUserStore();
  const router = useRouter();

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
    tokenExpo: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginData.username || !loginData.password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const tokenExpo = (await registerForPushNotificationsAsync()) || "NONE";

      const finalLoginData = { ...loginData, tokenExpo };

      setLoading(true);
      const success = await loginUser(finalLoginData);
      setLoading(false);

      if (success) {
        router.replace("/");
      } else {
        Alert.alert("Error", "Usuario o contraseña no son correctos");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo obtener el token de notificación");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      <Text style={[styles.title, { color: text, fontFamily: Fonts.rounded }]}>
        Iniciar Sesión
      </Text>

      <TextInput
        placeholder="Nombre de usuario"
        placeholderTextColor={`${text}99`}
        style={[
          styles.input,
          { borderColor: accent, color: text, fontFamily: Fonts.sans },
        ]}
        value={loginData.username}
        onChangeText={(username) =>
          setLoginData((prev) => ({ ...prev, username }))
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
        value={loginData.password}
        onChangeText={(password) =>
          setLoginData((prev) => ({ ...prev, password }))
        }
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: accent }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={[styles.buttonText, { fontFamily: Fonts.sans }]}>
            Ingresar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("/auth/register")}
        disabled={loading}
      >
        <Text
          style={[styles.linkText, { color: accent, fontFamily: Fonts.sans }]}
        >
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("/debbug")}
        disabled={loading}
      >
        <Text
          style={[styles.linkText, { color: accent, fontFamily: Fonts.sans }]}
        >
          Entrar al debbug
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
