import Foundation

protocol TaskPolicy {
    func canCreateTask(title: String) -> Bool
}

struct DefaultTaskPolicy: TaskPolicy {
    func canCreateTask(title: String) -> Bool {
        // TODO: Retourner true uniquement si le titre une fois nettoyé de ses espaces n'est pas vide
        false
    }
}