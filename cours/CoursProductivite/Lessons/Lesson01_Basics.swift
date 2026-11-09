import Foundation

struct Lesson01Basics {
    let title: String
    let objective: String

    init(title: String, objective: String) {
        self.title = title
        self.objective = objective
    }

    func summary() -> String {
        "\(title) - \(objective)"
    }
}