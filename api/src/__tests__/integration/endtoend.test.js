const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);

describe("end to end test", () => {
    let organisationID;
    let ticketID;
    it("creates an organisation", async (done) => {
        try {
            const response = await request
                .post("/organisation")
                .send({
                    name: "Erasmushogeschool Brussel"
                });
            expect(response.status).toBe(200);
            organisationID = response.body.uuid;
            done();
        } catch (error) {}
    });
    it("finds the recently added organisation", async(done) => {
        try {
            const response = await request
                .get("/organisation/" + organisationID)
            expect(response.status).toBe(200);
            expect(response.body.name).toBe("Erasmushogeschool Brussel");
            done();
        } catch (error) {}
    })
    it("updates the organisation", async (done) => {
        try {
            const response = await request
                .patch("/organisation/" + organisationID)
                .send({name: "EhB"});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("finds the updated organisation with the updated property", async(done) => {
        try {
            const response = await request
                .get("/organisation/" + organisationID)
            expect(response.status).toBe(200);
            expect(response.body.name).toBe("EhB");
            done();
        } catch (error) {}
    })
    it("creates a ticket", async (done) => {
        try {
            const response = await request
                .post("/ticket")
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
                organisation_id: organisationID
            });
            expect(response.status).toBe(200);
            ticketID = response.body.uuid;
            done();
        } catch (error) {}
    })
    it("finds the recently added ticket", async(done) => {
        try {
            const response = await request
                .get("/ticket/" + ticketID)
            expect(response.status).toBe(200);
            expect(response.body.assigner).toBe("Tim Willaert");
            done();
        } catch (error) {}
    })
    it("assigns a developer to ticket", async (done) => {
        try {
            const response = await request
                .patch("/ticket/" + ticketID)
                .send({assignee: "Chiel Habils"});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("finds the updated ticket with the updated property", async(done) => {
        try {
            const response = await request
                .get("/ticket/" + ticketID)
            expect(response.status).toBe(200);
            expect(response.body.assignee).toBe("Chiel Habils");
            done();
        } catch (error) {}
    })
    it("marks the ticket as complete", async (done) => {
        try {
            const response = await request
                .patch("/ticket/" + ticketID)
                .send({completed: true});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("finds the updated ticket with the updated property", async(done) => {
        try {
            const response = await request
                .get("/ticket/" + ticketID)
            expect(response.status).toBe(200);
            console.log(response.body)
            expect(response.body.completed).toBe(true);
            done();
        } catch (error) {}
    })
    it("deletes the ticket", async (done) => {
        try {
            const response = await request
                .delete("/ticket")
                .send({uuid: ticketID});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("no longer finds the ticket because it was deleted", async(done) => {
        try {
            const response = await request
                .get("/ticket/" + ticketID)
            console.log(response.body);
            expect(response.status).toBe(404);
            done();
        } catch (error) {}
    })
    it("deletes the organisation", async (done) => {
        try {
            const response = await request
                .delete("/organisation")
                .send({uuid: organisationID});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("no longer finds the organisation because it was deleted", async(done) => {
        try {
            const response = await request
                .get("/ticket/" + organisationID)
            console.log(response.body);
            expect(response.status).toBe(404);
            done();
        } catch (error) {}
    })
});