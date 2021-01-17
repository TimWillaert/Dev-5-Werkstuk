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
  if(Helpers.checkParameters({uuid: 'string'}, {uuid: req.params.uuid}, false)){
    const result = await pg
      .select(["uuid", "summary", "requirements", "completed", "assigner", "assignee", "deadline", "organisation_id", "created_at"])
      .from("tickets")
      .where({ uuid: req.params.uuid });
    if(result.length == 0){
      res.status(404).send("Ticket not found");
    } else{
      res.status(200).send(result[0]);
    }
  } else{
    res.status(400).send("Invalid parameters");
  }
});

/**
* POST /ticket
* @param: {uuid, summary, requirements, assigner, assignee, deadline, organisation_id}
* @returns: the uuid of the added ticket
*/
app.post("/ticket", (req, res) => {
  let uuid = Helpers.generateUUID();
  let expectedParams = {
    uuid: 'string',
    summary: 'string',
    requirements: 'array',
    assigner: 'string',
    assignee: 'string',
    deadline: 'string',
    organisation_id: 'string'
  }
  if(Helpers.checkParameters(expectedParams, {
    uuid: uuid,
    summary: req.body.summary,
    requirements: req.body.requirements,
    assigner: req.body.assigner,
    assignee: req.body.assignee,
    deadline: req.body.deadline,
    organisation_id: req.body.organisation_id,
    created_at: new Date()
  }, true)){
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
  } else{
    res.status(400).send("Invalid parameters");
  }
});

/**
* PATCH /ticket/:uuid
* @param: object with the properties that need to be updated/patched
* @returns: status code 200
*/
app.patch("/ticket/:uuid", async (req, res) => {
  if(Helpers.checkParameters({uuid: 'string'}, req.body, true)){
    pg('tickets')
      .where({uuid: req.params.uuid})
      .update(req.body)
      .then(() => {
        res.sendStatus(200);
      })
  } else {
    res.status(400).send("Invalid parameters");
  }
});

/**
* DELETE /ticket
* @param: {uuid}
* @returns: status code 200
*/
app.delete("/ticket", (req, res) => {
  if(Helpers.checkParameters({uuid: 'string'}, {uuid: req.body.uuid}, false)){
    pg('tickets')
      .where({ uuid: req.body.uuid })
      .del()
      .then(() => {
        res.sendStatus(200);
    })
  } else {
    res.status(400).send("Invalid parameters");
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
  const result = await pg
    .select(["uuid", "name", "created_at"])
    .from("organisations");
  res.status(200).send(result);
});

/**
* GET /organisation/uuid
* @param: uuid
* @returns: a specific organisation record from the database by uuid
*/
app.get("/organisation/:uuid", async (req, res) => {
  if(Helpers.checkParameters({uuid: 'string'}, {uuid: req.params.uuid}, false)){
    const result = await pg
      .select(["uuid", "name", "created_at"])
      .from("organisations")
      .where({ uuid: req.params.uuid });
    if(result.length == 0){
      res.status(404).send("Organisation not found");
    } else{
      res.status(200).send(result[0]);
    }
  } else {
    res.status(400).send("Invalid parameters");
  }
});

/**
* POST /organisation
* @param: {uuid, name}
* @returns: the uuid of the added organisation
*/
app.post("/organisation", (req, res) => {
  let uuid = Helpers.generateUUID();
  if(Helpers.checkParameters({uuid: 'string', name: 'string'}, {uuid: uuid, name: req.body.name, created_at: new Date()}, true)){
    pg.insert({
      uuid: uuid,
      name: req.body.name,
      created_at: new Date(),
    })
      .into("organisations")
      .then(() => {
        res.json({ uuid: uuid });
    });
  } else {
    res.status(400).send("Invalid parameters");
  }
});

/**
* PATCH /organisation/:uuid
* @param: object with the properties that need to be updated/patched
* @returns: status code 200
*/
app.patch("/organisation/:uuid", async (req, res) => {
  if(Helpers.checkParameters({uuid: 'string'}, {uuid: req.params.uuid}, true)){
    pg('organisations')
      .where({uuid: req.params.uuid})
      .update(req.body)
      .then(() => {
        res.sendStatus(200);
    })
  } else {
    req.status(400).send("Invalid parameters");
  }
});

/**
* DELETE /organisation
* @param: {uuid}
* @returns: status code 200
*/
app.delete("/organisation", (req, res) => {
  if(Helpers.checkParameters({uuid: 'string'}, {uuid: req.body.uuid}, false)){
    pg('organisations')
      .where({ uuid: req.body.uuid })
      .del()
      .then(() => {
        res.sendStatus(200);
    })
  } else{
    res.status(400).send("Invalid parameters");
  }
});

DatabaseHelper.initialiseTables();

module.exports = app;
