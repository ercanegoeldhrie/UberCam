import {
  isValidCni,
  isValidOtp,
  normalizeCameroonPhone,
  normalizePlate,
  validateDriverApplication,
} from '../src/utils/validation';

describe('numéro de téléphone camerounais', () => {
  it.each([
    ['690123456', '+237690123456'],
    ['6 90 12 34 56', '+237690123456'],
    ['+237 677 12 34 56', '+237677123456'],
    ['00237655123456', '+237655123456'],
  ])('%s devient %s', (input, expected) => {
    expect(normalizeCameroonPhone(input)).toBe(expected);
  });

  it.each(['', '222123456', '69012345', '6901234567', 'abc'])(
    '%s est refusé',
    input => {
      expect(normalizeCameroonPhone(input)).toBeNull();
    },
  );
});

it('le code de validation fait 6 chiffres', () => {
  expect(isValidOtp('123456')).toBe(true);
  expect(isValidOtp('1234')).toBe(false);
  expect(isValidOtp('12345a')).toBe(false);
});

it('normalise les immatriculations', () => {
  expect(normalizePlate('lt123ab')).toBe('LT 123 AB');
  expect(normalizePlate('CE-4567-XY')).toBe('CE 4567 XY');
  expect(normalizePlate('LT 12 AB')).toBeNull();
});

it('vérifie la CNI', () => {
  expect(isValidCni('100123456')).toBe(true);
  expect(isValidCni('12345')).toBe(false);
});

it('liste les erreurs du dossier chauffeur', () => {
  const ok = {
    cniNumber: '100123456',
    licenseNumber: 'NW123456',
    vehicleModel: 'Toyota Corolla',
    vehiclePlate: 'LT 123 AB',
    city: 'Yaoundé',
  };
  expect(validateDriverApplication(ok)).toEqual([]);
  expect(validateDriverApplication({...ok, vehiclePlate: 'XYZ'})).toHaveLength(
    1,
  );
  expect(validateDriverApplication({})).toHaveLength(5);
});
