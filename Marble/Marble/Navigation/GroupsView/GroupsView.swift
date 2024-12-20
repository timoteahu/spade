//
//  GroupsView.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//

import SwiftUI

struct Group: Identifiable, Codable {
    var id: Int
    var name: String
    var join_code: String
    var events: [Events]?
    var members: [Member]
}

struct Member: Hashable, Identifiable, Codable {
    var id: Int
    var username: String
}

struct Events: Hashable, Identifiable, Codable {
    var id: Int
    var title: String
    var description: String
}

struct GroupsView: View {
    @State private var groups: [Group] = []
    @State private var isLoading: Bool = true
    @State private var showAlert: Bool = false
    @State private var alertMessage: String = ""

    var body: some View {
        NavigationView {
            VStack {
                if isLoading {
                    ProgressView("Loading...")
                } else if groups.isEmpty {
                    Text("No Groups Found")
                        .font(.largeTitle)
                        .padding(.top)
                } else {
                    List(groups) { group in
                        VStack(alignment: .leading) {
                            NavigationLink(destination: GroupDetailView(groupId: group.id)){
                                Text(group.name)
                                    .font(.headline)
                                    .padding(.vertical, 5)
                                Text("Join Code: \(group.join_code)")
                                    .font(.subheadline)
                                
                            }
                        }
                        .padding(.vertical, 5)
                    }
                }

                Spacer()
                
                HStack {
                    NavigationLink(destination: CreateGroupView()) {
                        Text("Create a Group")
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .cornerRadius(8)
                    }
                    
                    Button(action: {
                        // Action for joining a group
                    }) {
                        Text("Join a Group")
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.green)
                            .cornerRadius(8)
                    }
                }
                .padding(.horizontal)
                .padding(.top, 10)
                
                Spacer()
            }
            .navigationTitle("Groups")
            .onAppear(perform: fetchGroups)
            .alert(isPresented: $showAlert) {
                Alert(title: Text("Error"), message: Text(alertMessage), dismissButton: .default(Text("OK")))
            }
        }
    }

    func fetchGroups() {
        guard let userId = UserDefaults.standard.string(forKey: "userId") else {
            alertMessage = "User ID not found"
            showAlert = true
            return
        }
        NetworkService.authenticatedRequest(endpoint: "group/\(userId)", method: "GET", body: nil) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    do {
                        // Print the raw data as a string
                        // Inspect the JSON structure
                        let json = try JSONSerialization.jsonObject(with: data, options: [])
                        
                        print(json)
                        // Attempt to decode the data
                        let decodedGroups = try JSONDecoder().decode([Group].self, from: data)
                        self.groups = decodedGroups
                        self.isLoading = false
                    } catch {
                        print(error)
                        alertMessage = "Failed to decode response: \(error.localizedDescription)"
                        showAlert = true
                        self.isLoading = false
                    }
                case .failure(let error):
                    alertMessage = error.localizedDescription
                    showAlert = true
                    self.isLoading = false
                }
            }
        }
    }
}

struct GroupsView_Previews: PreviewProvider {
    static var previews: some View {
        GroupsView()
    }
}
