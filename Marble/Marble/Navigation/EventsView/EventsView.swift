//
//  EventsView.swift
//  Marble
//
//  Created by Timothy Hu on 7/10/24.
//
import SwiftUI

// Dummy data model for events (TO BE DELETED)
struct Event: Identifiable {
    var id = UUID()
    var name: String
    var date: String
}

// Dummy data for events (TO BE DELETED)
let eventsData = [
    Event(name: "Event 1", date: "2024-07-15"),
    Event(name: "Event 2", date: "2024-07-16"),
    Event(name: "Event 3", date: "2024-07-17"),
    Event(name: "Event 4", date: "2024-07-15"),
    Event(name: "Event 5", date: "2024-07-16"),
    Event(name: "Event 6", date: "2024-07-17")

]

struct EventsView: View {
    var events: [Event] = eventsData
    
    var body: some View {
        NavigationView {
            List(events) { event in
                VStack(alignment: .leading) {
                    Text(event.name)
                        .font(.headline)
                    Text(event.date)
                        .font(.subheadline)
                }
                .padding(.vertical, 5)
            }
            .navigationTitle("Events")
        }
    }
}

struct EventsView_Previews: PreviewProvider {
    static var previews: some View {
        EventsView()
    }
}
