@testable import CoursProductivite
import XCTest

@MainActor
final class MainViewModelTests: XCTestCase {
    func testTaskCountTextForNoTask() {
        let viewModel = Lesson04ViewModel(provider: Lesson03MockProvider(tasks: []))

        XCTAssertEqual(viewModel.taskCountText, "Aucune tâche")
    }

    func testTaskCountTextForSomeTasks() {
        let viewModel = Lesson04ViewModel(provider: Lesson03MockProvider(tasks: [ProductivityTask(title: "TP 1"), ProductivityTask(title: "TP 2")]))

        XCTAssertEqual(viewModel.taskCountText, "2 tâche(s)")
    }
}