import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  normalizePlate,
  validateDriverApplication,
} from '../../utils/validation';

export default function DriverSignupScreen({navigation, route}) {
  const user = route?.params?.user;
  // États pour les informations personnelles
  const [cniNumber, setCniNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  // États pour le véhicule
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');

  // État pour la localisation/zone d'activité
  const [city, setCity] = useState('');

  const handleRegisterDriver = () => {
    const application = {
      cniNumber,
      licenseNumber,
      vehicleModel,
      vehiclePlate,
      city,
    };
    const errors = validateDriverApplication(application);
    if (errors.length > 0) {
      Alert.alert('Dossier incomplet', errors.join('\n'));
      return;
    }
    // MODE DÉMO : le dossier n'est envoyé nulle part. Avec Firestore, on l'enregistrera ici
    // (collection "drivers", statut "pending") pour qu'un administrateur le valide.
    navigation.replace('DriverPending', {
      user,
      application: {
        ...application,
        cniNumber: cniNumber.replace(/\s/g, ''),
        licenseNumber: licenseNumber.trim().toUpperCase(),
        vehicleModel: vehicleModel.trim(),
        vehiclePlate: normalizePlate(vehiclePlate),
        city: city.trim(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            Espace Chauffeur{user ? ` · ${user.name}` : ''}
          </Text>
          <Text style={styles.subtitle}>
            Créez votre dossier professionnel pour commencer à recevoir des
            courses au Cameroun
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* SECTION : IDENTITÉ */}
          <Text style={styles.sectionTitle}>1. Pièces Personnelles</Text>

          <Text style={styles.label}>Numéro de CNI</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 100XXXXXX"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            testID="input-cni"
            value={cniNumber}
            onChangeText={setCniNumber}
          />

          <Text style={styles.label}>Numéro de Permis de Conduire</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: NWXXXXXX"
            placeholderTextColor="#999"
            testID="input-license"
            value={licenseNumber}
            onChangeText={setLicenseNumber}
          />

          {/* SECTION : VÉHICULE */}
          <Text style={styles.sectionTitle}>2. Informations du Véhicule</Text>

          <Text style={styles.label}>Marque et Modèle de la voiture</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Peugeot 407 / Mercedes Classe B"
            placeholderTextColor="#999"
            testID="input-model"
            value={vehicleModel}
            onChangeText={setVehicleModel}
          />

          <Text style={styles.label}>Numéro d'immatriculation</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: LT 123 XX ou CE 456 XX"
            placeholderTextColor="#999"
            autoCapitalize="characters"
            testID="input-plate"
            value={vehiclePlate}
            onChangeText={setVehiclePlate}
          />

          {/* SECTION : ZONE D'ACTIVITÉ */}
          <Text style={styles.sectionTitle}>3. Zone d'Activité</Text>

          <Text style={styles.label}>Ville principale de circulation</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Yaoundé, Douala, Bafoussam..."
            placeholderTextColor="#999"
            testID="input-city"
            value={city}
            onChangeText={setCity}
          />

          {/* BOUTON DE SOUMISSION */}
          <TouchableOpacity
            testID="submit-driver"
            style={styles.button}
            onPress={handleRegisterDriver}>
            <Text style={styles.buttonText}>
              Soumettre mon dossier d'approbation
            </Text>
          </TouchableOpacity>

          {/* RETOUR */}
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.replace('Login')}>
            <Text style={styles.linkText}>Retour à l'écran de connexion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
    marginTop: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F1F3F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 15,
    height: 48,
  },
  button: {
    backgroundColor: '#28A745', // Vert pour l'action de validation
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
