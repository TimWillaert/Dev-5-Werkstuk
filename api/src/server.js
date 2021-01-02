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

app.get("/test", (req, res) => {
  res.status(200).send();
});

app.get("/", async (req, res) => {
  const result = await pg.select(["uuid", "title", "created_at"]).from("story");
  res.json({
    res: result,
  });
});

app.get("/story/:uuid", async (req, res) => {
  const result = await pg
    .select(["uuid", "title", "created_at"])
    .from("story")
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  });
});

app.get("/storyblock/:uuid", async (req, res) => {
  const result = await pg
    .select(["uuid", "content", "created_at"])
    .from("storyblock")
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  });
});

app.post("/postStoryblock", (req, res) => {
  let uuid = Helpers.generateUUID();
  pg.insert({
    uuid: uuid,
    content: req.body.content,
    created_at: new Date(),
  })
    .into("storyblock")
    .then(() => {
      res.json({ uuid: uuid });
    });
});

app.delete("/deleteStory", (req, res) => {
  if (!req.body.uuid) {
    res.status(404).send();
  }
  //res.json({ uuid: req.body.uuid });
  // pg.where({ uuid: req.params.uuid })
  //   .del()
  //   .then(() => {
  //     res.status(69).send();
  //   });
});

DatabaseHelper.initialiseTables();

module.exports = app;
