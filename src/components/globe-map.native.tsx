import { useEffect, useRef } from "react";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import { View } from "react-native";
import { useFlightStore } from "@/store/flight-context";
import { ALL_FLIGHTS, getArcPoints, getCameraForFlight, type Flight } from "@/data/flights";

const DOT = {
  width: 10,
  height: 10,
  borderRadius: 5,
  borderWidth: 2,
  borderColor: "white",
};

function FlightRoute({ flight, active }: { flight: Flight; active: boolean }) {
  const arc = getArcPoints(flight.from, flight.to);
  const glow = active ? "rgba(0, 200, 255, 0.28)" : "rgba(255,255,255,0.08)";
  const line = active ? "#00C8FF" : "rgba(255,255,255,0.45)";
  const glowWidth = active ? 14 : 8;
  const lineWidth = active ? 4 : 2;

  return (
    <>
      <Polyline coordinates={arc} strokeColor={glow} strokeWidth={glowWidth} lineDashPattern={[0]} />
      <Polyline coordinates={arc} strokeColor={line} strokeWidth={lineWidth} lineDashPattern={[0]} />
      <Marker coordinate={flight.from} anchor={{ x: 0.5, y: 0.5 }}>
        <View style={{ ...DOT, backgroundColor: line, boxShadow: active ? "0 0 6px rgba(0,200,255,0.9)" : "none" }} />
      </Marker>
      <Marker coordinate={flight.to} anchor={{ x: 0.5, y: 0.5 }}>
        <View style={{ ...DOT, backgroundColor: line, boxShadow: active ? "0 0 6px rgba(0,200,255,0.9)" : "none" }} />
      </Marker>
    </>
  );
}

const GLOBE_CAMERA = { center: { latitude: 30, longitude: -50 }, altitude: 20_000_000, pitch: 0, heading: 0 };

export default function GlobeMap() {
  const mapRef = useRef<MapView>(null);
  const { visibleFlights, selectedFlightId, mapIs3D } = useFlightStore();
  // Track the previous selectedFlightId so year changes (which reset to null) only
  // trigger a camera reset when a flight was actually selected before, not on every
  // visibleFlights change.
  const prevFlightIdRef = useRef<string | null>(undefined as any);

  useEffect(() => {
    const prev = prevFlightIdRef.current;
    prevFlightIdRef.current = selectedFlightId;

    // Skip the very first render (initial undefined → null transition)
    if (prev === undefined) return;
    if (!mapRef.current) return;

    if (selectedFlightId !== null) {
      const flight = ALL_FLIGHTS.find((f) => f.id === selectedFlightId);
      if (flight) mapRef.current.animateCamera(getCameraForFlight(flight), { duration: 900 });
    } else if (prev !== null) {
      // Only reset to globe if we actually had a selection before
      mapRef.current.animateCamera(GLOBE_CAMERA, { duration: 900 });
    }
    // prev === null && selectedFlightId === null → year tab change, no animation
  }, [selectedFlightId]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        mapType={mapIs3D ? "hybridFlyover" : "mutedStandard"}
        camera={GLOBE_CAMERA}
        rotateEnabled
        pitchEnabled
        zoomEnabled
        scrollEnabled
        showsUserLocation={false}
        showsCompass={false}
        showsScale={false}
        showsTraffic={false}
        showsBuildings={false}
        showsIndoors={false}
        showsPointsOfInterest={false}
        userInterfaceStyle="dark"
      >
        {visibleFlights.map((flight) => (
          <FlightRoute
            key={flight.id}
            flight={flight}
            active={selectedFlightId === null || selectedFlightId === flight.id}
          />
        ))}
      </MapView>
    </View>
  );
}
