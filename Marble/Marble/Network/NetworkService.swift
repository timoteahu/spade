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

                guard let data = data else {
                    completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                    return
                }

                do {
                    if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
                       let token = json["token"] as? String {
                        if let tokenData = token.data(using: .utf8) {
                            KeychainHelper.standard.save(tokenData, service: "jwt", account: "userToken")
                        }
                        completion(.success(true))
                    } else {
                        completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])))
                    }
                } catch {
                    completion(.failure(error))
                }
            }.resume()
        }
    
    
    
    static func authenticatedRequest(endpoint: String, method: String, body: [String: Any]?, completion: @escaping (Result<Data, Error>) -> Void) {
        guard let url = URL(string: "\(EnvConfig.baseURL)/\(endpoint)") else {
            completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        if let body = body {
            request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: [])
        }
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        if let tokenData = KeychainHelper.standard.read(service: "jwt", account: "userToken"),
           let token = String(data: tokenData, encoding: .utf8) {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        } else {
            completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "No JWT token found"])))
            return
        }

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let data = data else {
                completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                return
            }

            completion(.success(data))
        }.resume()
    }

    
}
