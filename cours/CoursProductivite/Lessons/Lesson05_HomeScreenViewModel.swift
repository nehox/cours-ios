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
        tasks = provider.currentTasks()
    }

    var completedCount: Int {
        tasks.filter { $0.isDone }.count
    }

    var pendingCount: Int {
        tasks.count - completedCount
    }

    var progressTitle: String {
        "Progression du TP"
    }

    var progressSubtitle: String {
        "Un écran lisible, testable et facile à faire évoluer."
    }

    var completedCountText: String {
        "\(completedCount) terminée(s)"
    }

    var pendingCountText: String {
        pendingCount == 0 ? "Tout est fini" : "\(pendingCount) en cours"
    }

    func markTaskDone(withID id: UUID) {
        guard let index = tasks.firstIndex(where: { $0.id == id }) else {
            return
        }

        tasks[index].markDone()
    }
}