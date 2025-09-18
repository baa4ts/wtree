import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts } from "@/constants/theme";
import { useUserStore } from "@/core/store/user.store";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const accentColor = useThemeColor({}, "accent");
  const backgroundColor = useThemeColor({}, "background");
  const { status, checkUser } = useUserStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (status === "checking") {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
        <Text style={[styles.text, { color: accentColor }]}>
          Verificando sesión...
        </Text>
      </SafeAreaView>
    );
  }

  if (status === "unauthenticated") {
    return <Redirect href={"/auth/login"} />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName={"index"}>
        <Stack.Screen name={"index"} options={{ title: "Home" }} />
        <Stack.Screen name={"user"} options={{ title: "User Profile" }} />
        <Stack.Screen name={"nuevo"} options={{ title: "New Controller" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: Fonts.sans,
  },
});
