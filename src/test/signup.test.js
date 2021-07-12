/** @format */

const request = require("supertest");
const app = require("../../app");
const db = require("../test/db");
const User = require("../model/user");

beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());

jest.setTimeout(15000);

describe("Test suite for user signup", () => {
  it("it should create a new user and login", async () => {
    let req = {
      email: "pooja@gmail.com",
      gender: "F",
      fullname: "pooja",
      username: "pooja",
      password: "shubhangi",
      bio: "Nature Lover",
    };
    const res = await request(app).post("/api/user/create").send(req);
    expect(res.status).toBe(200);
    const response = await request(app).post("/api/user/login").send({
      email: "pooja@gmail.com",
      password: "shubhangi",
    });
    expect(response.status).toBe(200);
  });
});
  //test for wrong user name
  it("it should create a new user", async () => {
    let req = {
      email: "dhanshri@gmail.com",
      gender: "M",
      fullname: "dhanshri",
      username: "pooja",
      password: "shubhangi",
      bio: "Nature Lover",
    };
    const res = await request(app).post("/api/user/create").send(req);
    expect(res.status).toBe(500);
  });

  //test for wrong password
  it("it should login a user", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "pooja@gmail.com",
      password: "shubhangi22",
    });
    const token = response.body.token
    expect(response.status).toBe(400);
    // const res = await request(app)
    //   .post("/api/tweet")
    //   .set({ "x-auth-token": token })
    //   .send({
    //     text: "When I asked god for peace, he showed me how to help others.",
    //   });
    // expect(res.status).toBe(500);
  })
