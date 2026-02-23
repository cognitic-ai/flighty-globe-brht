import { useEffect } from "react";
import { View, Pressable } from "react-native";
import { router, Stack } from "expo-router";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import GlobeMap from "@/components/globe-map";
import { useFlightStore } from "@/store/flight-context";

function MapToggleButton() {
  const { mapIs3D, setMapIs3D } = useFlightStore();
  const icon = mapIs3D ? "sf:globe" : "sf:map";

  return (
    <Pressable
      onPress={() => setMapIs3D(!mapIs3D)}
      style={{ borderRadius: 20, overflow: "hidden" }}
    >
      {isLiquidGlassAvailable() ? (
        <GlassView
          isInteractive
          style={{ width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" }}
        >
          <Image source={icon} style={{ width: 18, height: 18, tintColor: AC.label }} />
        </GlassView>
      ) : (
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(80,80,80,0.55)",
          }}
        >
          <Image source={icon} style={{ width: 18, height: 18, tintColor: "#fff" }} />
        </View>
      )}
    </Pressable>
  );
}

export default function IndexRoute() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/flight-info");
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerRight: () => <MapToggleButton />,
        }}
      />
      <GlobeMap />
    </View>
  );
}
