# Cours iOS Moderne : Swift, SwiftUI, TDD, Firebase & Git

Support pédagogique pour apprendre le développement iOS avec **SwiftUI**, l'**architecture MVVM** et le **Test-Driven Development (TDD)**. Le projet utilise le mode de langage **Swift 5**, nécessite **Xcode 15 ou supérieur** et cible **iOS 17**.

Le dépôt contient également deux modules complémentaires : **l'authentification Firebase** (Email, Google, Apple) et **Git / commits conventionnels**.

---

## 🌐 Liens Rapides (En Ligne sur GitHub Pages)

| Ressource | Description | Lien |
| :--- | :--- | :--- |
| 🎓 **Portail d'accueil** | Page d'entrée vers toutes les ressources | [Ouvrir le portail](https://nehox.github.io/cours-ios/) |
| 📊 **Diaporama du Cours** | Présentation interactive avec quiz, démos et Storybook | [Lancer la présentation](https://nehox.github.io/cours-ios/presentation/) |
| 🛠️ **Guide Interactif du TP** | Feuille de route pas à pas en 7 étapes avec progression | [Accéder au guide de TP](https://nehox.github.io/cours-ios/guide/) |
| 🔥 **Module Firebase Auth** | Diaporama + guide pour ajouter Email, Google et Apple | [Ouvrir le module Firebase](https://nehox.github.io/cours-ios/firebase/) |
| 🌿 **Diaporama Git** | Commits conventionnels, rebase, tags et worktrees | [Lancer le diaporama Git](https://nehox.github.io/cours-ios/git/presentation/) |
| 📥 **Téléchargement du Projet** | Archive `.zip` du projet Xcode à corriger | [Télécharger l'archive (.zip)](https://nehox.github.io/cours-ios/guide/CoursProductivite-Etudiant.zip) |

---

## 📦 Contenu du Dépôt

- **`cours/`** : Projet Xcode de départ pour les étudiants (`CoursProductivite.xcodeproj`). Il contient une erreur de compilation volontaire au premier lancement et une suite de tests unitaires au rouge pour vous guider en TDD.
- **`guide/`** : Guide pratique interactif hébergé sur le web pour suivre l'avancement du TP, consulter les indices et tester le simulateur iPhone.
- **`presentation/`** : Diaporama moderne du cours avec animations, simulateur interactif d'optionnels, visualiseur d'injection de dépendances et Storybook SwiftUI.
- **`firebase/`** : Module complémentaire d'authentification Firebase avec diaporama et guide en 13 étapes (Email, Google, Apple).
- **`git/`** : Diaporama Git de 22 slides sur les commits conventionnels et les commandes essentielles.

---

## 🧭 Parcours Conseillé

1. **Module 1 — Swift, SwiftUI & TDD** : diaporama du cours + guide du TP.
2. **Module 2 — Authentification Firebase** : ajouter l'inscription, la connexion et la déconnexion à un projet iOS personnel.
3. **Module 3 — Git & commits conventionnels** : comprendre l'historique, les branches, les tags et les worktrees.

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

## 🔥 Module Firebase Authentication

Module complémentaire pour ajouter une authentification à **votre projet iOS personnel**, sans modifier le projet de TP.

- **Diaporama** : [Ouvrir le diaporama Firebase](https://nehox.github.io/cours-ios/firebase/presentation/)
- **Guide pratique** : [Suivre le guide en 13 étapes](https://nehox.github.io/cours-ios/firebase/guide/)
- **Méthodes couvertes** : Email / mot de passe, Google et Apple.
- **Périmètre** : inscription, connexion et déconnexion.
- **Installation** : Swift Package Manager (SPM).
- **Prérequis Apple** : Sign in with Apple nécessite un compte **Apple Developer Program payant**. Le guide le signale et permet de travailler d'abord avec Email et Google.
- **Solutions** : les corrections du guide sont verrouillées ; le mot de passe est communiqué en cours.

---

## 🌿 Module Git & Commits Conventionnels

Diaporama autonome, **sans TP**, pour acquérir les bons réflexes Git.

- **Diaporama** : [Lancer le diaporama Git](https://nehox.github.io/cours-ios/git/presentation/)
- **Commits conventionnels** : format `type(scope): description`, types (`feat`, `fix`, `docs`...), corps, footer et breaking changes.
- **Commandes essentielles** : `commit`, `amend`, `push`, `pull`, `cherry-pick`, `rebase`, `rebase -i`.
- **Organisation** : tags de version et worktrees.
- **Bonus** : générateur interactif de message de commit, pièges fréquents et quiz.

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
