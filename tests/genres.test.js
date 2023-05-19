import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";

let app;
dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DATABASE_URL);
    app = request((await import('../app.js')).default);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("GET /api/genres", () => {
    it("should return all genres", async () => {
        const res = await app.get("/api/genres");
        expect(res.statusCode).toBe(200);
    });
});