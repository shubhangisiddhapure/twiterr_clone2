/** @format */

// /** @format */
// const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../../app");
const db = require("../test/db");

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
});
it("it should log-in a  user", async () => {
  let req = {
    email: "pooja@gmail.com",
    password: "shubhangi",
  };
  const res = await request(app).post("/api/user/login").send(req);
  token = res.body.token;
  expect(res.status).toBe(200);
});

it("it should log-in a  user", async () => {
  const response = await request(app)
    .post("/api/tweet")
    .set({ "x-auth-token": token })
    .send({
      text: "When I asked god for peace, he showed me how to help others.",
    });
  expect(response.status).toBe(200);
});
beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());
jest.setTimeout(15000);

//get all tweet for feed page.
it("it should get all tweet", async () => {
  const response = await request(app)
    .get("/api/alltweet")
    .set({ "x-auth-token": token });
  expect(response.status).toBe(200);
});

it("it should add a tweet", async () => {
  const response = await request(app)
    .post("/api/tweet")
    .set({ "x-auth-token": token })
    .send({
      text: "When I asked god for peace, he showed me how to help others.",
    });
    console.log(response.body.data._id);
    id = response.body.data._id;
  expect(response.status).toBe(200);
});
//testing with wrong token
it("it should add a tweet", async () => {
  const response = await request(app)
    .post("/api/tweet")
    .set({ "x-auth-token": token + "sss" })
    .send({
      text: "Do something New",
    });
  expect(response.status).toBe(401);
});

// test for do Like and unLike
it("it should do a like or unlike to post", async () => {
  const response = await request(app)
    .put("/api/tweet/toggleLike")
    .set({ "x-auth-token": token })
    .send({ id: id });
//   console.log(response);
  expect(response.status).toBe(200);
});
//test for do Like and unLike with incorrecte tweet id
it("it should do a like or unlike to post", async () => {

  const response = await request(app)
    .put("/api/tweet/toggleLike")
    .set({ "x-auth-token": token })
    .send({ id: "60e6f8fc2ef5f6002205b210" });
  expect(response.status).toBe(404);
});

//testing for add a comment
it("it should a added a comment on post", async () => {

  const response = await request(app)
    .put("/api/tweet/replaytweet")
    .set({ "x-auth-token": token })
    .send({ id: id, text: "I am ready for this" });
  expect(response.status).toBe(200);
});
//testing for add a comment with incorrect tweet id
it("it should a added a comment on post", async () => {

  const response = await request(app)
    .put("/api/tweet/replaytweet")
    .set({ "x-auth-token": token })
    .send({ id: "60e6f8fc2ef5f6002205b210", text: "I am ready for this" });
  expect(response.status).toBe(404);
});
