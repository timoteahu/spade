//
//  CreateEventView.swift
//  Marble
//
//  Created by Jiarong Zhang on 7/16/24.
//

import SwiftUI

struct CreateEventView: View {
    var id : Int
    
    @State private var eventTitle: String = ""
    @State private var eventDescription: String = ""
    @State private var showAlert: Bool = false
    @State private var alertMessage: String = ""
    var body: some View {
        VStack{
            Text("Enter Event Title")
                .padding(10)
            TextField("Enter event Title", text: $eventTitle)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            Text("Enter Event Description")
            TextField("Enter event Description", text: $eventDescription)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            Button(action: {
                createEvent()
            }) {
                Text("Create Event")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: 200)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(8)
            }
            Spacer()
        }
    }
    
    func createEvent () {
        guard !eventTitle.isEmpty, !eventDescription.isEmpty else {
            alertMessage = "Please fill in all the fields"
            showAlert = true
            return
        }
        let body: [String: Any] = ["title": eventTitle, "description": eventDescription]
        
        NetworkService.authenticatedRequest(endpoint: "event/\(id)", method: "POST", body: body) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    do {
                        if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                            print("JSON Response: \(json)")
                            alertMessage = "Event Created Successfully"
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


#Preview {
    CreateEventView(id: 123)
}
