//
//  ContentView.swift
//  Marble
//
//  Created by Timothy Hu on 7/4/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            
            EventsView()
                .tabItem {
                    Image(systemName: "calendar")
                    Text("Events")
                }
            
            GroupsView()
                .tabItem {
                    Image(systemName: "person.2.fill")
                    Text("Groups")
                }
            
            UsersView()
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("Users")
                }
            
        }
    }
}

#Preview {
    ContentView()
}
