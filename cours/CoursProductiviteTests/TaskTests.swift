@testable import CoursProductivite
import XCTest

final class TaskTests: XCTestCase {
    func testMarkDoneUpdatesState() {
        var task = ProductivityTask(title: "Réviser Swift")

        task.markDone()

        XCTAssertTrue(task.isDone)
    }

    func testDefaultPriorityIsMedium() {
        let task = ProductivityTask(title: "Préparer le cours")

        XCTAssertEqual(task.priority, .medium)
    }
}