//
//  NetworkService.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//

import Foundation


//THIS FILE IS USED FOR ALL ENPOINT CALLS. WRITE ALL CONNECTIONS.

class NetworkService {
    
    static func signIn(email: String, username: String, completion: @escaping (Result<Bool, Error>) -> Void) {
            // Call the API endpoint to sign in
            guard let url = URL(string: "\(EnvConfig.baseURL)/user") else {
                completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                return
            }

            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            let body = ["email": email, "username": username]
            request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: [])
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")

            URLSession.shared.dataTask(with: request) { data, response, error in
                if let error = error {
                    completion(.failure(error))
                    return
                }

                guard data != nil else {
                    completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                    return
                }

                // Assume a successful response means the user is signed in
                completion(.success(true))
            }.resume()
        }
    
}
