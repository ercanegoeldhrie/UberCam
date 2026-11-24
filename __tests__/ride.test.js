import {
  createRide,
  DEMO_DRIVER,
  isFinished,
  RIDE_STATUS,
  rideReducer,
} from '../src/services/ride';

const newRide = () =>
  createRide({
    pickup: {},
    destination: {},
    vehicleType: 'eco',
    price: 1500,
    distanceKm: 4,
  });

it('suit le parcours complet d’une course', () => {
  let ride = newRide();
  expect(ride.status).toBe(RIDE_STATUS.SEARCHING);
  ride = rideReducer(ride, {type: 'DRIVER_FOUND', driver: DEMO_DRIVER});
  expect(ride.status).toBe(RIDE_STATUS.DRIVER_ON_THE_WAY);
  expect(ride.driver).toBe(DEMO_DRIVER);
  ride = rideReducer(ride, {type: 'DRIVER_ARRIVED'});
  ride = rideReducer(ride, {type: 'START_TRIP'});
  expect(ride.status).toBe(RIDE_STATUS.IN_PROGRESS);
  ride = rideReducer(ride, {type: 'FINISH'});
  expect(ride.status).toBe(RIDE_STATUS.COMPLETED);
  expect(isFinished(ride)).toBe(true);
});

it('ignore une action impossible', () => {
  const ride = newRide();
  expect(rideReducer(ride, {type: 'FINISH'})).toBe(ride);
});

it('on peut annuler avant de monter, pas après', () => {
  const searching = newRide();
  expect(rideReducer(searching, {type: 'CANCEL'}).status).toBe(
    RIDE_STATUS.CANCELLED,
  );

  const inProgress = {...searching, status: RIDE_STATUS.IN_PROGRESS};
  expect(rideReducer(inProgress, {type: 'CANCEL'}).status).toBe(
    RIDE_STATUS.IN_PROGRESS,
  );
});
