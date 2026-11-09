@testable import CoursProductivite
import XCTest

@MainActor
final class Lesson05HomeScreenTests: XCTestCase {
    func testHomeScreenCountsCompletedAndPendingTasks() {
        let viewModel = Lesson05HomeScreenViewModel(
            courseMessage: "Message de cours",
            title: "Titre",
            subtitle: "Sous-titre",
            provider: Lesson03MockProvider(tasks: [
                ProductivityTask(title: "TP 1"),
                ProductivityTask(title: "TP 2", isDone: true)
            ])
        )

        XCTAssertEqual(viewModel.completedCount, 1)
        XCTAssertEqual(viewModel.pendingCount, 1)
        XCTAssertEqual(viewModel.pendingCountText, "1 en cours")
    }

    func testHomeScreenExposesProvidedTasks() {
        let expectedTasks = [
            ProductivityTask(title: "Écrire l'écran"),
            ProductivityTask(title: "Passer le test", isDone: true)
        ]
        let viewModel = Lesson05HomeScreenViewModel(
            courseMessage: "Message",
            title: "Titre",
            subtitle: "Sous-titre",
            provider: Lesson03MockProvider(tasks: expectedTasks)
        )

        XCTAssertEqual(viewModel.tasks, expectedTasks)
    }

    func testMarkTaskDoneUpdatesProgression() {
        let identifier = UUID()
        let viewModel = Lesson05HomeScreenViewModel(
            courseMessage: "Message",
            title: "Titre",
            subtitle: "Sous-titre",
            provider: Lesson03MockProvider(tasks: [
                ProductivityTask(id: identifier, title: "Créer l'écran"),
                ProductivityTask(title: "Écrire les tests")
            ])
        )

        viewModel.markTaskDone(withID: identifier)

        XCTAssertTrue(viewModel.tasks[0].isDone)
        XCTAssertEqual(viewModel.completedCount, 1)
        XCTAssertEqual(viewModel.pendingCount, 1)
        XCTAssertEqual(viewModel.pendingCountText, "1 en cours")
    }

    func testMarkTaskDoneIgnoresUnknownIdentifier() {
        let viewModel = Lesson05HomeScreenViewModel(
            courseMessage: "Message",
            title: "Titre",
            subtitle: "Sous-titre",
            provider: Lesson03MockProvider(tasks: [
                ProductivityTask(title: "Conserver l'état initial")
            ])
        )

        viewModel.markTaskDone(withID: UUID())

        XCTAssertFalse(viewModel.tasks[0].isDone)
        XCTAssertEqual(viewModel.completedCount, 0)
    }
}