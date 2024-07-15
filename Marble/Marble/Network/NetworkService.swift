//
//  NetworkService.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//

import Foundation
import JWTDecode

//THIS FILE IS USED FOR ALL ENPOINT CALLS. WRITE ALL CONNECTIONS.

class NetworkService {


    static func signIn(email: String, username: String, password: String, completion: @escaping (Result<Bool, Error>) -> Void) {
        guard let url = URL(string: "\(EnvConfig.baseURL)/user") else {
            completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        let body = ["email": email, "username": username, "password": password]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: [])
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        print("ONE")
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            print("TWO")
            guard let data = data else {
                completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                return
            }
            
            // Print the raw data response
            if let responseString = String(data: data, encoding: .utf8) {
                print("Response Data: \(responseString)")
            }
            
            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                    print("JSON Response: \(json)")
                    if let token = json["token"] as? String {
                        print("INSIDE 1")
                        if let tokenData = token.data(using: .utf8) {
                            KeychainHelper.standard.save(tokenData, service: "jwt", account: "userToken")
                            print("Token Data: \(tokenData)")
                            // Decode the JWT token to extract the userId
                            do {
                                let jwt = try decode(jwt: token)
                                print("JWT Decoded: \(jwt)")
                                if let userId = jwt.claim(name: "userId").integer {
                                    print("INSIDE")
                                    // Save the userId to Keychain or UserDefaults if needed
                                    UserDefaults.standard.set(userId, forKey: "userId")
                                    print("User ID: \(userId)")
                                } else {
                                    print("User ID not found in the token")
                                    completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "User ID not found in token"])))
                                }
                            } catch let decodeError {
                                print("Error decoding JWT: \(decodeError.localizedDescription)")
                                completion(.failure(decodeError))
                                return
                            }
                        }
                        
                        completion(.success(true))
                    } else {
                        print("Token not found in the response")
                        completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])))
                    }
                } else {
                    print("Failed to parse JSON response")
                    completion(.failure(NSError(domain: "", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid response"])))
                }
            } catch {
                print("Error decoding JSON: \(error.localizedDescription)")
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
