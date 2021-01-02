const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);

describe("GET /test", () => {
  test("responds with 200", async (done) => {
    try {
      await request.get("/test").expect(200, done());
    } catch (error) {}
  });
});

describe("GET /", () => {
  it("responds", async (done) => {
    try {
      const response = await request.get("/");
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object", done());
    } catch (error) {}
  });
});

describe("POST /postStoryblock", () => {
  let uuid;
  it("responds with 400 if record is added to db", async (done) => {
    try {
      const response = await request
        .post("/postStoryblock")
        .send({ content: "Harry Potter" });
      expect(response.status).toBe(400, done());
      uuid = respone.body.uuid;
    } catch (error) {}
  });
  it("finds the recently added record in db", async (done) => {
    try {
      const response = await request.get("/storyblock/" + uuid);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object", done());
    } catch (error) {}
  });
});

describe("DELETE /deleteStory", () => {
  it("responds with 404 if no uuid is provided", async (done) => {
    try {
      const response = await request.delete("/deleteStory").send({});
      expect(response.status).toBe(404, done());
    } catch (error) {}
  });
});
