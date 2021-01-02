const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);

describe("GET /tickets", () => {
  it("responds with 200 and returns all tickets", async (done) => {
    try {
      const response = await request.get("/tickets");
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object", done());
    } catch (error) {}
  });
});

describe("Create, find and update ticket", () => {
  let uuid;
  it("responds with 200 if ticket is added to db", async (done) => {
    try {
      const response = await request
        .post("/postTicket")
        .send({ 
          summary: "We need to update the visuals of our website",
          requirements: [
            "Update landing page banner image",
            "Update color scheme to new branding",
            "Update footer copyright to 2021"
          ],
          assigner: "Tim Willaert",
          assignee: undefined,
          deadline: "11/01/2021",
          organisation_id: 1
       });
      expect(response.status).toBe(200);
      uuid = response.body.uuid;
      done();
    } catch (error) {}
  });
  it("finds the recently added record in db", async (done) => {
    try {
      const response = await request.get("/ticket/" + uuid);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
      done();
    } catch (error) {}
  });
  it("responds with 200 if ticket is updated", async (done) => {
    try {
      const response = await request
        .patch("/updateTicket/" + uuid)
        .send({deadline: "13/01/2021"});
      expect(response.status).toBe(200);
      done();
    } catch (error) {}
  })
});

describe("DELETE /deleteTicket", () => {
  it("responds with 400 if no uuid is provided", async (done) => {
    try {
      const response = await request.delete("/deleteTicket").send({});
      expect(response.status).toBe(400);
      done();
    } catch (error) {}
  });
});
