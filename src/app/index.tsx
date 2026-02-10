import { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import GlobeMap from "@/components/globe-map";

export default function IndexRoute() {
  useEffect(() => {
    // Auto-present the flight info sheet on load
    const timer = setTimeout(() => {
      router.push("/flight-info");
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GlobeMap />
    </View>
  );
}
