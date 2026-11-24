/* eslint-env jest */
// Remplace les modules natifs par des versions de test (pas de téléphone pendant les tests).
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
