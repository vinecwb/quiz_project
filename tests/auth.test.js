import request from "supertest";
import { app, server } from "../src/index.js";

describe("Auth API", () => {
  let token;

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (server && server.close) {
      server.close();
    }
  });

  it("should register a new user", async () => {
    const randomEmail = `user${Math.floor(Math.random() * 10000)}@example.com`;

    const res = await request(app).post("/auth/register").send({
      name: "Teste",
      lastname: "User",
      email: randomEmail,
      password: "123456",
      isTeacher: false,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("id");
  });

  it("should log in the user and return a token", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "testeuser@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should reject login with incorrect password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "testeuser@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
  });
});
