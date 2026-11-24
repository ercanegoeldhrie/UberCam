# 🚕 UberCam

Application mobile de VTC pour le Cameroun (React Native) : les passagers commandent une course,
les chauffeurs déposent leur dossier pour être validés.

> **État actuel : prototype en mode démo.** Tous les écrans fonctionnent, mais rien n'est encore
> relié à un serveur : le code de validation n'est pas réellement envoyé, et le chauffeur ainsi que
> le déroulement de la course sont simulés. Voir [Ce qui reste à faire](#-ce-qui-reste-à-faire).

## ✨ Parcours disponibles

**Connexion**
- Choix du profil : passager ou chauffeur.
- Numéro camerounais vérifié et mis au format international (`6 90 12 34 56` → `+237690123456`).
- Code de validation à 6 chiffres (en démo, n'importe quel code est accepté).

**Passager**
- Choix de la ville (Yaoundé, Douala), du départ et de la destination parmi des lieux connus.
- Trois catégories (Moto, Éco, Confort) avec un prix estimé en FCFA, arrondi aux 50 F.
- Suivi de la course : recherche → chauffeur en route → arrivé → course en cours → terminée.
  On peut annuler tant qu'on n'est pas monté dans la voiture.

**Chauffeur**
- Dossier : CNI, permis, véhicule, immatriculation (`lt123ab` → `LT 123 AB`), ville.
- Contrôle des champs, puis écran « Dossier en cours de vérification ».

## 🧮 Calcul du prix

`prix = max(minimum, prise en charge + prix au km × distance)`. La distance est calculée à vol
d'oiseau, puis multipliée par 1,3 pour tenir compte des détours de la route.

| Catégorie | Prise en charge | Prix au km | Minimum |
|---|---|---|---|
| Moto | 200 F | 100 F | 300 F |
| Éco | 500 F | 250 F | 1 000 F |
| Confort | 1 000 F | 400 F | 2 000 F |

Ces tarifs sont un point de départ : ils se changent dans `src/services/pricing.js`.

## 🚀 Lancer l'application

Prérequis : [environnement React Native](https://reactnative.dev/docs/environment-setup) (Node 18,
Android Studio, JDK 17).

```bash
npm install
npm start          # serveur Metro
npm run android    # dans un deuxième terminal, téléphone branché ou émulateur lancé
```

## ✅ Tests

```bash
npm test           # 26 tests : validations, prix, cycle d'une course, parcours complets
npm run lint
npx tsc --noEmit
```

## 📁 Organisation

```
src/
  navigation/AppNavigator.js   enchaînement des écrans
  screens/auth/                connexion
  screens/rider/               accueil passager, suivi de course
  screens/driver/              dossier chauffeur, attente de validation
  components/ui.js             boutons, puces, couleurs
  services/pricing.js          catégories et calcul du prix
  services/ride.js             cycle de vie d'une course (machine à états) et simulation
  utils/validation.js          téléphone, code, CNI, immatriculation
  data/places.js               lieux connus (coordonnées approximatives, provisoire)
```

## 🛠️ Ce qui reste à faire

Ces étapes demandent des comptes ou des clés qui t'appartiennent :

1. **Firebase Authentication** (connexion par SMS) : activer « Téléphone » dans la console Firebase
   du projet `ubercam-6931a`, ajouter l'empreinte SHA-1 de l'app Android, appliquer le plugin
   `com.google.gms.google-services` dans les fichiers Gradle, puis remplacer le mode démo de
   `LoginScreen.js`. L'envoi par **WhatsApp** demande en plus un fournisseur de l'API WhatsApp Business.
2. **Firestore** : enregistrer les dossiers chauffeurs (statut `pending`) et les courses, puis créer
   un petit outil d'administration pour valider les chauffeurs.
3. **Google Maps** : une clé API pour afficher la carte, chercher des adresses et calculer les vrais
   trajets. Elle remplacera `src/data/places.js`.
4. **Mise en relation en temps réel** : application chauffeur (passer en ligne, accepter une course,
   partager sa position), à la place de la simulation de `src/services/ride.js`.
5. **Paiement** Mobile Money (MTN MoMo, Orange Money) via un agrégateur.
