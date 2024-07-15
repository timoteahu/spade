//
//  ContentView.swift
//  Marble
//
//  Created by Timothy Hu on 7/4/24.
//

import SwiftUI



struct ContentView: View {
    @State private var SelectedTab = 0
    @State private var indiv_view = false
    var body: some View {
        TabView {
            EventsView()
                .tabItem {
                    Image(systemName: "calendar")
                    Text("Events")
                }
                .tag(0)
            
            GroupsView()
                .tabItem {
                    Image(systemName: "person.2.fill")
                    Text("Groups")
                }
                .tag(1)
            
            UsersView()
                .tabItem {
                    Image(systemName: "person.fill")
                    Text("Users")
                }
                .tag(2)
            
        }
    }
}

#Preview {
    ContentView()
}
