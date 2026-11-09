@testable import CoursProductivite
import XCTest

final class TaskPolicyTests: XCTestCase {
    func testDefaultPolicyRejectsEmptyTitle() {
        let policy = DefaultTaskPolicy()

        XCTAssertFalse(policy.canCreateTask(title: "   "))
    }

    func testDefaultPolicyAcceptsNonEmptyTitle() {
        let policy = DefaultTaskPolicy()

        XCTAssertTrue(policy.canCreateTask(title: "Apprendre les enums"))
    }
}