//
//  CreateGroupView.swift
//  Marble
//
//  Created by Timothy Hu on 7/14/24.
//

import SwiftUI

struct CreateGroupView: View {
    @State private var groupName: String = ""
    @State private var showAlert: Bool = false
    @State private var alertMessage: String = ""

    var body: some View {
        VStack {
            TextField("Enter group name", text: $groupName)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()

            Button(action: {
                createGroup()
            }) {
                Text("Create Group")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(8)
            }
            .padding()
            
            Spacer()
        }
        .padding()
        .navigationTitle("Create Group")
        .alert(isPresented: $showAlert) {
            Alert(title: Text("Error"), message: Text(alertMessage), dismissButton: .default(Text("OK")))
        }
    }

    func createGroup() {
        guard !groupName.isEmpty else {
            alertMessage = "Group name cannot be empty"
            showAlert = true
            return
        }

        guard let userId = UserDefaults.standard.string(forKey: "userId") else {
            alertMessage = "User ID not found"
            showAlert = true
            return
        }

        let body: [String: Any] = ["name": groupName, "userId": userId]
        NetworkService.authenticatedRequest(endpoint: "group", method: "POST", body: body) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    do {
                        if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                            print("JSON Response: \(json)")
                            alertMessage = "Group created successfully"
                            showAlert = true
                        } else {
                            alertMessage = "Invalid response"
                            showAlert = true
                        }
                    } catch {
                        alertMessage = "Error decoding response: \(error.localizedDescription)"
                        showAlert = true
                    }
                case .failure(let error):
                    alertMessage = error.localizedDescription
                    showAlert = true
                }
            }
        }
    }
}

struct CreateGroupView_Previews: PreviewProvider {
    static var previews: some View {
        CreateGroupView()
    }
}
