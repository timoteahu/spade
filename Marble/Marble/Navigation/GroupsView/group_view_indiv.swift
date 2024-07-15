//
//  group_view_indiv.swift
//  Marble
//
//  Created by Jiarong Zhang on 7/15/24.
//

import SwiftUI

struct MainView: View {
    var group: Group
    var body: some View {
        Text("hello")
    }
}

struct MemberView: View {
    var group: Group
    var body: some View {
        Text("hello")
    }
}

struct eventsView: View {
    var group: Group
    var body: some View {
        Text("events")
    }
}

class DropdownViewModel: ObservableObject {
    @Published var selectedOption: String? = nil
    let options = ["Members", "Events"]
}

struct group_view_indiv: View {
    @StateObject private var viewModel = DropdownViewModel()
    @State private var cur: String? = nil
    var group: Group
    
    let viewNames = ["members","events"]
    var body: some View {
        VStack{
            Menu {
                ForEach(viewModel.options, id: \.self) { option in
                    Button(action: {
                        viewModel.selectedOption = option
                    }) {
                        Text(option)
                    }
                }
            } label: {
                Text(viewModel.selectedOption ?? "Members")
                    .padding()
                    .frame(minWidth: 700, minHeight: 50)
                    .foregroundColor(.white)
                    .background(Color.green)
                    .cornerRadius(8)
            }
            .accentColor(.white)
            .padding(15)
            VStack{
                if viewModel.selectedOption == "Members" {
                    MemberView(group: group)
                }
                else if viewModel.selectedOption == "Events" {
                    eventsView(group:group)
                }
                else {
                    MemberView(group:group)
                }
            }
            Spacer()
        }
    }
}


struct group_view_indiv_Previews: PreviewProvider {
    static var previews: some View {
        group_view_indiv(group: Group(id: 123, name: "testing", join_code: "123", events: [], members: []))
    }
}
