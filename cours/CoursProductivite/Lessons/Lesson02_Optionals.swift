import Foundation

enum Lesson02Optionals {
    static func trimmedTitle(from title: String?) -> String? {
        guard let title else {
            return nil
        }

        let candidate = title.trimmingCharacters(in: .whitespacesAndNewlines)
        return candidate.isEmpty ? nil : candidate
    }
}