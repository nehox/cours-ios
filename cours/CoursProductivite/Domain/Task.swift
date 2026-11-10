import Foundation

struct ProductivityTask: Identifiable, Equatable, Codable {
    let id: UUID
    var title: String
    var isDone: Bool
    var priority: Priority

    init(id: UUID = UUID(), title: String, isDone: Bool = false, priority: Priority = .low) {
        // TODO: Ajuster la priorité par défaut (elle doit être .medium selon TaskTests)
        self.id = id
        self.title = title
        self.isDone = isDone
        self.priority = priority
    }

    mutating func markDone() {
        // TODO: Marquer la tâche comme terminée (passer isDone à true)
    }
}