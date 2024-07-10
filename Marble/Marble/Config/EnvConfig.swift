//
//  EnvConfig.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//

import Foundation

struct EnvConfig {
    static var baseURL: String {
        guard let baseURL = Bundle.main.object(forInfoDictionaryKey: "BASE_URL") as? String else {
            fatalError("BASE_URL not set in plist for this environment")
        }
        return baseURL
    }
}
