/**
 * Parcours complets dans l'application, du premier écran jusqu'au bout.
 * @format
 */

import 'react-native';
import React from 'react';
import {Alert} from 'react-native';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it, expect, jest, beforeEach, afterEach} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer, {act, ReactTestRenderer} from 'react-test-renderer';

let tree: ReactTestRenderer;

const byId = (id: string) => tree.root.findByProps({testID: id});
// Le bouton "natif" (View) qui porte l'état d'accessibilité réellement affiché.
const isDisabled = (id: string) =>
  tree.root.findAll(
    node => typeof node.type === 'string' && node.props.testID === id,
  )[0].props.accessibilityState.disabled;
const press = async (id: string) => {
  await act(async () => {
    byId(id).props.onPress();
  });
};
const type = async (id: string, text: string) => {
  await act(async () => {
    byId(id).props.onChangeText(text);
  });
};
const texts = () =>
  tree.root
    .findAll(node => (node.type as unknown) === 'Text')
    .map(node => [].concat(node.props.children).join(''));

const login = async (role: 'rider' | 'driver') => {
  await press(`role-${role}`);
  await type('input-name', 'Marie Ngono');
  await type('input-phone', '6 90 12 34 56');
  await press('send-otp');
  await type('input-otp', '123456');
  await press('verify-otp');
};

beforeEach(async () => {
  jest.useFakeTimers();
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  await act(async () => {
    tree = renderer.create(<App />);
  });
});

afterEach(() => {
  act(() => tree.unmount());
  jest.useRealTimers();
  jest.restoreAllMocks();
});

it('refuse un numéro invalide', async () => {
  await type('input-name', 'Marie');
  await type('input-phone', '12345');
  await press('send-otp');
  expect(Alert.alert).toHaveBeenCalledWith(
    'Numéro invalide',
    expect.any(String),
  );
  expect(tree.root.findAllByProps({testID: 'input-otp'})).toHaveLength(0);
});

it('passager : commander une course et la suivre jusqu’au bout', async () => {
  await login('rider');
  expect(texts()).toContain('Où allez-vous ?');

  await press('pickup-yde-poste');
  await press('destination-yde-nsimalen');
  await press('vehicle-confort');
  expect(isDisabled('order')).toBe(false);
  await press('order');

  expect(byId('ride-status').props.children).toBe('Recherche d’un chauffeur…');
  await act(async () => {
    jest.advanceTimersByTime(2500);
  });
  expect(byId('ride-status').props.children).toBe('Votre chauffeur arrive');
  expect(byId('driver-card')).toBeTruthy();

  await act(async () => {
    jest.advanceTimersByTime(4000);
  });
  await act(async () => {
    jest.advanceTimersByTime(3000);
  });
  expect(byId('ride-status').props.children).toBe('Course en cours');
  expect(tree.root.findAllByProps({testID: 'cancel-ride'})).toHaveLength(0);

  await act(async () => {
    jest.advanceTimersByTime(5000);
  });
  expect(byId('ride-status').props.children).toBe('Course terminée');
});

it('passager : le bouton commander attend départ et destination', async () => {
  await login('rider');
  expect(isDisabled('order')).toBe(true);
});

it('chauffeur : soumettre un dossier valide', async () => {
  await login('driver');
  await type('input-cni', '100123456');
  await type('input-license', 'nw123456');
  await type('input-model', 'Toyota Corolla');
  await type('input-plate', 'lt123ab');
  await type('input-city', 'Douala');
  await press('submit-driver');

  const shown = texts();
  expect(shown).toContain('Dossier en cours de vérification');
  expect(shown).toContain('LT 123 AB');
  expect(shown).toContain('+237690123456');
});

it('chauffeur : un dossier incomplet est refusé', async () => {
  await login('driver');
  await press('submit-driver');
  expect(Alert.alert).toHaveBeenCalledWith(
    'Dossier incomplet',
    expect.any(String),
  );
});
