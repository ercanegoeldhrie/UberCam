import {findPlace} from '../src/data/places';
import {
  estimateFare,
  formatFcfa,
  haversineKm,
  VEHICLE_TYPES,
} from '../src/services/pricing';

it('calcule une distance plausible', () => {
  // Poste centrale de Yaoundé → aéroport de Nsimalen : environ 17 km à vol d'oiseau
  const km = haversineKm(findPlace('yde-poste'), findPlace('yde-nsimalen'));
  expect(km).toBeGreaterThan(15);
  expect(km).toBeLessThan(20);
});

it('applique le minimum sur une petite course', () => {
  const a = findPlace('yde-melen');
  const b = findPlace('yde-ngoa');
  expect(estimateFare(a, b, 'eco').price).toBe(1000);
  // ~1,7 km par la route : 200 + 100 × 1,7 = 370 FCFA, arrondi à 400 (au-dessus du minimum de 300)
  expect(estimateFare(a, b, 'moto').price).toBe(400);
});

it('les prix sont arrondis à 50 FCFA et croissants par catégorie', () => {
  const a = findPlace('dla-akwa');
  const b = findPlace('dla-aeroport');
  const prices = VEHICLE_TYPES.map(t => estimateFare(a, b, t.id).price);
  prices.forEach(p => expect(p % 50).toBe(0));
  expect(prices).toEqual([...prices].sort((x, y) => x - y));
});

it('refuse une catégorie inconnue', () => {
  expect(() =>
    estimateFare(findPlace('dla-akwa'), findPlace('dla-deido'), 'avion'),
  ).toThrow();
});

it('formate les montants', () => {
  expect(formatFcfa(12500)).toBe('12 500 FCFA');
  expect(formatFcfa(300)).toBe('300 FCFA');
});
