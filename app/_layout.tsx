import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { registerForPushNotificationsAsync } from "@/expo/usePushToken";
import useNotificationObserver from "@/expo/useNotificationObserver";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useNotificationObserver();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName="(stack)"
        >
          <Stack.Screen name="(stack)" options={{ title: "Home" }} />
          <Stack.Screen name="auth/login" options={{ title: "Login" }} />
          <Stack.Screen name="auth/register" options={{ title: "Register" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
