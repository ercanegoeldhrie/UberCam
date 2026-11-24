import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Chip, colors} from '../../components/ui';
import {CITIES} from '../../data/places';
import {estimateFare, formatFcfa, VEHICLE_TYPES} from '../../services/pricing';
import {createRide} from '../../services/ride';

// Écran principal du passager : choisir le départ, la destination et le type de véhicule.
// Sans carte pour l'instant : on choisit parmi des lieux connus (voir src/data/places.js).
export default function RiderHomeScreen({navigation, route}) {
  const user = route?.params?.user;
  const cityNames = Object.keys(CITIES);
  const [city, setCity] = useState(cityNames[0]);
  const [pickupId, setPickupId] = useState(null);
  const [destinationId, setDestinationId] = useState(null);
  const [vehicleType, setVehicleType] = useState('eco');

  const places = CITIES[city];
  const pickup = places.find(p => p.id === pickupId);
  const destination = places.find(p => p.id === destinationId);
  const ready = pickup && destination && pickup.id !== destination.id;

  const estimates = useMemo(
    () =>
      ready
        ? Object.fromEntries(
            VEHICLE_TYPES.map(t => [
              t.id,
              estimateFare(pickup, destination, t.id),
            ]),
          )
        : {},
    [ready, pickup, destination],
  );

  const changeCity = name => {
    setCity(name);
    setPickupId(null);
    setDestinationId(null);
  };

  const order = () => {
    const {price, distanceKm} = estimates[vehicleType];
    const ride = createRide({
      pickup,
      destination,
      vehicleType,
      price,
      distanceKm,
    });
    navigation.navigate('RideTracking', {ride});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hello}>
          Bonjour{user ? ` ${user.name.split(' ')[0]}` : ''} 👋
        </Text>
        <Text style={styles.title}>Où allez-vous ?</Text>

        <Text style={styles.section}>Ville</Text>
        <View style={styles.wrap}>
          {cityNames.map(name => (
            <Chip
              key={name}
              label={name}
              selected={city === name}
              onPress={() => changeCity(name)}
            />
          ))}
        </View>

        <Text style={styles.section}>📍 Départ</Text>
        <View style={styles.wrap}>
          {places.map(p => (
            <Chip
              key={p.id}
              testID={`pickup-${p.id}`}
              label={p.name}
              selected={pickupId === p.id}
              onPress={() => setPickupId(p.id)}
            />
          ))}
        </View>

        <Text style={styles.section}>🏁 Destination</Text>
        <View style={styles.wrap}>
          {places
            .filter(p => p.id !== pickupId)
            .map(p => (
              <Chip
                key={p.id}
                testID={`destination-${p.id}`}
                label={p.name}
                selected={destinationId === p.id}
                onPress={() => setDestinationId(p.id)}
              />
            ))}
        </View>

        {ready && (
          <>
            <Text style={styles.section}>Véhicule</Text>
            {VEHICLE_TYPES.map(t => (
              <TouchableOpacity
                key={t.id}
                testID={`vehicle-${t.id}`}
                accessibilityRole="button"
                accessibilityState={{selected: vehicleType === t.id}}
                style={[
                  styles.vehicle,
                  vehicleType === t.id && styles.vehicleSelected,
                ]}
                onPress={() => setVehicleType(t.id)}>
                <View>
                  <Text style={styles.vehicleLabel}>{t.label}</Text>
                  <Text style={styles.vehicleDescription}>{t.description}</Text>
                </View>
                <Text testID={`price-${t.id}`} style={styles.vehiclePrice}>
                  {formatFcfa(estimates[t.id].price)}
                </Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.note}>
              Environ {estimates[vehicleType].distanceKm} km. Prix estimé, à
              régler en espèces ou Mobile Money.
            </Text>
          </>
        )}

        <Button
          testID="order"
          title={
            ready
              ? `Commander · ${formatFcfa(estimates[vehicleType].price)}`
              : 'Choisissez départ et destination'
          }
          disabled={!ready}
          onPress={order}
        />
        <Button
          title="Se déconnecter"
          variant="ghost"
          onPress={() => navigation.replace('Login')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  content: {padding: 20},
  hello: {fontSize: 16, color: colors.muted, marginTop: 10},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  section: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  wrap: {flexDirection: 'row', flexWrap: 'wrap'},
  vehicle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  vehicleSelected: {borderColor: colors.primary},
  vehicleLabel: {fontSize: 16, fontWeight: 'bold', color: colors.text},
  vehicleDescription: {fontSize: 13, color: colors.muted},
  vehiclePrice: {fontSize: 16, fontWeight: 'bold', color: colors.text},
  note: {fontSize: 12, color: colors.muted, marginTop: 4, marginBottom: 8},
});
