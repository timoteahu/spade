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
    @State private var password = ""
    @State private var showAlert = false
    @State private var alertMessage = ""

    var body: some View {
        VStack {
            if isSignedIn {
                VStack {
                    Text("Signed In")
                        .font(.largeTitle)
                        .padding()
                    
                    Text("\(username)")
                        .font(.subheadline)
                        .padding()
                    
                    Text("\(email)")
                        .font(.subheadline)
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
                    
                    SecureField("Password", text: $password)
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
        .onAppear {
            // Check if user info is stored in UserDefaults
            if let storedEmail = UserDefaults.standard.string(forKey: "userEmail"),
               let storedUsername = UserDefaults.standard.string(forKey: "userUsername") {
                email = storedEmail
                username = storedUsername
                isSignedIn = true
            }
        }
    }

    func signIn() {
        // Validate inputs
        guard !email.isEmpty, !username.isEmpty, !password.isEmpty else {
            alertMessage = "Please fill in all fields."
            showAlert = true
            return
        }

        NetworkService.signIn(email: email, username: username, password: password) { result in
            DispatchQueue.main.async {
                switch result {
                case .success:
                    UserDefaults.standard.set(email, forKey: "userEmail")
                    UserDefaults.standard.set(username, forKey: "userUsername")
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
        password = ""
        showAlert = false
        alertMessage = ""

        // Remove user info from UserDefaults
        UserDefaults.standard.removeObject(forKey: "userEmail")
        UserDefaults.standard.removeObject(forKey: "userUsername")
    }
}
