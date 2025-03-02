export const polylinesCurve = {
  "Port of Gothenburg": 20,
  "Port of Amsterdam": 22,
  "Port of Hamburg": 22,
  "Port of Rotterdam": 20,
  "Port of Antwerp": 18,
  "DB World Jebbal Ali": 5,
  "Hamad Port": 8,
  "Jeddah Port": 20,
  "Port of New Jersy & New York": 40,
  "Port of Savannah": 40,
  "Port of Miami": 40,
  "Port of Harcourt": 25,
  "Port of Cape Town": 40,
  "Busan Port": 25,
  "Shanghai Port": 20,
  "Port of Singapore": 15,
  "Los Angeles Port": 55,
  "Long Beach Port": 40,
};

export function createCurvePath(
  start: google.maps.LatLngLiteral,
  end: google.maps.LatLngLiteral,
  curveFactor: number
) {
  const controlPoint = {
    lat: (start.lat + end.lat) / 2 + curveFactor,
    lng: (start.lng + end.lng) / 2,
  };

  const steps = 20; // smooth curve
  const path: google.maps.LatLngLiteral[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat =
      (1 - t) * (1 - t) * start.lat +
      2 * (1 - t) * t * controlPoint.lat +
      t * t * end.lat;
    const lng =
      (1 - t) * (1 - t) * start.lng +
      2 * (1 - t) * t * controlPoint.lng +
      t * t * end.lng;

    path.push({ lat, lng });
  }

  return path;
}
