import Foundation

struct ProductivityTask: Identifiable, Equatable, Codable {
    let id: UUID
    var title: String
    var isDone: Bool
    var priority: Priority

    init(id: UUID = UUID(), title: String, isDone: Bool = false, priority: Priority = .medium) {
        self.id = id
        self.title = title
        self.isDone = isDone
        self.priority = priority
    }

    mutating func markDone() {
        isDone = true
    }
}