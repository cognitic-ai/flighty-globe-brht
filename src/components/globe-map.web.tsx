import { useEffect, useRef } from "react";
import { View, useColorScheme } from "react-native";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  imagePath: window.location.origin,
  iconUrl: (require("leaflet/dist/images/marker-icon.png") as any).uri,
  iconRetinaUrl: (require("leaflet/dist/images/marker-icon-2x.png") as any)
    .uri,
  shadowUrl: (require("leaflet/dist/images/marker-shadow.png") as any).uri,
});

const FLIGHT = {
  from: { lat: 37.6213, lng: -122.379, name: "SFO" },
  to: { lat: 40.6413, lng: -73.7781, name: "JFK" },
};

function getArcPoints(
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  numPoints = 100
): L.LatLngExpression[] {
  const points: L.LatLngExpression[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = start.lat + t * (end.lat - start.lat);
    const lng = start.lng + t * (end.lng - start.lng);
    const arc = Math.sin(t * Math.PI) * 8;
    points.push([lat + arc, lng]);
  }
  return points;
}

export default function GlobeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([20, -30], 2);

    const isDark = colorScheme === "dark";
    const tileUrl = isDark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    L.tileLayer(tileUrl).addTo(map);

    const arcPoints = getArcPoints(FLIGHT.from, FLIGHT.to);
    L.polyline(arcPoints, {
      color: "#007AFF",
      weight: 3,
      opacity: 0.8,
    }).addTo(map);

    const dotIcon = L.divIcon({
      className: "",
      html: '<div style="width:12px;height:12px;border-radius:50%;background:#007AFF;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    const dotIcon2 = L.divIcon({
      className: "",
      html: '<div style="width:12px;height:12px;border-radius:50%;background:#FF9500;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    L.marker([FLIGHT.from.lat, FLIGHT.from.lng], { icon: dotIcon }).addTo(map);
    L.marker([FLIGHT.to.lat, FLIGHT.to.lng], { icon: dotIcon2 }).addTo(map);

    // Airplane icon at midpoint
    const midpoint = arcPoints[Math.floor(arcPoints.length * 0.55)] as [
      number,
      number,
    ];
    const planeIcon = L.divIcon({
      className: "",
      html: '<div style="font-size:24px;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4))">✈️</div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    L.marker(midpoint, { icon: planeIcon }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </View>
  );
}
