const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const Helpers = require("./utils/helpers.js");
const DatabaseHelper = require("./utils/DatabaseHelper.js");
const { send } = require("process");

const pg = require("knex")({
  client: "pg",
  version: "9.6",
  searchPath: ["knex", "public"],
  connection: process.env.PG_CONNECTION_STRING
    ? process.env.PG_CONNECTION_STRING
    : "postgres://example:example@localhost:5432/test",
});

const app = express();
http.Server(app);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

/******************* */
/* TICKETS ENDPOINTS */
/******************* */

/**
* GET /tickets
* @param: none
* @returns: all ticket records from the database
*/
app.get("/tickets", async (req, res) => {
  const result = await pg
    .select(["uuid", "summary", "requirements", "completed", "assigner", "assignee", "deadline", "organisation_id", "created_at"])
    .from("tickets");
  res.status(200).send(result);
});

/**
* GET /ticket/uuid
* @param: uuid
* @returns: a specific ticket record from the database by uuid
*/
app.get("/ticket/:uuid", async (req, res) => {
  const result = await pg
    .select(["uuid", "summary", "requirements", "completed", "assigner", "assignee", "deadline", "organisation_id", "created_at"])
    .from("tickets")
    .where({ uuid: req.params.uuid });
  if(result.length == 0){
    res.status(404).send("Ticket not found");
  } else{
    res.status(200).send(result[0]);
  }
});

/**
* POST /ticket
* @param: {uuid, summary, requirements, assigner, assignee, deadline, organisation_id}
* @returns: TODO
*/
app.post("/ticket", (req, res) => {
  let uuid = Helpers.generateUUID();
  pg.insert({
    uuid: uuid,
    summary: req.body.summary,
    requirements: req.body.requirements,
    assigner: req.body.assigner,
    assignee: req.body.assignee,
    deadline: req.body.deadline,
    organisation_id: req.body.organisation_id,
    created_at: new Date(),
  })
    .into("tickets")
    .then(() => {
      res.json({ uuid: uuid });
    });
});

/**
* PATCH /ticket/:uuid
* @param: object with the properties that need to be updated/patched
* @returns: TODO
*/
app.patch("/ticket/:uuid", async (req, res) => {
  pg('tickets')
    .where({uuid: req.params.uuid})
    .update(req.body)
    .then(() => {
      res.sendStatus(200);
    })
});

/**
* DELETE /ticket
* @param: {uuid}
* @returns: TODO
*/
app.delete("/ticket", (req, res) => {
  if (!req.body.uuid) {
    res.status(400).send();
  } else{
    pg('tickets')
      .where({ uuid: req.body.uuid })
      .del()
      .then(() => {
        res.sendStatus(200);
    })
  }
});

/************************* */
/* ORGANISATIONS ENDPOINTS */
/************************* */

/**
* GET /organisations
* @param: none
* @returns: all organisation records from the database
*/
app.get("/organisations", async (req, res) => {
  const result = await pg.select(["uuid", "name", "created_at"]).from("organisations");
  res.sendStatus(200);
  res.json({
    result
  });
});

/**
* GET /organisation/uuid
* @param: uuid
* @returns: a specific organisation record from the database by uuid
*/
app.get("/organisation/:uuid", async (req, res) => {
  const result = await pg
    .select(["uuid", "name", "created_at"])
    .from("organisations")
    .where({ uuid: req.params.uuid });
  if(result.length == 0){
    res.status(404).send("Organisation not found");
  } else{
    res.status(200).send(result[0]);
  }
});

/**
* POST /organisation
* @param: {uuid, name}
* @returns: TODO
*/
app.post("/organisation", (req, res) => {
  let uuid = Helpers.generateUUID();
  pg.insert({
    uuid: uuid,
    name: req.body.name,
    created_at: new Date(),
  })
    .into("organisations")
    .then(() => {
      res.json({ uuid: uuid });
    });
});

/**
* PATCH /organisation/:uuid
* @param: object with the properties that need to be updated/patched
* @returns: TODO
*/
app.patch("/organisation/:uuid", async (req, res) => {
  pg('organisations')
    .where({uuid: req.params.uuid})
    .update(req.body)
    .then(() => {
      res.sendStatus(200);
    })
});

/**
* DELETE /organisation
* @param: {uuid}
* @returns: TODO
*/
app.delete("/organisation", (req, res) => {
  if (!req.body.uuid) {
    res.status(400).send();
  } else{
    pg('organisations')
      .where({ uuid: req.body.uuid })
      .del()
      .then(() => {
        res.sendStatus(200);
    })
  }
});

DatabaseHelper.initialiseTables();

module.exports = app;
