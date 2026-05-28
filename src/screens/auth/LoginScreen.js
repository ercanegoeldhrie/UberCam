import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const handleSendOtp = () => {
    if (phone.trim() === '' || name.trim() === '') {
      alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
      return;
    }
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length < 4) {
      alert('Veuillez entrer un code de validation valide.');
      return;
    }
    // Simulation d'une détection : si le nom contient "chauffeur", on l'oriente vers son inscription
    if (name.toLowerCase().includes('chauffeur')) {
      navigation.navigate('DriverSignup');
    } else {
      alert('Connexion client réussie (Interface carte à venir) !');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>UberCam</Text>
          <Text style={styles.tagline}>Votre course en toute sécurité</Text>
        </View>

        {step === 1 ? (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Bienvenue</Text>
            <Text style={styles.subtitle}>Renseignez vos informations pour commencer. Écrivez "Chauffeur" dans votre nom pour tester le flux chauffeur.</Text>

            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Paul Biya"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 6XXXXXXXX"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>Recevoir le code par WhatsApp</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Vérification</Text>
            <Text style={styles.subtitle}>Un code de validation a été envoyé au {phone} via WhatsApp</Text>

            <Text style={styles.label}>Code de confirmation</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez le code reçu"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={otpCode}
              onChangeText={setOtpCode}
            />

            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Confirmer et Continuer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => setStep(1)}>
              <Text style={styles.linkText}>Modifier le numéro de téléphone</Text>
            </TouchableOpacity>
          </View>
        )}

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
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1A1A1A',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F1F3F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 20,
    height: 50,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    color: '#0066CC',
    fontSize: 14,
  },
});