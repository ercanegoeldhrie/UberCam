// Règles de validation des formulaires, isolées ici pour être testées sans écran.

// Numéro mobile camerounais : 9 chiffres commençant par 6 (MTN, Orange, Camtel, Nexttel).
// Accepte "6 90 12 34 56", "690123456", "+237690123456", "00237 690 12 34 56".
// Renvoie le numéro au format international "+2376XXXXXXXX", ou null s'il est invalide.
export function normalizeCameroonPhone(input) {
  let digits = String(input || '').replace(/[^\d]/g, '');
  if (digits.startsWith('00237')) {
    digits = digits.slice(5);
  } else if (digits.startsWith('237') && digits.length === 12) {
    digits = digits.slice(3);
  }
  return /^6\d{8}$/.test(digits) ? `+237${digits}` : null;
}

// Code de vérification envoyé par SMS ou WhatsApp : 6 chiffres.
export function isValidOtp(code) {
  return /^\d{6}$/.test(String(code || '').trim());
}

// Plaque d'immatriculation camerounaise : 2 lettres de région, 3 ou 4 chiffres, 2 lettres.
// Ex : "LT 123 AB", "CE-4567-XY", "ce123ab".
export function normalizePlate(input) {
  const compact = String(input || '')
    .toUpperCase()
    .replace(/[\s-]/g, '');
  const match = compact.match(/^([A-Z]{2})(\d{3,4})([A-Z]{2})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]}` : null;
}

// Numéro de CNI : 9 à 17 chiffres selon l'ancien ou le nouveau modèle de carte.
export function isValidCni(input) {
  return /^\d{9,17}$/.test(String(input || '').replace(/\s/g, ''));
}

export function isFilled(value) {
  return String(value || '').trim().length > 0;
}

// Vérifie le dossier chauffeur et renvoie la liste des erreurs (vide si tout est bon).
export function validateDriverApplication({
  cniNumber,
  licenseNumber,
  vehicleModel,
  vehiclePlate,
  city,
}) {
  const errors = [];
  if (!isValidCni(cniNumber)) {
    errors.push('Numéro de CNI invalide (9 à 17 chiffres).');
  }
  if (!isFilled(licenseNumber)) {
    errors.push('Numéro de permis obligatoire.');
  }
  if (!isFilled(vehicleModel)) {
    errors.push('Marque et modèle du véhicule obligatoires.');
  }
  if (!normalizePlate(vehiclePlate)) {
    errors.push('Immatriculation invalide (ex : LT 123 AB).');
  }
  if (!isFilled(city)) {
    errors.push("Ville d'activité obligatoire.");
  }
  return errors;
}
