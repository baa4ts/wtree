import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import Header from "@/components/Home/Header";
import ToggleButtons from "@/components/Home/ToggleButtons";
import NotificationList from "@/components/Home/NotificationList";
import SensorList from "@/components/Home/SensorList";
import { useUserStore } from "@/core/store/user.store";

export default function NotificationsScreen() {
  const [showNotifications, setShowNotifications] = useState(true);

  const router = useRouter();
  const { username } = useUserStore();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const accentColor = useThemeColor({}, "accent");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header
        textColor={textColor}
        username={username || "undefined"}
        router={router}
      />

      <ToggleButtons
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        textColor={textColor}
        accentColor={accentColor}
      />

      {showNotifications ? <NotificationList /> : <SensorList />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
