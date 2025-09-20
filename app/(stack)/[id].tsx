import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";

import { useThemeColor } from "@/hooks/use-theme-color";
import { Fonts } from "@/constants/theme";
import { useSpecificSensor } from "@/core/hook/sensor.tanStack";

export default function Sensor() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "card");
  const accentColor = useThemeColor({}, "accent");

  const { data } = useSpecificSensor({
    sensorID: id?.toString(),
  });

  useEffect(() => {
    if (!id) router.replace("/");
  }, [id, router]);

  if (!data) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color={accentColor} />
        <Text style={[styles.loadingText, { color: textColor }]}>
          Cargando sensor...
        </Text>
      </View>
    );
  }

  const lastReport = data.reportes[0];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { borderBottomColor: accentColor }]}>
        <Text style={[styles.title, { color: textColor }]}>
          {data.sensorUsername}
        </Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          {data.sensorDescripction}
        </Text>
      </View>

      <View style={[styles.lastReportCard, { backgroundColor: cardColor }]}>
        <Text style={[styles.reportText, { color: accentColor }]}>
          {lastReport ? "Último reporte" : "No hay reportes"}
        </Text>
        {lastReport && (
          <>
            <Text style={[styles.reportText, { color: textColor }]}>
              Valor: {lastReport.valor}
            </Text>
            <Text style={[styles.reportText, { color: textColor }]}>
              Fecha: {lastReport.fecha.toString()}
            </Text>
          </>
        )}
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled
      >
        {data.reportes && data.reportes.length > 0 ? (
          data.reportes.map((item, index) => (
            <View
              key={index}
              style={[styles.card, { backgroundColor: cardColor }]}
            >
              <Text style={[styles.reportText, { color: textColor }]}>
                Valor: {item.valor}
              </Text>
              <Text style={[styles.reportText, { color: textColor }]}>
                Fecha: {item.fecha.toString()}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.center}>
            <Text style={[styles.text, { color: textColor }]}>
              No hay reportes disponibles
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: Fonts.sans,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.sans,
  },
  header: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.sans,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.sans,
  },
  lastReportCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  reportText: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    marginBottom: 2,
  },
});
