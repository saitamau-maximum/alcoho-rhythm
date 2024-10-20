import Database from "better-sqlite3";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import queries from "./queries.js";

const app = new Hono();
const db = new Database("database.db");

db.prepare(queries.Users.createTable).run();
db.prepare(queries.DrinkingRecords.createTable).run();

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello, Alcoho-Rhythm server!" });
});

serve({
  fetch: app.fetch,
  port: 8000,
});
