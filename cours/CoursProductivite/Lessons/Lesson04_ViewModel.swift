import Foundation

@MainActor
final class Lesson04ViewModel {
    private let provider: Lesson03TaskProviding

    init(provider: Lesson03TaskProviding) {
        self.provider = provider
    }

    var taskCountText: String {
        let count = provider.currentTasks().count
        return count == 0 ? "Aucune tâche" : "\(count) tâche(s)"
    }
}