import Foundation

protocol TaskStore {
    func load() -> [ProductivityTask]
    func save(_ tasks: [ProductivityTask])
}

final class InMemoryTaskStore: TaskStore {
    private var storage: [ProductivityTask]

    init(initialTasks: [ProductivityTask] = []) {
        storage = initialTasks
    }

    func load() -> [ProductivityTask] {
        storage
    }

    func save(_ tasks: [ProductivityTask]) {
        storage = tasks
    }
}