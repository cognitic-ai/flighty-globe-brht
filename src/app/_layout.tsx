import { ThemeProvider } from "@/components/theme-provider";
import Stack from "expo-router/stack";
import { Image } from "expo-image";
import { Pressable } from "react-native";

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
            sheetAllowedDetents: [0.33, 0.55, 1.0],
            title: "",
            headerSearchBarOptions: {},
          }}
        >
          <Stack.Header
            style={{
              backgroundColor: "transparent",
            }}
          ></Stack.Header>
          <Stack.Toolbar placement="left">
            <Stack.Toolbar.Menu inline separateBackground>
              <Stack.Toolbar.Label>My Flights</Stack.Toolbar.Label>
              <Stack.Toolbar.MenuAction icon="person.crop.circle">
                My Flights
              </Stack.Toolbar.MenuAction>
              <Stack.Toolbar.MenuAction icon="person.2">
                Friends' Flights
              </Stack.Toolbar.MenuAction>
              <Stack.Toolbar.MenuAction icon={"circle"}>
                Today
              </Stack.Toolbar.MenuAction>
            </Stack.Toolbar.Menu>
          </Stack.Toolbar>
          <Stack.Toolbar placement="right">
            <Stack.Toolbar.Spacer />
            <Stack.Toolbar.Button
              separateBackground
              icon="square.and.arrow.up"
              onPress={() => {}}
            />
            <Stack.Toolbar.View separateBackground>
              <Pressable onPress={() => {}} style={{ width: 36, height: 36 }}>
                <Image
                  source={{
                    uri: "https://github.com/evanbacon.png",
                  }}
                  style={{
                    flex: 1,

                    borderRadius: 16,
                  }}
                />
              </Pressable>
            </Stack.Toolbar.View>
          </Stack.Toolbar>
        </Stack.Screen>
      </Stack>
    </ThemeProvider>
  );
}
