import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts } from "@/constants/theme";
import { useUserStore } from "@/core/store/user.store";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const accent = useThemeColor({}, "accent");
  const { status, checkUser } = useUserStore();
  const background = useThemeColor({}, "background");

  useEffect(() => {
    checkUser();
  }, []);

  if (status === "checking") {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: background,
        }}
      >
        <ActivityIndicator size="large" color={accent} />
        <Text
          style={{
            marginTop: 16,
            fontSize: 16,
            color: accent,
            fontFamily: Fonts.sans,
          }}
        >
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
