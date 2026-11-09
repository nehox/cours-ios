import Foundation

struct TaskList: Equatable {
    private(set) var tasks: [ProductivityTask]

    init(tasks: [ProductivityTask] = []) {
        self.tasks = tasks
    }

    var pendingTasks: [ProductivityTask] {
        tasks.filter { $0.isDone == false }
    }

    mutating func add(_ task: ProductivityTask) {
        tasks.append(task)
    }

    mutating func completeTask(withID id: UUID) {
        guard let index = tasks.firstIndex(where: { $0.id == id }) else {
            return
        }
        tasks[index].markDone()
    }
}