/** @format */
const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../../app");

describe("testing", () => {
  let connection;
  let db;

  beforeAll(async () => {
    console.log(global.__MONGO_URI__);
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });
  it("it should create a new user and login", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    let req = {
      email: "getu@gmail.com",
      gender: "M",
      fullname: "shubham",
      username: "getu",
      password: "shubhangi",
      bio: "Nature Lover",
    };
    const res = await request(app).post("/api/user/create").send(req);
    console.log(res.status);
    expect(res.status).toBe(200);
    const response = await request(app).post("/api/user/login").send({
      email: "getu@gmail.com",
      password: "shubhangi",
    });
    token = response.body.token;
    expect(response.status).toBe(200);
  });
  //test for wrong user name
  it("it should create a new user", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    let req = {
      email: "dhanshri@gmail.com",
      gender: "M",
      fullname: "dhanshri",
      username: "dhanshri",
      password: "shubhangi",
      bio: "Nature Lover",
    };
    const res = await request(app).post("/api/user/create").send(req);
    expect(res.status).toBe(200);
  });
  //test for wrong password
  it("it should login a user", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    const response = await request(app).post("/api/user/login").send({
      email: "maroti22@gmail.com",
      password: "shubhangi33",
    });
    token = response.body.token;
    expect(response.status).toBe(200);
  });
  beforeEach(async () => {
    await db.collection("users").deleteMany({});
  });
});
