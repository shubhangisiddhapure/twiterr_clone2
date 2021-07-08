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
  describe("Post /create", () => {
    it("it should create a new user", async () => {
      jest.setTimeout(5000);
      const users = db.collection("users");
      // console.log(app);
      let req = {
        email: "maroti222@gmail.com",
        gender: "M",
        fullname: "shree",
        username: "maroti222",
        password: "shubhangi",
        bio: "Nature Lover",
      };
      const res = await request(app).post("/api/user/create").send(req);
      console.log(res.status);
      expect(res.status).toBe(200);
    });
  });
  it("it should log-in a  user", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    // console.log(app);
    let req = {
      email: "maroti222@gmail.com",
      password: "shubhangi",
    };
    const res = await request(app).post("/api/user/login").send(req);
    token = res.body.token;
    // token = res.token
    expect(res.status).toBe(200);
  });
  it("it should log-in a  user", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    let req = {
      text: "do something new",
    };
    const res = await request(app)
      .post("/api/tweet")
      .set({ "x-auth-token": token })
      .send(req);
    expect(res.status).toBe(200);
  });
  beforeEach(async () => {
    await db.collection("users").deleteMany({});
  });
});
