import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

const app = request(require("../app"));
let movieId;

describe("GET /api/movies", () => {
    it("should return all movies", async () => {
        const res = await app.get("/api/movies");
        expect(res.statusCode).toBe(200);
        movieId = res.body.results[0].id;
    });
});

describe("GET /api/movies/:id", () => {
    it("should return a specific movie", async () => {
        const res = await app.get(`/api/movies/${movieId}`);
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/movies/:id/images", () => {
    it("should return movie images", async () => {
        const res = await app.get(`/api/movies/${movieId}/images`);
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/movies/:id/reviews", () => {
    it("should return movie reviews", async () => {
        const res = await app.get(`/api/movies/${movieId}/reviews`);
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/movies/:id/recommendations", () => {
    it("should return movie recommendations", async () => {
        const res = await app.get(`/api/movies/${movieId}/recommendations`);
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/movies/:id/similar", () => {
    it("should return similar movies", async () => {
        const res = await app.get(`/api/movies/${movieId}/similar`);
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/movies/:id/credits", () => {
    it("should return movie credits", async () => {
        const res = await app.get(`/api/movies/${movieId}/credits`);
        expect(res.statusCode).toBe(200);
    });
});