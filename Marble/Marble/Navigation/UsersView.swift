//
//  UsersView.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//

import SwiftUI

struct UsersView: View {
    @State private var isSignedIn = false
    @State private var email = ""
    @State private var username = ""
    @State private var showAlert = false
    @State private var alertMessage = ""

    var body: some View {
        VStack {
            if isSignedIn {
                VStack {
                    Text("Signed In")
                        .font(.largeTitle)
                        .padding()

                    Button(action: {
                        signOut()
                    }) {
                        Text("Sign Out")
                            .foregroundColor(.white)
                            .padding()
                            .background(Color.red)
                            .cornerRadius(8)
                    }
                    .padding()
                }
            } else {
                VStack {
                    Text("Sign In")
                        .font(.largeTitle)
                        .padding()

                    TextField("Email", text: $email)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding()

                    TextField("Username", text: $username)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding()

                    Button(action: {
                        signIn()
                    }) {
                        Text("Sign In")
                            .foregroundColor(.white)
                            .padding()
                            .background(Color.blue)
                            .cornerRadius(8)
                    }
                    .padding()

                    if showAlert {
                        Text(alertMessage)
                            .foregroundColor(.red)
                            .padding()
                    }
                }
                .padding()
            }
        }
    }


    func signIn() {
        // Validate inputs
        guard !email.isEmpty, !username.isEmpty else {
            alertMessage = "Please fill in all fields."
            showAlert = true
            return
        }

        NetworkService.signIn(email: email, username: username) { result in
            DispatchQueue.main.async {
                switch result {
                case .success:
                    isSignedIn = true
                    showAlert = false
                case .failure(let error):
                    alertMessage = "Error: \(error.localizedDescription)"
                    showAlert = true
                }
            }
        }
    }
    
    func signOut() {
        // Sign out logic
        isSignedIn = false
        email = ""
        username = ""
        showAlert = false
        alertMessage = ""
    }
}
