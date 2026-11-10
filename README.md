# Cours iOS Moderne : Swift, SwiftUI & TDD

Support pédagogique complet pour l'apprentissage du développement iOS moderne avec **Swift 5.10+**, **SwiftUI**, l'**architecture MVVM** et le **Test-Driven Development (TDD)**.

---

## 🌐 Liens Rapides (En Ligne sur GitHub Pages)

| Ressource | Description | Lien |
| :--- | :--- | :--- |
| 🎓 **Portail d'accueil** | Page d'entrée vers toutes les ressources | [Ouvrir le portail](https://nehox.github.io/cours-ios/) |
| 📊 **Diaporama du Cours** | Présentation interactive avec quiz, démos et Storybook | [Lancer la présentation](https://nehox.github.io/cours-ios/presentation/) |
| 🛠️ **Guide Interactif du TP** | Feuille de route pas à pas en 7 étapes avec progression | [Accéder au guide de TP](https://nehox.github.io/cours-ios/guide/) |
| 📥 **Téléchargement du Projet** | Archive `.zip` du projet Xcode à corriger | [Télécharger l'archive (.zip)](https://nehox.github.io/cours-ios/guide/CoursProductivite-Etudiant.zip) |

---

## 📦 Contenu du Dépôt

- **`cours/`** : Projet Xcode de départ pour les étudiants (`CoursProductivite.xcodeproj`). Il contient une erreur de compilation volontaire au premier lancement et une suite de tests unitaires au rouge pour vous guider en TDD.
- **`guide/`** : Guide pratique interactif hébergé sur le web pour suivre l'avancement du TP, consulter les indices et tester le simulateur iPhone.
- **`presentation/`** : Diaporama moderne du cours avec animations, simulateur interactif d'optionnels, visualiseur d'injection de dépendances et Storybook SwiftUI.

---

## 🚀 Démarrage de l'Atelier

### Option A — Téléchargement direct (Recommandé)
1. Téléchargez l'archive : [`CoursProductivite-Etudiant.zip`](https://nehox.github.io/cours-ios/guide/CoursProductivite-Etudiant.zip).
2. Décompressez le fichier et ouvrez le dossier `cours/`.
3. Double-cliquez sur `CoursProductivite.xcodeproj` pour l'ouvrir dans Xcode.

### Option B — Clonage Git
```bash
git clone https://github.com/nehox/cours-ios.git
cd cours-ios/cours
open CoursProductivite.xcodeproj
```

---

## 🎯 Déroulement du TP

1. **Étape 0 — Le Baptême du Compilateur :**
   Pressez <kbd>Cmd</kbd> + <kbd>B</kbd>. Le projet refuse de compiler en raison d'une erreur de typage volontaire dans `CoursProductivite/App/CourseBootstrap.swift`. Diagnostiquez et corrigez l'erreur pour obtenir votre premier succès de compilation.

2. **Cycle TDD — Les Tests Unitaires :**
   Pressez <kbd>Cmd</kbd> + <kbd>U</kbd>. La suite de tests s'exécute et affiche des échecs : c'est votre feuille de route ! Complétez les fichiers de leçons et de domaine au fur et à mesure pour faire passer les 18 tests au vert.

3. **Lancement sur Simulateur :**
   Une fois tous les tests validés, sélectionnez un simulateur (ex: iPhone 16 / iPhone 17) et pressez <kbd>Cmd</kbd> + <kbd>R</kbd> pour admirer votre application de productivité SwiftUI en action !

---

## ⌨️ Raccourcis Clés dans Xcode

- <kbd>Cmd</kbd> + <kbd>B</kbd> : Compiler le projet (*Build*)
- <kbd>Cmd</kbd> + <kbd>U</kbd> : Exécuter les tests unitaires (*Test*)
- <kbd>Cmd</kbd> + <kbd>R</kbd> : Lancer sur le Simulateur (*Run*)
- <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd> : Nettoyer le cache (*Clean Build Folder*)

---

## 🧪 Exécution des Tests en Ligne de Commande

```bash
cd cours
xcodebuild test -project CoursProductivite.xcodeproj -scheme CoursProductivite -destination 'platform=iOS Simulator,name=iPhone 17'
```
