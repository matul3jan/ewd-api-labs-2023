import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

describe("GET /api/languages", () => {

    const app = request(require("../app"));

    it("should return all languages", async () => {
        const res = await app.get("/api/languages");
        expect(res.statusCode).toBe(200);
    });
});