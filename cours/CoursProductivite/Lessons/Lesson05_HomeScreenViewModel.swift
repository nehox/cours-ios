import Foundation
import Combine

@MainActor
final class Lesson05HomeScreenViewModel: ObservableObject {
    let courseMessage: String
    let title: String
    let subtitle: String
    private let provider: Lesson03TaskProviding

    @Published private(set) var tasks: [ProductivityTask]

    init(courseMessage: String, title: String, subtitle: String, provider: Lesson03TaskProviding) {
        self.courseMessage = courseMessage
        self.title = title
        self.subtitle = subtitle
        self.provider = provider
        self.tasks = provider.currentTasks()
    }

    var completedCount: Int {
        // TODO: Compter les tâches terminées (isDone == true)
        0
    }

    var pendingCount: Int {
        // TODO: Calculer le nombre de tâches restantes (tasks.count - completedCount)
        0
    }

    var progressTitle: String {
        "Progression du TP"
    }

    var progressSubtitle: String {
        "Un écran lisible, testable et facile à faire évoluer."
    }

    var completedCountText: String {
        // TODO: Retourner "\(completedCount) terminée(s)"
        ""
    }

    var pendingCountText: String {
        // TODO: Retourner "Tout est fini" si pendingCount == 0, sinon "\(pendingCount) en cours"
        ""
    }

    func markTaskDone(withID id: UUID) {
        // TODO: Trouver la tâche avec cet id dans tasks et appeler markDone()
    }
}