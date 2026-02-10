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
    const arc = Math.sin(t * Math.PI) * 8;
    points.push({ latitude: lat + arc, longitude: lng });
  }
  return points;
}

const arcPoints = getArcPoints(FLIGHT.from, FLIGHT.to);

export default function GlobeMap() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        mapType="mutedStandard"
        camera={{
          center: { latitude: 30, longitude: -50 },
          pitch: 0,
          heading: 0,
          altitude: 20000000,
          zoom: 1,
        }}
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
