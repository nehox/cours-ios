@testable import CoursProductivite
import XCTest

final class TaskListTests: XCTestCase {
    func testAddAppendsTask() {
        var list = TaskList()

        list.add(ProductivityTask(title: "Faire un TP"))

        XCTAssertEqual(list.tasks.count, 1)
    }

    func testCompleteTaskMarksMatchingTaskDone() {
        let identifier = UUID()
        var list = TaskList(tasks: [ProductivityTask(id: identifier, title: "Lire le brief")])

        list.completeTask(withID: identifier)

        XCTAssertTrue(list.tasks[0].isDone)
    }

    func testPendingTasksReturnsOnlyIncompleteTasks() {
        let incomplete = ProductivityTask(title: "Planifier le cours")
        let completed = ProductivityTask(title: "Préparer les slides", isDone: true)
        let list = TaskList(tasks: [incomplete, completed])

        XCTAssertEqual(list.pendingTasks, [incomplete])
    }
}