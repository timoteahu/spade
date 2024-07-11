//
//  SplashScreenView.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//

import SwiftUI

struct SplashScreenView: View {
    @State private var isActive = false

    var body: some View {
        VStack {
            if self.isActive {
                ContentView() // Replace with your main view
            } else {
                VStack {
                    Image("spade-image") // Replace with your app logo
                        .resizable()
                        .scaledToFit()
                        .frame(width: 100, height: 100)
                    Text("Spade")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                }
                .transition(.opacity)
            }
        }
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                withAnimation {
                    self.isActive = true
                }
            }
        }
    }
}

struct SplashScreenView_Previews: PreviewProvider {
    static var previews: some View {
        SplashScreenView()
    }
}
