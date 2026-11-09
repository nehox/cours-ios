@testable import CoursProductivite
import XCTest

final class LessonTests: XCTestCase {
    func testLesson01SummaryFormatsTitleAndObjective() {
        let lesson = Lesson01Basics(title: "Lesson 1", objective: "Structures")

        XCTAssertEqual(lesson.summary(), "Lesson 1 - Structures")
    }

    func testLesson02TrimsOptionalTitle() {
        XCTAssertEqual(Lesson02Optionals.trimmedTitle(from: "  Mon titre  "), "Mon titre")
    }

    func testLesson02ReturnsNilForEmptyValue() {
        XCTAssertNil(Lesson02Optionals.trimmedTitle(from: "   "))
    }

    func testLesson03MockProviderReturnsTasks() {
        let tasks = [ProductivityTask(title: "Relire le chapitre")]
        let provider = Lesson03MockProvider(tasks: tasks)

        XCTAssertEqual(provider.currentTasks(), tasks)
    }
}