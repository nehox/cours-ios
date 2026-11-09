import Foundation

enum CourseBootstrap {
    static let message = "Corrige la base, puis fais évoluer l’écran avec le TDD."

    @MainActor
    static func makeHomeViewModel() -> Lesson05HomeScreenViewModel {
        let tasks = [
            ProductivityTask(title: "Comprendre SwiftUI"),
            ProductivityTask(title: "Écrire le premier test", isDone: true),
            ProductivityTask(title: "Refactorer proprement")
        ]

        return Lesson05HomeScreenViewModel(
            courseMessage: message,
            title: "Tableau de bord productivité",
            subtitle: "Un écran simple pour apprendre les bases du langage et de l'architecture iOS.",
            provider: Lesson03MockProvider(tasks: tasks)
        )
    }
}