import SwiftUI

@MainActor
struct MainView: View {
    @StateObject private var viewModel = CourseBootstrap.makeHomeViewModel()

    var body: some View {
        ProductivityHomeView(viewModel: viewModel)
    }
}

#Preview {
    MainView()
}