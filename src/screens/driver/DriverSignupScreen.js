import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Alert
} from 'react-native';

export default function DriverSignupScreen({ navigation }) {
  // États pour les informations personnelles
  const [cniNumber, setCniNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  
  // États pour le véhicule
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  
  // État pour la localisation/zone d'activité
  const [city, setCity] = useState('');

  const handleRegisterDriver = () => {
    if (!cniNumber || !licenseNumber || !vehicleModel || !vehiclePlate || !city) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires pour l’approbation de votre dossier.');
      return;
    }

    Alert.alert(
      'Dossier Soumis', 
      'Votre demande d’inscription a été envoyée avec succès. L’administrateur UberCam va vérifier vos pièces sous 24h à 48h.',
      [{ text: 'Compris', onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Espace Chauffeur</Text>
          <Text style={styles.subtitle}>Créez votre dossier professionnel pour commencer à recevoir des courses au Cameroun</Text>
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
            value={cniNumber}
            onChangeText={setCniNumber}
          />

          <Text style={styles.label}>Numéro de Permis de Conduire</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: NWXXXXXX"
            placeholderTextColor="#999"
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
            value={vehicleModel}
            onChangeText={setVehicleModel}
          />

          <Text style={styles.label}>Numéro d'immatriculation</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: LT 123 XX ou CE 456 XX"
            placeholderTextColor="#999"
            autoCapitalize="characters"
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
            value={city}
            onChangeText={setCity}
          />

          {/* BOUTON DE SOUMISSION */}
          <TouchableOpacity style={styles.button} onPress={handleRegisterDriver}>
            <Text style={styles.buttonText}>Soumettre mon dossier d'approbation</Text>
          </TouchableOpacity>

          {/* RETOUR */}
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
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
    shadowOffset: { width: 0, height: 2 },
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