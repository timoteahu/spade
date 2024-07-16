//
//  EventsView.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//
import SwiftUI

// Dummy data model for events (TO BE DELETED)
struct Event: Identifiable {
    var id = UUID()
    var name: String
    var date: String
}

struct EventsView: View {
    @State private var groups: [Group] = []
    @State private var isLoading: Bool = true
    @State private var showAlert: Bool = false
    @State private var alertMessage: String = ""
    
    var body: some View {
        NavigationView {
            VStack{
                if isLoading {
                    ProgressView("Loading...")
                } else if groups.isEmpty {
                    Text("No groups found")
                        .font(.largeTitle)
                        .padding(.top)
                } else {
                    List(groups) { group in
                        if let events = group.events{
                            if !events.isEmpty{
                        VStack(alignment: .leading) {
                                    Text(group.name)
                                        .font(.title2)
                                        .padding()
                                    VStack(alignment: .leading) {
                                        ForEach(events) { event in
                                            Text("\(event.title) - \(event.description)")
                                                .padding(.bottom, 2)
                                        }
                                    }
                                }
                            .padding(.vertical, 5)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Events")
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

struct EventsView_Previews: PreviewProvider {
    static var previews: some View {
        EventsView()
    }
}
