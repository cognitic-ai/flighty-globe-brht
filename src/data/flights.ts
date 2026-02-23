export type Airport = {
  code: string;
  city: string;
  latitude: number;
  longitude: number;
};

export type Flight = {
  id: string;
  from: Airport;
  to: Airport;
  airline: string;
  flightNumber: string;
  date: string;
  durationMin: number;
  miles: number;
  year: number;
};

export type YearStats = {
  flights: number;
  miles: number;
  airports: number;
  airlines: number;
  hoursLost: number;
  flightTimeDays: number;
  flightTimeHours: number;
};

export type YearKey = "all" | 2025 | 2024 | 2023 | 2022 | 2021;

export const AIRPORTS: Record<string, Airport> = {
  SFO: { code: "SFO", city: "San Francisco", latitude: 37.6213, longitude: -122.379 },
  LAX: { code: "LAX", city: "Los Angeles", latitude: 33.9425, longitude: -118.408 },
  JFK: { code: "JFK", city: "New York", latitude: 40.6413, longitude: -73.7781 },
  ORD: { code: "ORD", city: "Chicago", latitude: 41.9742, longitude: -87.9073 },
  DFW: { code: "DFW", city: "Dallas", latitude: 32.8998, longitude: -97.0403 },
  IAH: { code: "IAH", city: "Houston", latitude: 29.9902, longitude: -95.3368 },
  DEN: { code: "DEN", city: "Denver", latitude: 39.8561, longitude: -104.6737 },
  SEA: { code: "SEA", city: "Seattle", latitude: 47.4502, longitude: -122.3088 },
  YVR: { code: "YVR", city: "Vancouver", latitude: 49.1967, longitude: -123.1815 },
  MIA: { code: "MIA", city: "Miami", latitude: 25.7959, longitude: -80.287 },
  LHR: { code: "LHR", city: "London", latitude: 51.477, longitude: -0.461 },
  CDG: { code: "CDG", city: "Paris", latitude: 49.0097, longitude: 2.5479 },
  NRT: { code: "NRT", city: "Tokyo", latitude: 35.7647, longitude: 140.3864 },
  IAD: { code: "IAD", city: "Washington DC", latitude: 38.9531, longitude: -77.4565 },
  MEX: { code: "MEX", city: "Mexico City", latitude: 19.4363, longitude: -99.0721 },
  YYZ: { code: "YYZ", city: "Toronto", latitude: 43.6777, longitude: -79.6248 },
};

export const ALL_FLIGHTS: Flight[] = [
  // 2025
  { id: "ua2247", from: AIRPORTS.SFO, to: AIRPORTS.JFK, airline: "United", flightNumber: "UA 2247", date: "Feb 12, 2025", durationMin: 332, miles: 2586, year: 2025 },
  { id: "aa234", from: AIRPORTS.LAX, to: AIRPORTS.ORD, airline: "American", flightNumber: "AA 234", date: "Jan 18, 2025", durationMin: 238, miles: 1745, year: 2025 },
  { id: "ba284", from: AIRPORTS.SFO, to: AIRPORTS.LHR, airline: "British Airways", flightNumber: "BA 284", date: "Mar 5, 2025", durationMin: 620, miles: 5357, year: 2025 },
  // 2024
  { id: "ua838", from: AIRPORTS.SFO, to: AIRPORTS.NRT, airline: "United", flightNumber: "UA 838", date: "Nov 14, 2024", durationMin: 640, miles: 5150, year: 2024 },
  { id: "af007", from: AIRPORTS.JFK, to: AIRPORTS.CDG, airline: "Air France", flightNumber: "AF 007", date: "Sep 2, 2024", durationMin: 450, miles: 3636, year: 2024 },
  { id: "aa1234", from: AIRPORTS.LAX, to: AIRPORTS.DFW, airline: "American", flightNumber: "AA 1234", date: "Jul 22, 2024", durationMin: 195, miles: 1242, year: 2024 },
  { id: "ac506", from: AIRPORTS.SFO, to: AIRPORTS.YVR, airline: "Air Canada", flightNumber: "AC 506", date: "May 8, 2024", durationMin: 135, miles: 808, year: 2024 },
  // 2023
  { id: "aa2321", from: AIRPORTS.SFO, to: AIRPORTS.MIA, airline: "American", flightNumber: "AA 2321", date: "Dec 19, 2023", durationMin: 385, miles: 2594, year: 2023 },
  { id: "ba296", from: AIRPORTS.ORD, to: AIRPORTS.LHR, airline: "British Airways", flightNumber: "BA 296", date: "Aug 11, 2023", durationMin: 510, miles: 3946, year: 2023 },
  { id: "ua876", from: AIRPORTS.SFO, to: AIRPORTS.IAD, airline: "United", flightNumber: "UA 876", date: "Apr 30, 2023", durationMin: 330, miles: 2438, year: 2023 },
  // 2022
  { id: "dl456", from: AIRPORTS.LAX, to: AIRPORTS.JFK, airline: "Delta", flightNumber: "DL 456", date: "Oct 5, 2022", durationMin: 320, miles: 2469, year: 2022 },
  { id: "am204", from: AIRPORTS.SFO, to: AIRPORTS.MEX, airline: "Aeromexico", flightNumber: "AM 204", date: "Jun 14, 2022", durationMin: 280, miles: 1889, year: 2022 },
  { id: "ua789", from: AIRPORTS.SFO, to: AIRPORTS.DEN, airline: "United", flightNumber: "UA 789", date: "Feb 28, 2022", durationMin: 165, miles: 967, year: 2022 },
  // 2021
  { id: "as456", from: AIRPORTS.LAX, to: AIRPORTS.SEA, airline: "Alaska", flightNumber: "AS 456", date: "Nov 20, 2021", durationMin: 155, miles: 954, year: 2021 },
  { id: "ua123", from: AIRPORTS.SFO, to: AIRPORTS.IAH, airline: "United", flightNumber: "UA 123", date: "Jul 4, 2021", durationMin: 255, miles: 1635, year: 2021 },
  { id: "ac234", from: AIRPORTS.LAX, to: AIRPORTS.YVR, airline: "Air Canada", flightNumber: "AC 234", date: "Mar 15, 2021", durationMin: 175, miles: 1086, year: 2021 },
];

export const FLIGHTS_BY_YEAR: Record<number, Flight[]> = {
  2025: ALL_FLIGHTS.filter((f) => f.year === 2025),
  2024: ALL_FLIGHTS.filter((f) => f.year === 2024),
  2023: ALL_FLIGHTS.filter((f) => f.year === 2023),
  2022: ALL_FLIGHTS.filter((f) => f.year === 2022),
  2021: ALL_FLIGHTS.filter((f) => f.year === 2021),
};

export const YEAR_STATS: Record<YearKey, YearStats> = {
  all:  { flights: 124, miles: 269839, airports: 34, airlines: 12, hoursLost: 31, flightTimeDays: 24, flightTimeHours: 13 },
  2025: { flights: 18,  miles: 42580,  airports: 8,  airlines: 4,  hoursLost: 3,  flightTimeDays: 3,  flightTimeHours: 14 },
  2024: { flights: 32,  miles: 68200,  airports: 12, airlines: 7,  hoursLost: 8,  flightTimeDays: 5,  flightTimeHours: 22 },
  2023: { flights: 28,  miles: 54100,  airports: 10, airlines: 5,  hoursLost: 11, flightTimeDays: 4,  flightTimeHours: 18 },
  2022: { flights: 24,  miles: 52920,  airports: 8,  airlines: 4,  hoursLost: 6,  flightTimeDays: 4,  flightTimeHours: 9 },
  2021: { flights: 22,  miles: 52039,  airports: 8,  airlines: 4,  hoursLost: 3,  flightTimeDays: 5,  flightTimeHours: 6 },
};

export function getArcPoints(
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
  numPoints = 80
): { latitude: number; longitude: number }[] {
  const points = [];
  const arc = Math.min(Math.abs(end.longitude - start.longitude) / 6, 12);
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = start.latitude + t * (end.latitude - start.latitude);
    const lng = start.longitude + t * (end.longitude - start.longitude);
    points.push({ latitude: lat + Math.sin(t * Math.PI) * arc, longitude: lng });
  }
  return points;
}

export function getCameraForFlight(flight: Flight) {
  const { from, to } = flight;
  const centerLat = (from.latitude + to.latitude) / 2;
  const centerLng = (from.longitude + to.longitude) / 2;
  const altitude = Math.max(flight.miles * 2200, 3_000_000);
  return { center: { latitude: centerLat, longitude: centerLng }, altitude, pitch: 0, heading: 0 };
}
