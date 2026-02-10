import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";

const PROFILE_IMAGE = "https://github.com/evanbacon.png";

function ProfileHeader() {
  return (
    <View style={{ alignItems: "center", gap: 10, paddingTop: 8 }}>
      <Image
        source={{ uri: PROFILE_IMAGE }}
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          borderCurve: "continuous",
        }}
      />
      <Text
        style={{
          fontSize: 17,
          fontWeight: "600",
          color: AC.label,
        }}
      >
        Evan Bacon
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: AC.secondaryLabel,
          marginTop: -6,
        }}
      >
        In Flight · United Airlines
      </Text>
    </View>
  );
}

function FlightHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <View style={{ alignItems: "flex-start" }}>
        <Text
          selectable
          style={{
            fontSize: 42,
            fontWeight: "700",
            color: AC.label,
            letterSpacing: -1,
          }}
        >
          SFO
        </Text>
        <Text style={{ fontSize: 13, color: AC.secondaryLabel }}>
          San Francisco
        </Text>
      </View>

      <View style={{ alignItems: "center", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: String(AC.separator),
            }}
          />
          <Image
            source="sf:airplane"
            style={{
              width: 20,
              height: 20,
              tintColor: AC.systemBlue,
              transform: [{ rotate: "90deg" }],
            }}
          />
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: String(AC.separator),
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: AC.tertiaryLabel,
            marginTop: 4,
            fontVariant: ["tabular-nums"],
          }}
        >
          5h 32m
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text
          selectable
          style={{
            fontSize: 42,
            fontWeight: "700",
            color: AC.label,
            letterSpacing: -1,
          }}
        >
          JFK
        </Text>
        <Text style={{ fontSize: 13, color: AC.secondaryLabel }}>
          New York
        </Text>
      </View>
    </View>
  );
}

function FlightProgressBar() {
  const progress = 0.62;
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
      <View
        style={{
          height: 6,
          backgroundColor: String(AC.systemFill),
          borderRadius: 3,
          borderCurve: "continuous",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            backgroundColor: String(AC.systemBlue),
            borderRadius: 3,
            borderCurve: "continuous",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: AC.secondaryLabel,
            fontVariant: ["tabular-nums"],
          }}
        >
          3h 25m elapsed
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: AC.secondaryLabel,
            fontVariant: ["tabular-nums"],
          }}
        >
          2h 07m remaining
        </Text>
      </View>
    </View>
  );
}

function InfoRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: any;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>{label}</Text>
      <Text
        selectable
        style={{
          fontSize: 15,
          fontWeight: "500",
          color: valueColor ?? AC.label,
          fontVariant: ["tabular-nums"],
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: String(AC.separator),
        marginLeft: 20,
      }}
    />
  );
}

function FlightDetails() {
  return (
    <View style={{ paddingTop: 20 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: AC.secondaryLabel,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          paddingHorizontal: 20,
          paddingBottom: 8,
        }}
      >
        Flight Details
      </Text>
      <View
        style={{
          backgroundColor: String(AC.secondarySystemGroupedBackground),
          borderRadius: 12,
          borderCurve: "continuous",
          marginHorizontal: 16,
          overflow: "hidden",
        }}
      >
        <InfoRow label="Flight" value="UA 2247" />
        <Divider />
        <InfoRow label="Aircraft" value="Boeing 737 MAX 9" />
        <Divider />
        <InfoRow label="Status" value="On Time" valueColor={AC.systemGreen} />
        <Divider />
        <InfoRow label="Gate" value="B42" />
        <Divider />
        <InfoRow label="Seat" value="14A · Window" />
      </View>
    </View>
  );
}

function DepartureArrival() {
  return (
    <View style={{ paddingTop: 20 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: AC.secondaryLabel,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          paddingHorizontal: 20,
          paddingBottom: 8,
        }}
      >
        Schedule
      </Text>
      <View
        style={{
          backgroundColor: String(AC.secondarySystemGroupedBackground),
          borderRadius: 12,
          borderCurve: "continuous",
          marginHorizontal: 16,
          overflow: "hidden",
        }}
      >
        <InfoRow label="Departure" value="10:45 AM PST" />
        <Divider />
        <InfoRow label="Arrival" value="7:17 PM EST" />
        <Divider />
        <InfoRow label="Terminal" value="T2 → T4" />
        <Divider />
        <InfoRow label="Baggage" value="Carousel 7" />
      </View>
    </View>
  );
}

function LiveData() {
  return (
    <View style={{ paddingTop: 20 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: AC.secondaryLabel,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          paddingHorizontal: 20,
          paddingBottom: 8,
        }}
      >
        Live Data
      </Text>
      <View
        style={{
          backgroundColor: String(AC.secondarySystemGroupedBackground),
          borderRadius: 12,
          borderCurve: "continuous",
          marginHorizontal: 16,
          overflow: "hidden",
        }}
      >
        <InfoRow label="Altitude" value="36,000 ft" />
        <Divider />
        <InfoRow label="Speed" value="487 kts" />
        <Divider />
        <InfoRow label="Heading" value="072°" />
      </View>
    </View>
  );
}

export default function FlightInfoSheet() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader />
      <FlightHeader />
      <FlightProgressBar />
      <FlightDetails />
      <DepartureArrival />
      <LiveData />
    </ScrollView>
  );
}
