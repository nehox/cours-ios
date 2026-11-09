import Foundation

protocol TaskPolicy {
    func canCreateTask(title: String) -> Bool
}

struct DefaultTaskPolicy: TaskPolicy {
    func canCreateTask(title: String) -> Bool {
        title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
    }
}