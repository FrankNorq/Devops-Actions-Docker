import request from "supertest";
import { jest } from "@jest/globals";

// Mocka 'pg' innan appen importeras
jest.unstable_mockModule("pg", () => {
  const queryMock = jest.fn();
  return {
    Pool: jest.fn(() => ({
      query: (sql, params) => queryMock(sql, params),
    })),
    __queryMock: queryMock,
  };
});

// Hämta mockens handle och appen efter mockningen
const { __queryMock } = await import("pg");
const { default: app } = await import("../app.js");

describe("API", () => {
  beforeEach(() => {
    __queryMock.mockReset();
  });

  test("GET /api/ok returnerar {status:'ok'}", async () => {
    const res = await request(app).get("/api/ok");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("GET /api/error ger 500 och meddelande", async () => {
    const res = await request(app).get("/api/error");
    expect(res.status).toBe(500);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toMatch(/Avsiktligt fel/i);
  });

  test("POST /api/data skapar tabell och sparar message", async () => {
    __queryMock
      .mockResolvedValueOnce({}) // CREATE TABLE
      .mockResolvedValueOnce({ rows: [{ id: 42 }] }); // INSERT RETURNING

    const res = await request(app)
      .post("/api/data")
      .send({ message: "hej" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 42, status: "success" });
    expect(__queryMock).toHaveBeenCalledWith(
      "INSERT INTO messages (text) VALUES ($1) RETURNING id",
      ["hej"]
    );
  });

  test("POST /api/data hanterar DB-fel", async () => {
    __queryMock.mockRejectedValueOnce(new Error("db is down"));
    const res = await request(app).post("/api/data").send({ message: "x" });
    expect(res.status).toBe(500);
    expect(res.body.status).toBe("error");
  });
});
