import { useEffect, useRef } from "react";
import { View, useColorScheme } from "react-native";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useFlightStore } from "@/store/flight-context";
import { getArcPoints, type Flight } from "@/data/flights";

L.Icon.Default.mergeOptions({
  imagePath: window.location.origin,
  iconUrl: (require("leaflet/dist/images/marker-icon.png") as any).uri,
  iconRetinaUrl: (require("leaflet/dist/images/marker-icon-2x.png") as any).uri,
  shadowUrl: (require("leaflet/dist/images/marker-shadow.png") as any).uri,
});

function makeDot(active: boolean) {
  const color = active ? "#00C8FF" : "rgba(255,255,255,0.7)";
  const shadow = active ? "0 0 8px rgba(0,200,255,0.8)" : "none";
  return L.divIcon({
    className: "",
    html: `<div style="width:10px;height:10px;border-radius:50%;background:${color};border:2px solid white;box-shadow:${shadow}"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });
}

export default function GlobeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<Map<string, L.Layer[]>>(new Map());
  const colorScheme = useColorScheme();
  const { visibleFlights, selectedFlightId } = useFlightStore();

  // Init map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const isDark = colorScheme === "dark";
    const map = L.map(mapRef.current, { zoomControl: false, attributionControl: false }).setView([20, -30], 2);
    L.tileLayer(
      isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    ).addTo(map);
    mapInstanceRef.current = map;
    return () => { map.remove(); mapInstanceRef.current = null; layersRef.current.clear(); };
  }, []);

  // Redraw routes when visibleFlights or selection changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old layers
    layersRef.current.forEach((layers) => layers.forEach((l) => map.removeLayer(l)));
    layersRef.current.clear();

    visibleFlights.forEach((flight) => {
      const active = selectedFlightId === null || selectedFlightId === flight.id;
      const pts = getArcPoints(flight.from, flight.to).map((p) => [p.latitude, p.longitude] as L.LatLngExpression);
      const layers: L.Layer[] = [];

      layers.push(L.polyline(pts, { color: active ? "#00C8FF" : "white", weight: active ? 14 : 6, opacity: active ? 0.22 : 0.07 }).addTo(map));
      layers.push(L.polyline(pts, { color: active ? "#00C8FF" : "white", weight: active ? 3 : 1.5, opacity: active ? 1 : 0.35 }).addTo(map));
      layers.push(L.marker([flight.from.latitude, flight.from.longitude], { icon: makeDot(active) }).addTo(map));
      layers.push(L.marker([flight.to.latitude, flight.to.longitude], { icon: makeDot(active) }).addTo(map));

      layersRef.current.set(flight.id, layers);
    });

    // Animate to selected flight
    if (selectedFlightId) {
      const f = visibleFlights.find((fl) => fl.id === selectedFlightId);
      if (f) {
        const centerLat = (f.from.latitude + f.to.latitude) / 2;
        const centerLng = (f.from.longitude + f.to.longitude) / 2;
        map.flyTo([centerLat, centerLng], 4, { duration: 1 });
      }
    } else {
      map.flyTo([20, -30], 2, { duration: 1 });
    }
  }, [visibleFlights, selectedFlightId]);

  return (
    <View style={{ flex: 1 }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }} />
    </View>
  );
}
