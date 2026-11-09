import SwiftUI

struct ProductivityHomeView: View {
    @ObservedObject var viewModel: Lesson05HomeScreenViewModel

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                header
                summaryCard
                tasksSection
            }
            .padding(24)
        }
        .background(
            LinearGradient(
                colors: [Color(red: 0.98, green: 0.96, blue: 0.92), Color(red: 0.94, green: 0.96, blue: 0.99)],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
        )
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(viewModel.title)
                .font(.largeTitle.bold())
            Text(viewModel.subtitle)
                .foregroundStyle(.secondary)
            Text(viewModel.courseMessage)
                .font(.callout.weight(.semibold))
                .foregroundStyle(.blue)
        }
    }

    private var summaryCard: some View {
        HStack(alignment: .center, spacing: 16) {
            VStack(alignment: .leading, spacing: 4) {
                Text(viewModel.progressTitle)
                    .font(.headline)
                Text(viewModel.progressSubtitle)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 4) {
                Text(viewModel.completedCountText)
                    .font(.title2.bold())
                Text(viewModel.pendingCountText)
                    .foregroundStyle(.secondary)
            }
        }
        .padding()
        .background(.white, in: RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(color: .black.opacity(0.06), radius: 20, y: 8)
    }

    private var tasksSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Tâches du cours")
                .font(.headline)

            ForEach(viewModel.tasks) { task in
                HStack(spacing: 12) {
                    Circle()
                        .fill(task.isDone ? Color.green : Color.orange)
                        .frame(width: 12, height: 12)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(task.title)
                            .font(.body.weight(.semibold))
                        Text(task.priority.displayName)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer()
                    if task.isDone {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundStyle(.green)
                    } else {
                        Button("Terminer") {
                            viewModel.markTaskDone(withID: task.id)
                        }
                        .font(.callout.weight(.semibold))
                    }
                }
                .padding()
                .background(.white, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            }
        }
    }
}

#Preview {
    ProductivityHomeView(viewModel: CourseBootstrap.makeHomeViewModel())
}