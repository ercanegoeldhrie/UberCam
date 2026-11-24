// Estimation du prix d'une course, en francs CFA.

// Les catégories de véhicules proposées au passager. Les tarifs sont des valeurs de départ
// à ajuster selon le marché : prise en charge + prix par km, avec un minimum.
export const VEHICLE_TYPES = [
  {
    id: 'moto',
    label: 'Moto',
    description: '1 passager, le plus rapide',
    baseFare: 200,
    perKm: 100,
    minimum: 300,
  },
  {
    id: 'eco',
    label: 'Éco',
    description: "Jusqu'à 4 passagers",
    baseFare: 500,
    perKm: 250,
    minimum: 1000,
  },
  {
    id: 'confort',
    label: 'Confort',
    description: 'Véhicule climatisé',
    baseFare: 1000,
    perKm: 400,
    minimum: 2000,
  },
];

// Distance "à vol d'oiseau" entre deux points GPS (formule de haversine), en km.
export function haversineKm(a, b) {
  const R = 6371;
  const toRad = deg => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// La route est plus longue que la ligne droite : on applique un coefficient de détour.
export const ROAD_FACTOR = 1.3;

// Les prix sont arrondis aux 50 FCFA supérieurs (pas de petite monnaie).
const roundUp50 = amount => Math.ceil(amount / 50) * 50;

export function estimateFare(pickup, destination, vehicleTypeId) {
  const type = VEHICLE_TYPES.find(t => t.id === vehicleTypeId);
  if (!type) {
    throw new Error(`Catégorie inconnue : ${vehicleTypeId}`);
  }
  const distanceKm = haversineKm(pickup, destination) * ROAD_FACTOR;
  const amount = Math.max(
    type.minimum,
    type.baseFare + type.perKm * distanceKm,
  );
  return {
    distanceKm: Math.round(distanceKm * 10) / 10,
    price: roundUp50(amount),
  };
}

export function formatFcfa(amount) {
  return `${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
}
