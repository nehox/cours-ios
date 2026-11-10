import Foundation

@MainActor
final class Lesson04ViewModel {
    private let provider: Lesson03TaskProviding

    init(provider: Lesson03TaskProviding) {
        self.provider = provider
    }

    var taskCountText: String {
        // TODO: Étape 4 - Calculer le texte d'état :
        // Si le nombre de tâches fournies est 0, retourner "Aucune tâche",
        // sinon retourner "\(count) tâche(s)".
        ""
    }
}