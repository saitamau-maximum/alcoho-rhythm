import Database from "better-sqlite3";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import queries from "./queries.js";

const app = new Hono();
const db = new Database("database.db");

db.prepare(queries.Users.createTable).run();
db.prepare(queries.DrinkingRecords.createTable).run();

// 動作確認用
// db.prepare(queries.Users.create).run("ほげほげ", 60, "hogehoge@mail", "hogehoge");
// db.prepare(queries.Users.create).run("ふがふが", 70, "fugafuga@mail", "fugafuga");
// db.prepare(queries.Users.create).run("ぴよぴよ", 100, "piyopiyo@mail", "piyopiyo");
// db.prepare(queries.DrinkingRecords.create).run(1, 20, 1, "2024-10-20T08:30:00", "2024-10-21T14:45:00");
// db.prepare(queries.DrinkingRecords.create).run(2, 35, 5, "2024-10-22T19:15:00", "2024-10-23T23:00:00");
// db.prepare(queries.DrinkingRecords.create).run(3, 50, 3, "2024-10-24T07:00:00", "2024-10-25T12:30:00");

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello, Alcoho-Rhythm server!" });
});

serve({
  fetch: app.fetch,
  port: 8000,
});
