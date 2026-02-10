import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import { View } from "react-native";
import * as AC from "@bacons/apple-colors";

const FLIGHT = {
  from: { latitude: 37.6213, longitude: -122.379, name: "SFO" },
  to: { latitude: 40.6413, longitude: -73.7781, name: "JFK" },
};

function getArcPoints(
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
  numPoints = 100
) {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = start.latitude + t * (end.latitude - start.latitude);
    const lng = start.longitude + t * (end.longitude - start.longitude);
    // Add arc curvature
    const arc = Math.sin(t * Math.PI) * 8;
    points.push({ latitude: lat + arc, longitude: lng });
  }
  return points;
}

const arcPoints = getArcPoints(FLIGHT.from, FLIGHT.to);

// Position for the airplane (midpoint of arc)
const planePosition = arcPoints[Math.floor(arcPoints.length * 0.55)];

export default function GlobeMap() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        mapType="mutedStandard"
        initialRegion={{
          latitude: 39.5,
          longitude: -98.0,
          latitudeDelta: 60,
          longitudeDelta: 60,
        }}
        rotateEnabled={false}
        pitchEnabled={false}
        showsUserLocation={false}
        showsCompass={false}
        showsScale={false}
        showsTraffic={false}
        showsBuildings={false}
        showsIndoors={false}
        showsPointsOfInterest={false}
        userInterfaceStyle="dark"
      >
        <Polyline
          coordinates={arcPoints}
          strokeColor={String(AC.systemBlue)}
          strokeWidth={3}
          lineDashPattern={[0]}
        />
        <Marker
          coordinate={FLIGHT.from}
          title="SFO"
          pinColor={String(AC.systemBlue)}
        />
        <Marker
          coordinate={FLIGHT.to}
          title="JFK"
          pinColor={String(AC.systemOrange)}
        />
      </MapView>
    </View>
  );
}
