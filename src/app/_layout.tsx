import { ThemeProvider } from "@/components/theme-provider";
import { FlightProvider } from "@/store/flight-context";
import Stack from 'expo-router/build/layouts/ExperimentalModalStack';

export default function Layout() {
  return (
    <FlightProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="flight-info"
            options={{
              presentation: "formSheet",
              headerShown: false,
              sheetGrabberVisible: false,
              sheetAllowedDetents: [0.12, 0.5, 1.0],
              sheetCornerRadius: 20,
              sheetLargestUndimmedDetentIndex: 1,
              gestureEnabled: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </Stack>
      </ThemeProvider>
    </FlightProvider>
  );
}
