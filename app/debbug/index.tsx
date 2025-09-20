import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { registerForPushNotificationsAsync } from "@/expo/usePushToken";

export default function Debug() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token || "No se pudo obtener el token");
    };
    getToken();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        Su Expo Push Token es:
      </Text>
      <Text style={{ marginTop: 10, fontWeight: "bold", textAlign: "center" }}>
        {expoPushToken}
      </Text>
    </View>
  );
}
