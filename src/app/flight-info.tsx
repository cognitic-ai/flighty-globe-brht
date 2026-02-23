import { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Share,
  useColorScheme,
} from "react-native";
import { Image } from "expo-image";
import * as AC from "@bacons/apple-colors";
import { NumberFlow } from "number-flow-react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { SFSymbol } from "@/components/sf-symbol";
import { useFlightStore } from "@/store/flight-context";
import { type Flight, type YearKey } from "@/data/flights";

const PROFILE_IMAGE = "https://github.com/evanbacon.png";
const YEARS: YearKey[] = ["all", 2025, 2024, 2023, 2022, 2021];

// ─── Profile Header ──────────────────────────────────────────────────────────

function ProfileHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 18,
        paddingBottom: 12,
        gap: 12,
      }}
    >
      <Image
        source={{ uri: PROFILE_IMAGE }}
        style={{ width: 52, height: 52, borderRadius: 26, borderCurve: "continuous" }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: AC.label }}>
          Evan Bacon
        </Text>
        <Text style={{ fontSize: 13, color: AC.secondaryLabel }}>
          My Flight Log
        </Text>
      </View>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: AC.tertiarySystemFill as any,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SFSymbol source="sf:xmark" style={{ width: 12, height: 12, tintColor: AC.secondaryLabel }} />
      </View>
    </View>
  );
}

// ─── Action Buttons ───────────────────────────────────────────────────────────

function ActionPill({ icon, label }: { icon: string; label: string }) {
  const inner = (
    <View
      style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 9 }}
    >
      <SFSymbol source={icon} style={{ width: 14, height: 14, tintColor: AC.label }} />
      <Text style={{ fontSize: 14, fontWeight: "600", color: AC.label }}>{label}</Text>
    </View>
  );

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView isInteractive style={{ borderRadius: 20, overflow: "hidden" }}>
        {inner}
      </GlassView>
    );
  }
  return (
    <Pressable
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 20,
        borderCurve: "continuous",
        backgroundColor: pressed
          ? AC.quaternarySystemFill as any
          : AC.tertiarySystemFill as any,
      })}
    >
      {inner}
    </Pressable>
  );
}

function ActionButtons() {
  return (
    <View style={{ flexDirection: "row", gap: 8, paddingHorizontal: 16, paddingBottom: 14 }}>
      <ActionPill icon="sf:person.2" label="Flighty Friends" />
      <ActionPill icon="sf:gearshape" label="Settings" />
    </View>
  );
}

// ─── Year Selector ────────────────────────────────────────────────────────────

function YearSelector() {
  const { selectedYear, setSelectedYear } = useFlightStore();
  const scrollRef = useRef<ScrollView>(null);
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 6, paddingHorizontal: 16, paddingBottom: 16 }}
    >
      {YEARS.map((year) => {
        const active = selectedYear === year;
        return (
          <Pressable
            key={String(year)}
            onPress={() => setSelectedYear(year)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 7,
              borderRadius: 20,
              borderCurve: "continuous",
              backgroundColor: active
                ? isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)"
                : isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)",
              boxShadow: active ? "0 2px 8px rgba(0,0,0,0.22)" : undefined,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: active ? "800" : "500",
                letterSpacing: active ? 0.2 : 0,
                color: active
                  ? isDark ? "#000" : "#fff"
                  : AC.secondaryLabel as any,
              }}
            >
              {year === "all" ? "ALL-TIME" : String(year)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// ─── Passport Card ────────────────────────────────────────────────────────────

function PassportCard() {
  const { selectedYear, currentStats } = useFlightStore();
  const yearLabel = selectedYear === "all" ? "All-Time" : String(selectedYear);
  const title = selectedYear === "all" ? "ALL-TIME FLIGHTY PASSPORT" : `${selectedYear} FLIGHTY PASSPORT`;

  const handleShare = () => {
    Share.share({
      message: `My ${yearLabel} Flighty Passport:\n✈️ ${currentStats.flights} flights\n🗺️ ${currentStats.miles.toLocaleString()} miles flown\n⏱️ ${currentStats.flightTimeDays}d ${currentStats.flightTimeHours}h in the air\n🛫 ${currentStats.airports} airports, ${currentStats.airlines} airlines`,
      title: `My ${yearLabel} Flighty Passport`,
    });
  };

  return (
    <View
      style={{
        marginHorizontal: 12,
        borderRadius: 16,
        borderCurve: "continuous",
        overflow: "hidden",
        experimental_backgroundImage: "linear-gradient(160deg, #0f1542 0%, #1e2d8a 45%, #122370 100%)",
        padding: 18,
        gap: 16,
      }}
    >
      {/* Card title */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ gap: 3 }}>
          <Text style={{ fontSize: 13, fontWeight: "700", color: "white", letterSpacing: 0.4 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>
            🛂 PASSPORT · PASS · PASAPORTE
          </Text>
        </View>
        <Pressable onPress={handleShare} hitSlop={8}>
          <SFSymbol source="sf:square.and.arrow.up" style={{ width: 16, height: 16, tintColor: "rgba(255,255,255,0.6)" }} />
        </Pressable>
      </View>

      {/* Big stats row */}
      <View style={{ flexDirection: "row", gap: 24 }}>
        <View style={{ gap: 3 }}>
          <Text style={{ fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.55)", letterSpacing: 0.5 }}>
            FLIGHTS
          </Text>
          <NumberFlow
            value={currentStats.flights}
            style={{ fontSize: 38, fontWeight: "700", color: "white" }}
          />
          <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            {Math.round(currentStats.flights * 0.29)} Long Haul
          </Text>
        </View>
        <View style={{ gap: 3, flex: 1 }}>
          <Text style={{ fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.55)", letterSpacing: 0.5 }}>
            DISTANCE
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline", gap: 3 }}>
            <NumberFlow
              value={currentStats.miles}
              format={{ useGrouping: true }}
              style={{ fontSize: 38, fontWeight: "700", color: "white" }}
            />
            <Text style={{ fontSize: 22, fontWeight: "700", color: "white" }}> mi</Text>
          </View>
          <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            {(currentStats.miles / 24901).toFixed(1)}× around the world
          </Text>
        </View>
      </View>

      {/* Small stats row */}
      <View style={{ flexDirection: "row", gap: 20 }}>
        {[
          { label: "FLIGHT TIME", value: `${currentStats.flightTimeDays}d ${currentStats.flightTimeHours}h` },
          { label: "AIRPORTS", value: currentStats.airports },
          { label: "AIRLINES", value: currentStats.airlines },
        ].map(({ label, value }) => (
          <View key={label} style={{ gap: 3 }}>
            <Text style={{ fontSize: 10, fontWeight: "600", color: "rgba(255,255,255,0.55)", letterSpacing: 0.4 }}>
              {label}
            </Text>
            {typeof value === "number" ? (
              <NumberFlow value={value} style={{ fontSize: 22, fontWeight: "700", color: "white" }} />
            ) : (
              <Text style={{ fontSize: 22, fontWeight: "700", color: "white" }}>{value}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Stats button */}
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.12)",
          borderRadius: 10,
          borderCurve: "continuous",
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        })}
      >
        <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>All Flight Stats</Text>
        <SFSymbol source="sf:chevron.right" style={{ width: 12, height: 14, tintColor: "rgba(255,255,255,0.6)" }} />
      </Pressable>
    </View>
  );
}

// ─── Delays Card ──────────────────────────────────────────────────────────────

function DelaysCard() {
  const { currentStats } = useFlightStore();

  const handleShare = () => {
    Share.share({
      message: `I've lost ${currentStats.hoursLost} hours to flight delays. Thanks airlines! ✈️😅`,
    });
  };

  return (
    <View
      style={{
        marginHorizontal: 12,
        marginTop: 10,
        borderRadius: 16,
        borderCurve: "continuous",
        overflow: "hidden",
        experimental_backgroundImage: "linear-gradient(150deg, #6b0f0f 0%, #a01515 100%)",
        padding: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <View style={{ gap: 4 }}>
        <NumberFlow
          value={currentStats.hoursLost}
          style={{ fontSize: 52, fontWeight: "800", color: "white", letterSpacing: -1 }}
        />
        <Text style={{ fontSize: 14, fontWeight: "600", color: "rgba(255,255,255,0.8)" }}>
          hours lost from delays
        </Text>
      </View>
      <Pressable onPress={handleShare} hitSlop={8}>
        <SFSymbol source="sf:square.and.arrow.up" style={{ width: 16, height: 16, tintColor: "rgba(255,255,255,0.5)", marginBottom: 4 }} />
      </Pressable>
    </View>
  );
}

// ─── Flight Row ───────────────────────────────────────────────────────────────

function FlightRow({ flight }: { flight: Flight }) {
  const { selectedFlightId, setSelectedFlightId } = useFlightStore();
  const isSelected = selectedFlightId === flight.id;
  const durationH = Math.floor(flight.durationMin / 60);
  const durationM = flight.durationMin % 60;

  return (
    <Pressable
      onPress={() => setSelectedFlightId(isSelected ? null : flight.id)}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: pressed
          ? AC.tertiarySystemFill as any
          : isSelected
          ? "rgba(0, 122, 255, 0.08)"
          : "transparent",
        borderLeftWidth: isSelected ? 3 : 0,
        borderLeftColor: "#00C8FF",
      })}
    >
      <View style={{ flex: 1, gap: 3 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: AC.label }}>
            {flight.from.code}
          </Text>
          <SFSymbol source="sf:arrow.right" style={{ width: 10, height: 10, tintColor: AC.tertiaryLabel }} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: AC.label }}>
            {flight.to.code}
          </Text>
          {isSelected && (
            <View style={{ backgroundColor: "#00C8FF", borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={{ fontSize: 10, fontWeight: "700", color: "#000" }}>ACTIVE</Text>
            </View>
          )}
        </View>
        <Text style={{ fontSize: 12, color: AC.secondaryLabel }}>
          {flight.airline} · {flight.date}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", gap: 3 }}>
        <Text style={{ fontSize: 14, fontWeight: "600", color: isSelected ? "#00C8FF" : AC.label as any, fontVariant: ["tabular-nums"] }}>
          {flight.miles.toLocaleString()} mi
        </Text>
        <Text style={{ fontSize: 12, color: AC.secondaryLabel, fontVariant: ["tabular-nums"] }}>
          {durationH}h {durationM}m
        </Text>
      </View>
    </Pressable>
  );
}

// ─── Flight List ──────────────────────────────────────────────────────────────

function Divider() {
  return (
    <View style={{ height: 0.5, backgroundColor: AC.separator as any, marginLeft: 16 }} />
  );
}

function FlightList() {
  const { visibleFlights } = useFlightStore();

  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: AC.secondaryLabel,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          paddingHorizontal: 16,
          paddingBottom: 6,
        }}
      >
        Flights
      </Text>
      {/* Regular View owns the PlatformColor background — Animated.View cannot resolve PlatformColor */}
      <View
        style={{
          backgroundColor: AC.secondarySystemGroupedBackground as any,
          borderRadius: 12,
          borderCurve: "continuous" as any,
          marginHorizontal: 12,
          overflow: "hidden",
        }}
      >
        {visibleFlights.map((flight, i) => (
          <Animated.View
            key={flight.id}
            entering={FadeInDown.duration(280).delay(i * 45)}
            exiting={FadeOutUp.duration(180)}
            layout={LinearTransition}
          >
            {i > 0 && <Divider />}
            <FlightRow flight={flight} />
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

// ─── Main Sheet ───────────────────────────────────────────────────────────────

export default function FlightInfoSheet() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 48 }}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader />
      <ActionButtons />
      <YearSelector />
      <PassportCard />
      <DelaysCard />
      <FlightList />
    </ScrollView>
  );
}
