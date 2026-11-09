import Foundation

enum Priority: String, CaseIterable, Codable, Equatable {
    case low
    case medium
    case high

    var displayName: String {
        switch self {
        case .low:
            return "Faible"
        case .medium:
            return "Moyenne"
        case .high:
            return "Haute"
        }
    }
}