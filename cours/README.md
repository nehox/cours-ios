# Cours iOS : Swift, SwiftUI & TDD

Ce projet sert de support de TP pour apprendre Swift, les bonnes pratiques iOS, l'architecture MVVM et le Test-Driven Development (TDD).

---

## 🧭 Guide Interactif du TP & Présentation

Pour vous guider pas à pas dans la réalisation des exercices, deux outils web interactifs sont mis à votre disposition :

- **Guide pas à pas du TP :** Ouvrez [`../guide/index.html`](../guide/index.html) dans votre navigateur pour accéder à la feuille de route étape par étape, avec cases à cocher, indices, solutions déroulantes et simulateur interactif.
- **Présentation de cours :** Ouvrez [`../presentation/index.html`](../presentation/index.html) pour revoir les concepts clés (optionnels, `guard let`, protocoles, `VStack/HStack/ZStack`, Storybook).

---

## 🎯 Objectifs Pédagogiques

1. **Maîtriser les bases de Swift :** types immuables (`let` vs `var`), structures (`struct`), optionnels sécurisés avec `guard let`.
2. **Pratiquer le cycle TDD :** Rouge ➔ Vert ➔ Refactor.
3. **Structurer en architecture MVVM :** découplage fort avec protocoles, injection de dépendances et modèles de domaine.
4. **Comprendre une interface SwiftUI réactive :** relier un ViewModel observable à la vue et vérifier la mise à jour de l'écran.

---

## 🚀 Démarrage Rapide

1. Ouvrez le projet dans Xcode :
   ```bash
   open CoursProductivite.xcodeproj
   ```
2. **Étape 0 (Compilation) :** Pressez `Cmd + B`. Le projet refuse de compiler en raison d'une erreur de typage volontaire dans `CoursProductivite/App/CourseBootstrap.swift`. Corrigez-la !
3. **Cycle TDD (Tests) :** Une fois le projet compilé, pressez `Cmd + U`. Les tests unitaires s'exécutent et sont au rouge : c'est votre feuille de route !
4. Complétez chaque fichier de leçon et de domaine jusqu'à obtenir **18 tests au vert**.
5. **Rendu Visuel :** Pressez `Cmd + R` pour lancer l'application sur le simulateur iPhone.

---

## 📚 Parcours des Fichiers

| Étape | Fichier à implémenter | Test unitaire associé | Notion clé |
| :--- | :--- | :--- | :--- |
| **0** | `App/CourseBootstrap.swift` | *(Compilation)* | Typage statique `String` vs `Int` |
| **1** | `Lessons/Lesson01_Basics.swift` | `LessonTests.swift` | Structures et interpolation |
| **2** | `Lessons/Lesson02_Optionals.swift` | `LessonTests.swift` | `guard let` et nettoyage |
| **3** | `Domain/Task.swift`<br>`Domain/TaskPolicy.swift`<br>`Domain/TaskList.swift` | `TaskTests.swift`<br>`TaskPolicyTests.swift`<br>`TaskListTests.swift` | `mutating func`, Value Types |
| **4** | `Lessons/Lesson03_Protocols.swift`<br>`Lessons/Lesson04_ViewModel.swift` | `MainViewModelTests.swift` | Protocoles, Mocks, Injection |
| **5** | `Lessons/Lesson05_HomeScreenViewModel.swift` | `Lesson05_HomeScreenTests.swift` | `ObservableObject`, `@Published` |
| **6** | `App/ProductivityHomeView.swift` *(déjà fournie)* | Vérification manuelle sur le simulateur | `@ObservedObject`, `@Published` et mise à jour de l'écran |

---

## ⌨️ Raccourcis Clés dans Xcode

- `Cmd + B` : Compiler le projet (*Build*)
- `Cmd + U` : Lancer les tests unitaires (*Test*)
- `Cmd + R` : Lancer sur le Simulateur (*Run*)
- `Cmd + Shift + K` : Nettoyer le cache (*Clean Build Folder*)

---

## 🧪 Ligne de Commande (Optionnel)

Si vous préférez exécuter les tests depuis votre terminal :

```bash
xcodebuild test -project CoursProductivite.xcodeproj -scheme CoursProductivite -destination 'platform=iOS Simulator,name=iPhone 17'
```
