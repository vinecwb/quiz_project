import request from "supertest";
import { app, server } from "../src/index.js";

describe("Test Results API", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post("/auth/login").send({
      email: "testeuser@example.com",
      password: "123456",
    });

    token = res.body.token;
  });

  it("should return test results for a user", async () => {
    const res = await request(app)
      .get("/test-results/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("should reject request without token", async () => {
    const res = await request(app).get("/test-results/1");
    expect(res.statusCode).toBe(401);
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (server) {
      server.close();
    }
  });
});
