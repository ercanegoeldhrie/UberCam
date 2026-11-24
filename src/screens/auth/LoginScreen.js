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
import {Chip} from '../../components/ui';
import {
  isFilled,
  isValidOtp,
  normalizeCameroonPhone,
} from '../../utils/validation';

export default function LoginScreen({navigation}) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('rider'); // 'rider' (passager) ou 'driver' (chauffeur)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const internationalPhone = normalizeCameroonPhone(phone);

  const handleSendOtp = () => {
    if (!isFilled(name)) {
      Alert.alert('Nom manquant', 'Veuillez renseigner votre nom complet.');
      return;
    }
    if (!internationalPhone) {
      Alert.alert(
        'Numéro invalide',
        'Entrez un numéro mobile camerounais de 9 chiffres commençant par 6.',
      );
      return;
    }
    // MODE DÉMO : aucun code n'est réellement envoyé. Avec Firebase Authentication,
    // c'est ici qu'on appellera auth().signInWithPhoneNumber(internationalPhone).
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (!isValidOtp(otpCode)) {
      Alert.alert(
        'Code invalide',
        'Le code de validation contient 6 chiffres.',
      );
      return;
    }
    // MODE DÉMO : tout code à 6 chiffres est accepté.
    const user = {name: name.trim(), phone: internationalPhone, role};
    // "replace" : on ne revient pas à l'écran de connexion avec le bouton retour.
    navigation.replace(role === 'driver' ? 'DriverSignup' : 'RiderHome', {
      user,
    });
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
            <Text style={styles.subtitle}>
              Renseignez vos informations pour commencer.
            </Text>

            <Text style={styles.label}>Je suis</Text>
            <View style={styles.roleRow}>
              <Chip
                testID="role-rider"
                label="🧍 Passager"
                selected={role === 'rider'}
                onPress={() => setRole('rider')}
              />
              <Chip
                testID="role-driver"
                label="🚗 Chauffeur"
                selected={role === 'driver'}
                onPress={() => setRole('driver')}
              />
            </View>

            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              testID="input-name"
              style={styles.input}
              placeholder="Ex: Marie Ngono"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              testID="input-phone"
              style={styles.input}
              placeholder="Ex: 6XXXXXXXX"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <TouchableOpacity
              testID="send-otp"
              style={styles.button}
              onPress={handleSendOtp}>
              <Text style={styles.buttonText}>
                Recevoir le code par WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Vérification</Text>
            <Text style={styles.subtitle}>
              Un code de validation a été envoyé au {internationalPhone} via
              WhatsApp
            </Text>
            <Text style={styles.demoBanner}>
              Mode démo : saisissez n'importe quel code à 6 chiffres.
            </Text>

            <Text style={styles.label}>Code de confirmation</Text>
            <TextInput
              testID="input-otp"
              style={styles.input}
              placeholder="Entrez le code reçu"
              maxLength={6}
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={otpCode}
              onChangeText={setOtpCode}
            />

            <TouchableOpacity
              testID="verify-otp"
              style={styles.button}
              onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Confirmer et Continuer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setStep(1)}>
              <Text style={styles.linkText}>
                Modifier le numéro de téléphone
              </Text>
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
    shadowOffset: {width: 0, height: 2},
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
  roleRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  demoBanner: {
    backgroundColor: '#FFF4E5',
    color: '#8A5300',
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 16,
  },
});
