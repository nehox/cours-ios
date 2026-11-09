# Cours iOS SwiftUI et TDD

Ce projet sert de support de TP pour apprendre Swift, les bonnes pratiques iOS et le TDD.

## Objectif

- comprendre les bases du langage Swift
- structurer une petite application iOS de productivité
- écrire des tests unitaires avant ou pendant l'implémentation
- apprendre à corriger une base de code dégradée étape par étape

## Démarrage

1. Ouvre le projet `CoursProductivite.xcodeproj`
2. Lance les tests unitaires
3. Commence par corriger l'erreur de compilation volontairement laissée dans l'application

## Parcours pédagogique

Chaque fichier Swift de `CoursProductivite/Lessons` correspond à une étape du cours.

- `Lesson01_Basics.swift`: types, structures, propriétés et initialisation
- `Lesson02_Optionals.swift`: optionnels et sécurisation des données
- `Lesson03_Protocols.swift`: protocoles et injection de dépendances
- `Lesson04_ViewModel.swift`: état de l'interface et logique de présentation
- `Lesson05_HomeScreenViewModel.swift`: premier écran SwiftUI du cours

Les tests correspondants sont dans `CoursProductiviteTests`.

## Exécution des tests

- dans Xcode: `Product > Test`
- en ligne de commande: `xcodebuild test -project CoursProductivite.xcodeproj -scheme CoursProductivite -destination 'platform=iOS Simulator,name=iPhone 15'`

## Règle du cours

Le projet commence avec une erreur de compilation unique et volontaire. Une fois cette erreur corrigée, les tests servent d'auto-évaluation à chaque étape.