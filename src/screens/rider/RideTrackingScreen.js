import React, {useEffect, useReducer} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, colors} from '../../components/ui';
import {formatFcfa, VEHICLE_TYPES} from '../../services/pricing';
import {
  DEMO_STEPS,
  isFinished,
  RIDE_STATUS,
  rideReducer,
  STATUS_LABELS,
} from '../../services/ride';

// Suivi d'une course commandée. En mode démo, les étapes s'enchaînent toutes seules
// (chauffeur trouvé, arrivé, course démarrée, terminée).
export default function RideTrackingScreen({navigation, route}) {
  const [ride, dispatch] = useReducer(rideReducer, route.params.ride);

  // À chaque changement d'état, on programme l'événement simulé suivant.
  useEffect(() => {
    if (isFinished(ride)) {
      return undefined;
    }
    const next = DEMO_STEPS.find(
      step => rideReducer(ride, step.action) !== ride,
    );
    if (!next) {
      return undefined;
    }
    const timer = setTimeout(() => dispatch(next.action), next.delayMs);
    return () => clearTimeout(timer); // annule le minuteur si l'écran est quitté
  }, [ride]);

  const cancel = () =>
    Alert.alert('Annuler la course ?', 'Le chauffeur sera prévenu.', [
      {text: 'Non', style: 'cancel'},
      {
        text: 'Oui, annuler',
        style: 'destructive',
        onPress: () => dispatch({type: 'CANCEL'}),
      },
    ]);

  const vehicle = VEHICLE_TYPES.find(t => t.id === ride.vehicleType);
  const canCancel = [
    RIDE_STATUS.SEARCHING,
    RIDE_STATUS.DRIVER_ON_THE_WAY,
    RIDE_STATUS.DRIVER_ARRIVED,
  ].includes(ride.status);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text testID="ride-status" style={styles.status}>
          {STATUS_LABELS[ride.status]}
        </Text>

        <View style={styles.card}>
          <Text style={styles.route}>📍 {ride.pickup.name}</Text>
          <Text style={styles.route}>🏁 {ride.destination.name}</Text>
          <Text style={styles.meta}>
            {vehicle?.label} · {ride.distanceKm} km · {formatFcfa(ride.price)}
          </Text>
        </View>

        {ride.driver && ride.status !== RIDE_STATUS.CANCELLED && (
          <View testID="driver-card" style={styles.card}>
            <Text style={styles.driverName}>
              {ride.driver.name} · ⭐ {ride.driver.rating}
            </Text>
            <Text style={styles.meta}>
              {ride.driver.vehicle} · {ride.driver.plate}
            </Text>
          </View>
        )}

        {ride.status === RIDE_STATUS.COMPLETED && (
          <Text style={styles.done}>
            Merci d'avoir voyagé avec UberCam ! À payer :{' '}
            {formatFcfa(ride.price)}
          </Text>
        )}

        {canCancel && (
          <Button
            testID="cancel-ride"
            title="Annuler la course"
            variant="danger"
            onPress={cancel}
          />
        )}
        {isFinished(ride) && (
          <Button
            testID="back-home"
            title="Nouvelle course"
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  content: {padding: 20, paddingTop: 40},
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  route: {fontSize: 16, color: colors.text, marginBottom: 6},
  meta: {fontSize: 14, color: colors.muted, marginTop: 4},
  driverName: {fontSize: 18, fontWeight: 'bold', color: colors.text},
  done: {
    fontSize: 15,
    color: colors.success,
    marginBottom: 16,
    fontWeight: '600',
  },
});
