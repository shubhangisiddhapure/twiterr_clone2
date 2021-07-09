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
  it("it should log-in a  user", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    let req = {
      email: "maroti222@gmail.com",
      password: "shubhangi",
    };
    const res = await request(app).post("/api/user/login").send(req);
    token = res.body.token;
    expect(res.status).toBe(200);
    const response = await request(app)
      .post("/api/tweet")
      .set({ "x-auth-token": token })
      .send({
        text: "When I asked god for peace, he showed me how to help others.",
      });

    expect(response.status).toBe(200);
  });
  //testing with wrong token
  it("it should log-in a  user", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    const response = await request(app)
      .post("/api/tweet")
      .set({ "x-auth-token": token + "sss" })
      .send({
        text: "This will be a new journey where you will all be working on the a new problem statement in the next few weeks.",
      });
    expect(response.status).toBe(200);
  });
  //get all tweet for feed page.
  it("it should get all tweet", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    const response = await request(app)
      .get("/api/alltweet")
      .set({ "x-auth-token": token });

    expect(response.status).toBe(200);
  });
  //test for do Like and unLike
  it("it should do a like or unlike to post", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    const response = await request(app)
      .put("/api/tweet/toggleLike")
      .set({ "x-auth-token": token })
      .send({ id: "60e830b94648ca5508b87ce2" });
    console.log(response);
    expect(response.status).toBe(200);
  });
  //test for do Like and unLike with incorrecte tweet id
  it("it should do a like or unlike to post", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    const response = await request(app)
      .put("/api/tweet/toggleLike")
      .set({ "x-auth-token": token })
      .send({ id: "60e6f8fc2ef5f6002205b210" });
    expect(response.status).toBe(200);
  });
  //testing for add a comment
  it("it should a added a comment on post", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    const response = await request(app)
      .put("/api/tweet/replaytweet")
      .set({ "x-auth-token": token })
      .send({ id: "60e830b94648ca5508b87ce2", text: "I am ready for this" });
    expect(response.status).toBe(200);
  });
  //testing for add a comment with incorrect tweet id
  it("it should a added a comment on post", async () => {
    jest.setTimeout(5000);
    const users = db.collection("users");
    const response = await request(app)
      .put("/api/tweet/replaytweet")
      .set({ "x-auth-token": token })
      .send({ id: "60e6f8fc2ef5f6002205b210", text: "I am ready for this" });
    expect(response.status).toBe(200);
  });
  beforeEach(async () => {
    await db.collection("users").deleteMany({});
  });
});
