import React, { createContext, useContext, useState } from "react";
import {
  ALL_FLIGHTS,
  FLIGHTS_BY_YEAR,
  YEAR_STATS,
  type Flight,
  type YearKey,
  type YearStats,
} from "@/data/flights";

type FlightContextValue = {
  selectedYear: YearKey;
  setSelectedYear: (year: YearKey) => void;
  selectedFlightId: string | null;
  setSelectedFlightId: (id: string | null) => void;
  visibleFlights: Flight[];
  currentStats: YearStats;
  mapIs3D: boolean;
  setMapIs3D: (v: boolean) => void;
};

const FlightContext = createContext<FlightContextValue>(null!);

export function FlightProvider({ children }: { children: React.ReactNode }) {
  const [selectedYear, setSelectedYear] = useState<YearKey>("all");
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [mapIs3D, setMapIs3D] = useState(true);

  const visibleFlights =
    selectedYear === "all" ? ALL_FLIGHTS : FLIGHTS_BY_YEAR[selectedYear] ?? [];

  function handleSetYear(year: YearKey) {
    setSelectedYear(year);
    setSelectedFlightId(null);
  }

  return (
    <FlightContext.Provider
      value={{
        selectedYear,
        setSelectedYear: handleSetYear,
        selectedFlightId,
        setSelectedFlightId,
        visibleFlights,
        currentStats: YEAR_STATS[selectedYear],
        mapIs3D,
        setMapIs3D,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
}

export const useFlightStore = () => useContext(FlightContext);
