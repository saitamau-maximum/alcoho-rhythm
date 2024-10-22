import Database from "better-sqlite3";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import bcrypt, { hash } from "bcrypt";
import queries from "./queries.js";
const SALT_ROUNDS = 12;

const app = new Hono();
const db = new Database("database.db");

const migrate = (db) => {
  db.prepare(queries.Users.createTable).run();
  db.prepare(queries.DrinkingRecords.createTable).run();
};

const validateInput = (username, weight, email, password) => {
  const emailRegex = /^[^\s@]+@[^/s@]+\.[^\s@]+$/;
  const isUsernameValid = username && username.length >= 3;
  const isWeightValid = weight > 0;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password && password.length >= 8;

  if(!isUsernameValid) return { valid: false, message: "Username must be at 3 character long." };
  if(!isWeightValid) return { valid: false, message: "Weight must be greater than 0." };
  if(!isEmailValid) return { valid: false, message: "Invalid email format." };
  if(!isPasswordValid) return { valid: false, message: "Password must be at least 8 characters long." };

  return { valid: true };
};

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello, Alcoho-Rhythm server!" });
});

app.post("/api/signup", async (c) => {
  const param = await c.req.json();
  const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
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
