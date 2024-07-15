//
//  GroupDetailView.swift
//  Marble
//
//  Created by Jiarong Zhang on 7/15/24.
//

import SwiftUI

struct GroupDetailView: View {
    var groupId: Int
    @State private var group: Group?
    @State private var isLoading: Bool = false
    @State private var errorMessage: String?


    var body: some View {
        VStack(alignment: .leading) {
            if isLoading {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle())
                    .navigationBarTitle("Loading...", displayMode: .inline)
            } else if let newGroup = group {
                Text(newGroup.name)
                    .font(.largeTitle)
                    .padding(.bottom, 10)

                Text("Join Code: \(newGroup.join_code)")
                    .font(.subheadline)
                    .padding(.bottom, 20)

                Text("Members")
                    .font(.headline)
                    .padding(.bottom, 5)
                ForEach(newGroup.members) { member in
                    Text(member.username)
                        .padding(.bottom, 2)
                }

                
                Text("Events")
                    .font(.headline)
                    .padding(.top, 20)
                    .padding(.bottom, 5)
                if let events = newGroup.events {
                    ForEach(events) { event in
                        Text("\(event.title) - \(event.description)")
                            .padding(.bottom, 2)
                    }
                }

                Spacer()
            } else if let errorMessage = errorMessage {
                Text(errorMessage)
                    .foregroundColor(.red)
                    .padding()
                    .navigationBarTitle("Error", displayMode: .inline)
            } else {
                Text("Group not found")
                    .navigationBarTitle("Error", displayMode: .inline)
            }
        }
        .padding()
        .navigationBarTitle(group?.name ?? "Group Details", displayMode: .inline)
        .onAppear {
            fetchGroupDetails(groupId: groupId)
        }
    }
    
    func fetchGroupDetails(groupId: Int) {
        isLoading = true
        errorMessage = nil
        
        NetworkService.authenticatedRequest(endpoint: "group/groups/\(groupId)", method: "GET", body: nil) { result in
            DispatchQueue.main.async {
                self.isLoading = false
                switch result {
                case .success(let data):
                    do {
                        let group = try JSONDecoder().decode(Group.self, from: data)
                        self.group = group
                    } catch {
                        self.errorMessage = "Failed to decode group details"
                    }
                case .failure(let error):
                    self.errorMessage = error.localizedDescription
                }
            }
        }
    }
}



