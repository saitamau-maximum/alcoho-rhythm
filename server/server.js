import Database from "better-sqlite3";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import bcrypt, { hash } from "bcrypt";
import queries from "./queries.js";

const app = new Hono();
const db = new Database("database.db");

const migrate = (db) => {
  db.prepare(queries.Users.createTable).run();
  db.prepare(queries.DrinkingRecords.createTable).run();
};

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello, Alcoho-Rhythm server!" });
});

app.post("/api/signup", async (c) => {
  const param = await c.req.json();
  const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }

  const hashedPassword = await hashPassword(param.password);

  db.prepare(queries.Users.create).run(
    param.username,
    param.weight,
    param.email,
    hashedPassword,
  );

  return c.json({ message: "Successfully created." });
});

migrate(db);

serve({
  fetch: app.fetch,
  port: 8000,
});
