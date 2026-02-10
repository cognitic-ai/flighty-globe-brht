import { ThemeProvider } from "@/components/theme-provider";
import Stack from "expo-router/stack";
import * as AC from "@bacons/apple-colors";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="flight-info"
          options={{
            presentation: "formSheet",
            sheetGrabberVisible: false,
            sheetAllowedDetents: [0.15, 0.45, 1.0],
            sheetCornerRadius: 20,
            sheetExpandsWhenScrolledToEdge: false,
            gestureEnabled: false,
            headerShown: true,
            headerTransparent: true,
            title: "",
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Header style={{ backgroundColor: "transparent" }}>
            <Stack.Header.Right />
          </Stack.Header>
        </Stack.Screen>
      </Stack>
    </ThemeProvider>
  );
}
