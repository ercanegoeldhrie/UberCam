import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, colors} from '../../components/ui';

// Affiché après l'envoi du dossier : le chauffeur attend la validation d'un administrateur.
export default function DriverPendingScreen({navigation, route}) {
  const {user, application} = route.params || {};

  const rows = [
    ['Nom', user?.name],
    ['Téléphone', user?.phone],
    ['CNI', application?.cniNumber],
    ['Permis', application?.licenseNumber],
    ['Véhicule', application?.vehicleModel],
    ['Immatriculation', application?.vehiclePlate],
    ['Ville', application?.city],
  ].filter(([, value]) => value);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.icon}>⏳</Text>
        <Text style={styles.title}>Dossier en cours de vérification</Text>
        <Text style={styles.subtitle}>
          Un administrateur UberCam vérifie vos pièces sous 24 à 48 h. Vous
          recevrez un message dès que votre compte sera activé.
        </Text>

        <View style={styles.card}>
          {rows.map(([label, value]) => (
            <View key={label} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

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
  content: {padding: 20, paddingTop: 40},
  icon: {fontSize: 48, textAlign: 'center'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {color: colors.muted, fontSize: 14},
  value: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
});
