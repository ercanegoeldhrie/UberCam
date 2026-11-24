// Le cycle de vie d'une course, sous forme de "machine à états".
// Chaque action fait passer la course d'un état à un autre ; une action impossible
// (ex : terminer une course qui n'a pas commencé) est simplement ignorée.
//
//   SEARCHING ──DRIVER_FOUND──▶ DRIVER_ON_THE_WAY ──DRIVER_ARRIVED──▶ DRIVER_ARRIVED
//        │                            │                                   │
//        └────────── CANCEL ──────────┴──────────── CANCEL ───────────────┤
//                                                                    START_TRIP
//                                                                         ▼
//                                              COMPLETED ◀──FINISH── IN_PROGRESS

export const RIDE_STATUS = {
  SEARCHING: 'SEARCHING',
  DRIVER_ON_THE_WAY: 'DRIVER_ON_THE_WAY',
  DRIVER_ARRIVED: 'DRIVER_ARRIVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const STATUS_LABELS = {
  SEARCHING: 'Recherche d’un chauffeur…',
  DRIVER_ON_THE_WAY: 'Votre chauffeur arrive',
  DRIVER_ARRIVED: 'Votre chauffeur est arrivé',
  IN_PROGRESS: 'Course en cours',
  COMPLETED: 'Course terminée',
  CANCELLED: 'Course annulée',
};

const TRANSITIONS = {
  DRIVER_FOUND: {from: ['SEARCHING'], to: 'DRIVER_ON_THE_WAY'},
  DRIVER_ARRIVED: {from: ['DRIVER_ON_THE_WAY'], to: 'DRIVER_ARRIVED'},
  START_TRIP: {from: ['DRIVER_ARRIVED'], to: 'IN_PROGRESS'},
  FINISH: {from: ['IN_PROGRESS'], to: 'COMPLETED'},
  // On ne peut plus annuler une fois dans la voiture.
  CANCEL: {
    from: ['SEARCHING', 'DRIVER_ON_THE_WAY', 'DRIVER_ARRIVED'],
    to: 'CANCELLED',
  },
};

export function createRide({
  pickup,
  destination,
  vehicleType,
  price,
  distanceKm,
}) {
  return {
    status: RIDE_STATUS.SEARCHING,
    pickup,
    destination,
    vehicleType,
    price,
    distanceKm,
    driver: null,
  };
}

export function rideReducer(ride, action) {
  const transition = TRANSITIONS[action.type];
  if (!transition || !transition.from.includes(ride.status)) {
    return ride;
  }
  const next = {...ride, status: transition.to};
  if (action.type === 'DRIVER_FOUND') {
    next.driver = action.driver;
  }
  return next;
}

export function isFinished(ride) {
  return (
    ride.status === RIDE_STATUS.COMPLETED ||
    ride.status === RIDE_STATUS.CANCELLED
  );
}

// --- Simulation (mode démo) ------------------------------------------------
// Tant qu'il n'y a pas de serveur pour mettre en relation passagers et chauffeurs,
// on simule la suite des événements. Les délais sont courts pour la démonstration.
export const DEMO_DRIVER = {
  name: 'Jean-Pierre M.',
  rating: 4.8,
  vehicle: 'Toyota Corolla grise',
  plate: 'LT 482 AB',
  phone: '+237690000000',
};

export const DEMO_STEPS = [
  {delayMs: 2500, action: {type: 'DRIVER_FOUND', driver: DEMO_DRIVER}},
  {delayMs: 4000, action: {type: 'DRIVER_ARRIVED'}},
  {delayMs: 3000, action: {type: 'START_TRIP'}},
  {delayMs: 5000, action: {type: 'FINISH'}},
];
