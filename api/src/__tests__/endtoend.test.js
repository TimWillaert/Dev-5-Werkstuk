const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);

describe("end to end test", () => {
    let organisationID;
    let ticketID;
    it("creates an organisation", async (done) => {
        try {
            const response = await request
                .post("/postOrganisation")
                .send({
                    name: "Erasmushogeschool Brussel"
                });
            expect(response.status).toBe(200);
            organisationID = response.body.uuid;
            done();
        } catch (error) {}
    });
    it("updates the organisation", async (done) => {
        try {
            const response = await request
                .patch("/updateOrganisation/" + organisationID)
                .send({name: "EhB"});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("creates a ticket", async (done) => {
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
                organisation_id: organisationID
            });
            expect(response.status).toBe(200);
            ticketID = response.body.uuid;
            done();
        } catch (error) {}
    })
    it("assigns a developer to ticket", async (done) => {
        try {
            const response = await request
                .patch("/updateTicket/" + ticketID)
                .send({assignee: "Chiel Habils"});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("marks the ticket as complete", async (done) => {
        try {
            const response = await request
                .patch("/updateTicket/" + ticketID)
                .send({completed: true});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("deletes the ticket", async (done) => {
        try {
            const response = await request
                .delete("/deleteTicket")
                .send({uuid: ticketID});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
    it("deletes the organisation", async (done) => {
        try {
            const response = await request
                .delete("/deleteOrganisation")
                .send({uuid: organisationID});
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })
});