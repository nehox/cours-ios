import Foundation

struct TaskList: Equatable {
    private(set) var tasks: [ProductivityTask]

    init(tasks: [ProductivityTask] = []) {
        self.tasks = tasks
    }

    var pendingTasks: [ProductivityTask] {
        // TODO: Retourner uniquement les tâches dont isDone vaut false
        []
    }

    mutating func add(_ task: ProductivityTask) {
        // TODO: Ajouter la nouvelle tâche à la liste tasks
    }

    mutating func completeTask(withID id: UUID) {
        // TODO: Trouver la tâche correspondante à l'id et appeler sa méthode markDone()
    }
}