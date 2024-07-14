//
//  GroupsView.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//

import SwiftUI

// Dummy data model for groups (TO BE DELETED)
struct Group: Identifiable {
    var id = UUID()
    var name: String
    var description: String
}

// Dummy data for groups (TO BE DELETED)
let groupsData = [
    Group(name: "Group 1", description: "Description for Group 1"),
    Group(name: "Group 2", description: "Description for Group 2"),
    Group(name: "Group 3", description: "Description for Group 3"),
    Group(name: "Group 4", description: "Description for Group 4"),
    Group(name: "Group 5", description: "Description for Group 5"),
    Group(name: "Group 6", description: "Description for Group 6")
]

struct GroupsView: View {
    var groups: [Group] = groupsData
    
    var body: some View {
        NavigationView {
            List(groups) { group in
                VStack(alignment: .leading) {
                    Text(group.name)
                        .font(.headline)
                    Text(group.description)
                        .font(.subheadline)
                }
                .padding(.vertical, 5)
            }
            .navigationTitle("Groups")
        }
    }
}

struct GroupsView_Previews: PreviewProvider {
    static var previews: some View {
        GroupsView()
    }
}
