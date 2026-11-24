// Lieux connus, avec des coordonnées APPROXIMATIVES (latitude, longitude).
// C'est une solution provisoire pour estimer les prix sans carte : quand la clé Google Maps
// sera configurée, ces listes seront remplacées par la recherche d'adresses et le GPS.
export const CITIES = {
  Yaoundé: [
    {id: 'yde-poste', name: 'Poste centrale', lat: 3.8667, lng: 11.5167},
    {id: 'yde-bastos', name: 'Bastos', lat: 3.8935, lng: 11.5095},
    {id: 'yde-mokolo', name: 'Marché Mokolo', lat: 3.8745, lng: 11.4977},
    {id: 'yde-melen', name: 'Melen', lat: 3.8603, lng: 11.4889},
    {
      id: 'yde-ngoa',
      name: 'Ngoa-Ekellé (Université)',
      lat: 3.8578,
      lng: 11.4997,
    },
    {id: 'yde-essos', name: 'Essos', lat: 3.8719, lng: 11.5367},
    {id: 'yde-biyem', name: 'Biyem-Assi', lat: 3.8335, lng: 11.4855},
    {id: 'yde-omnisport', name: 'Omnisport', lat: 3.8855, lng: 11.5418},
    {id: 'yde-mvan', name: 'Mvan', lat: 3.8165, lng: 11.5205},
    {
      id: 'yde-nsimalen',
      name: 'Aéroport de Nsimalen',
      lat: 3.7225,
      lng: 11.5533,
    },
  ],
  Douala: [
    {id: 'dla-akwa', name: 'Akwa', lat: 4.0511, lng: 9.7008},
    {id: 'dla-bonanjo', name: 'Bonanjo', lat: 4.0417, lng: 9.6917},
    {id: 'dla-bonapriso', name: 'Bonapriso', lat: 4.0289, lng: 9.7006},
    {id: 'dla-deido', name: 'Deïdo', lat: 4.0636, lng: 9.7097},
    {id: 'dla-ndokoti', name: 'Ndokoti', lat: 4.0445, lng: 9.7356},
    {id: 'dla-makepe', name: 'Makepe', lat: 4.0789, lng: 9.7578},
    {id: 'dla-bonamoussadi', name: 'Bonamoussadi', lat: 4.0922, lng: 9.7411},
    {id: 'dla-aeroport', name: 'Aéroport de Douala', lat: 4.0061, lng: 9.7195},
  ],
};

export function findPlace(id) {
  for (const places of Object.values(CITIES)) {
    const place = places.find(p => p.id === id);
    if (place) {
      return place;
    }
  }
  return null;
}
