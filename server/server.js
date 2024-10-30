import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { setCookie } from "hono/cookie";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import Database from "better-sqlite3";
import queries from "./queries.js";

const SALT_ROUNDS = 12;
const PASSWORD_MIN_LENGTH = 8;

const app = new Hono();
const db = new Database("database.db");

const migrate = (db) => {
  db.prepare(queries.Users.createTable).run();
  db.prepare(queries.DrinkingRecords.createTable).run();
};

const validateUsername = (username) => {
  const usernameRegex = /^[\wぁ-んァ-ン一-龯_-]+$/;
  const isUsernameValid = usernameRegex.test(username);
  if (!isUsernameValid) {
    throw new HTTPException(400, { message: "Invalid username format." });
  }
};

const validateWeight = (weight) => {
  const isWeightValid = weight > 0;
  if (!isWeightValid) {
    throw new HTTPException(400, { message: "Weight must be grater than 0." });
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);
  if (!isEmailValid) {
    throw new HTTPException(400, { message: "Invalid email format." });
  }
};

const validatePassword = (password) => {
  const isPasswordValid = password && password.length >= PASSWORD_MIN_LENGTH;
  if (!isPasswordValid) {
    throw new HTTPException(400, {
      message: "Password must be at least 8 characters long.",
    });
  }
};

app.get("/api/hello", (c) => {
  return c.json({ message: "Hello, Alcoho-Rhythm server!" });
});

app.post("/api/signup", async (c) => {
  const param = await c.req.json();

  validateUsername(param.username);
  validateWeight(param.weight);
  validateEmail(param.email);
  validatePassword(param.password);

  const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
  };

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
      throw new HTTPException(500, { message: "Database error" });
    }
  }

  return c.json({ message: "Successfully created." });
});

app.onError((err) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return new HTTPException(500, { message: "Internal server error" });
});

migrate(db);

serve({
  fetch: app.fetch,
  port: 8000,
});
