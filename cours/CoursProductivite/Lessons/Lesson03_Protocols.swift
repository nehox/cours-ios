import Foundation

protocol Lesson03TaskProviding {
    func currentTasks() -> [ProductivityTask]
}

struct Lesson03MockProvider: Lesson03TaskProviding {
    let tasks: [ProductivityTask]

    func currentTasks() -> [ProductivityTask] {
        tasks
    }
}