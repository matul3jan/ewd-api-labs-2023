import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

const app = request((await import('../app.js')).default);

describe("GET /api/languages", () => {

    it("should return all languages", async () => {
        const res = await app.get("/api/languages");
        expect(res.statusCode).toBe(200);
    });
});