import Database from "better-sqlite3";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcrypt";
import queries from "./queries.js";
const SALT_ROUNDS = 12;

const app = new Hono();
const db = new Database("database.db");

const migrate = (db) => {
  db.prepare(queries.Users.createTable).run();
  db.prepare(queries.DrinkingRecords.createTable).run();
};

const validateInput = (username, weight, email, password) => {
  const emailRegex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/; 
  const usernameRegex = /^[\wぁ-んァ-ン一-龯_-]+$/;
  const isUsernameValid = usernameRegex.test(username);
  const isWeightValid = weight > 0;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password && password.length >= 8;

  if (!isUsernameValid)
    return { valid: false, message: "Invalid username format." };
  if (!isWeightValid)
    return { valid: false, message: "Weight must be greater than 0." };
  if (!isEmailValid) return { valid: false, message: "Invalid email format." };
  if (!isPasswordValid)
    return {
      valid: false,
      message: "Password must be at least 8 characters long.",
    };

  return { valid: true };
};

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello, Alcoho-Rhythm server!" });
});

app.post("/api/signup", async (c) => {
  const param = await c.req.json();
  const { valid, message } = validateInput(
    param.username,
    param.weight,
    param.email,
    param.password
  );

  const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
  };

  if (!valid) {
    throw new HTTPException(400, { message: message });
  }

  const hashedPassword = await hashPassword(param.password);

  try {
    db.prepare(queries.Users.create).run(
      param.username,
      param.weight,
      param.email,
      hashedPassword
    );
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      throw new HTTPException(400, { message: "This email already exist." });
    } else {
      throw new HTTPException(500, {
        message: "Database error: " + error.message,
      });
    }
  }

  return c.json({ message: "Successfully created." });
});

migrate(db);

serve({
  fetch: app.fetch,
  port: 8000,
});
