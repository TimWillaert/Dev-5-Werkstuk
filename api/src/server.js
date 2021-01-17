const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const Helpers = require("./utils/helpers.js");
const DatabaseHelper = require("./utils/DatabaseHelper.js");

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

app.get("/tickets", async (req, res) => {
  const result = await pg.select(["uuid", "summary", "requirements", "assigner", "assignee", "deadline", "organisation_id", "created_at"]).from("tickets");
  res.json({
    res: result,
  });
});

app.get("/ticket/:uuid", async (req, res) => {
  const result = await pg
    .select(["uuid", "summary", "requirements", "assigner", "assignee", "deadline", "organisation_id", "created_at"])
    .from("tickets")
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  });
});

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

app.patch("/ticket/:uuid", async (req, res) => {
  pg('tickets')
    .where({uuid: req.params.uuid})
    .update(req.body)
    .then(() => {
      res.sendStatus(200);
    })
});

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

app.get("/organisations", async (req, res) => {
  const result = await pg.select(["uuid", "name", "created_at"]).from("organisations");
  res.json({
    res: result,
  });
});

app.get("/organisation/:uuid", async (req, res) => {
  const result = await pg
    .select(["uuid", "name", "created_at"])
    .from("organisations")
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  });
});

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

app.patch("/organisation/:uuid", async (req, res) => {
  pg('organisations')
    .where({uuid: req.params.uuid})
    .update(req.body)
    .then(() => {
      res.sendStatus(200);
    })
});

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
