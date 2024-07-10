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
                Text("Signed In")
                    .font(.largeTitle)
                    .padding()
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

        // Call the API endpoint to sign in
        let url = URL(string: "\(EnvConfig.baseURL)/user")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        let body = ["email": email, "username": username]
        print("Request Body: \(body)") // Add this line to print the request body
        request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: [])
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                DispatchQueue.main.async {
                    alertMessage = "Error: \(error.localizedDescription)"
                    showAlert = true
                }
                return
            }

            guard data != nil else {
                DispatchQueue.main.async {
                    alertMessage = "No data received."
                    showAlert = true
                }
                return
            }

            // Assume a successful response means the user is signed in
            DispatchQueue.main.async {
                isSignedIn = true
                showAlert = false
            }
        }.resume()
    }}
