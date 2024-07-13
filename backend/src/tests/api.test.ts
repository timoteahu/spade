import { PrismaClient } from "@prisma/client";
import { createServer, Server } from "http";
import request from "supertest";

import app from "../index"; // Import your Express app

const prisma = new PrismaClient();

interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
}

interface EventResponse extends EventData {
  id: number;
}

describe("POST /api/events", () => {
  let server: Server;

  beforeAll((done) => {
    server = createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    server.close(done);
    prisma.$disconnect();
  });

  it("should create a new event", async () => {
    const eventData: EventData = {
      title: "Test Event",
      description: "This is a test event",
      date: "2023-12-31T00:00:00.000Z",
      location: "Test Location",
    };

    const response = await request(server)
      .post("/api/events")
      .send(eventData)
      .expect("Content-Type", /json/)
      .expect(201);

    const createdEvent = response.body as EventResponse;

    expect(createdEvent).toHaveProperty("id");
    expect(createdEvent.title).toBe(eventData.title);
    expect(createdEvent.description).toBe(eventData.description);
    expect(createdEvent.date).toBe(eventData.date);
    expect(createdEvent.location).toBe(eventData.location);

    // Clean up: delete the created event
    await prisma.event.delete({
      where: {
        id: createdEvent.id,
      },
    });
  });

  it("should return 400 for invalid event data", async () => {
    const invalidEventData = {
      // Missing required fields
      title: "Test Event",
    };

    const response = await request(server)
      .post("/api/events")
      .send(invalidEventData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});
