import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";

let app, accountId;

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DATABASE_URL);
    app = request((await import('../app.js')).default);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("POST /api/accounts", () => {
    it("should create a new account", async () => {
        const res = await app.post("/api/accounts").send({
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "Password@12345",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("firstName", "John");
        expect(res.body).toHaveProperty("lastName", "Doe");
        expect(res.body).toHaveProperty("email", "johndoe@example.com");
        accountId = res.body.id;
    });

    it("should return an error if account creation fails", async () => {
        const res = await app.post("/api/accounts").send({
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(500);
    });

});

describe("GET /api/accounts", () => {
    it("should return all accounts", async () => {
        const res = await app.get("/api/accounts");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});


describe("GET /api/accounts/:id", () => {
    it("should return the specified account", async () => {
        const res = await app.get(`/api/accounts/${accountId}`);
        expect(res.statusCode).toBe(200);
    });
});

describe("PUT /api/accounts/:id", () => {
    it("should update the specified account", async () => {
        const res = await app.put(`/api/accounts/${accountId}`).send({
            firstName: "Jane",
            lastName: "Dae"
        });
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /api/accounts/:id/favourites", () => {
    it("should add a favorite movie to the specified account", async () => {
        const res = await app.post(`/api/accounts/${accountId}/favourites`).send({
            movieId: "789012"
        });
        expect(res.statusCode).toBe(200);
    });

    it("should return 400 if the request data is invalid", async () => {
        const res = await app.post("/api/accounts/INVALID_ID/favourites").send({});
        expect(res.statusCode).toBe(500);
    });
});

describe("POST /api/accounts/security/token", () => {
    it("should authenticate an account and return a token", async () => {
        const res = await app.post("/api/accounts/security/token").send({
            email: "johndoe@example.com", password: "Password@12345"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("user");
    });

    it("should return 401 if the authentication fails", async () => {
        const res = await app.post("/api/accounts/security/token").send({
            email: "invalid@example.com", password: "invalidpassword"
        });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("error", "Unauthorised");
    });
});

