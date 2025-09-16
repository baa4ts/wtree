import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName={"(stack)"}>
        <Stack.Screen name={"(stack)"} options={{ title: "Home" }} />
        <Stack.Screen name={"auth/login"} options={{ title: "Login" }} />
        <Stack.Screen name={"auth/register"} options={{ title: "Register" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
