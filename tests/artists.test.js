import dotenv from "dotenv";
import request from "supertest";

dotenv.config();

let artistId;

describe("GET /api/artists", () => {

    const app = request(require("../app"));

    it("should return all artists", async () => {
        const res = await app.get("/api/artists");
        expect(res.statusCode).toBe(200);
        artistId = res.body.results[0].id;
    });

    it("should return a specific artist", async () => {
        const res = await app.get(`/api/artists/${artistId}`);
        expect(res.statusCode).toBe(200);
    });
});