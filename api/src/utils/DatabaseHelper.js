const Helpers = require("../utils/helpers.js");

const pg = require("knex")({
    client: "pg",
    version: "9.6",
    searchPath: ["knex", "public"],
    connection: process.env.PG_CONNECTION_STRING
      ? process.env.PG_CONNECTION_STRING
      : "postgres://example:example@localhost:5432/test",
  });

const DatabaseHelper = {
    async initialiseTables() {
        await pg.schema.hasTable("tickets").then(async (exists) => {
          if (!exists) {
            await pg.schema
              .createTable("tickets", (table) => {
                table.increments();
                table.uuid("uuid");
                table.boolean("completed");
                table.string("summary");
                table.specificType("requirements", "text ARRAY");
                table.string("assigner");
                table.string("assignee");
                table.string("deadline");
                table.string("organisation_id");
                table.timestamps(true, true);
              })
              .then(async () => {
                console.log("created table tickets");
              });
          } else{
              console.log("tickets table already exists");
          }
        });
        await pg.schema.hasTable("organisations").then(async (exists) => {
          if (!exists) {
            await pg.schema
              .createTable("organisations", (table) => {
                table.increments();
                table.uuid("uuid");
                table.string("name");
                table.timestamps(true, true);
              })
              .then(async () => {
                console.log("created table organisations");
                for (let i = 0; i < 10; i++) {
                  const uuid = Helpers.generateUUID();
                  await pg
                    .table("organisations")
                    .insert({ uuid, name: `Organisation ${i}`});
                }
                console.log("inserted dummy organisations");
              });
          } else{
              console.log("organisations table already exists");
          }
        });
    }
}

module.exports = DatabaseHelper, pg;