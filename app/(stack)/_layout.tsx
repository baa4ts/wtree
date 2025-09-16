import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName={"index"} >
        <Stack.Screen name={"index"} options={{ title: "Home" }} />
        <Stack.Screen name={"user"} options={{ title: "User Profile" }} />
        <Stack.Screen name={"nuevo"} options={{ title: "New Controller" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
