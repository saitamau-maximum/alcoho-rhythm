import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { deleteCookie, setCookie, getCookie } from "hono/cookie";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import queries from "./queries.js";
import { cors } from "hono/cors";

// .env ファイルを読み込む
dotenv.config();

const SALT_ROUNDS = 12;
const PASSWORD_MIN_LENGTH = 8;
const JWT_ALGORITHM = "HS256";
const COOKIE_NAME = "token";
const JWT_SECRET = process.env.JWT_SECRET;

const app = new Hono();
const db = new Database("database.db");

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173"],
  credentials: true,
}));

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

const getUserIdFromJwt = async (token, jwtSecret) => {
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(jwtSecret);
  let userId;

  try {
    const { payload } = await jwtVerify(token, secretKey);
    userId = payload.userId; // ユーザーIDを抽出
  } catch {
    throw new HTTPException(401, { message: "Invalid or expired token." });
  }

  return userId;
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
      throw error;
    }
  }

  return c.json({ message: "Successfully created." });
});

// サインイン用のエンドポイント
app.post("/api/signin", async (c) => {
  const param = await c.req.json();

  if (!param.email || !param.password) {
    throw new HTTPException(400, {
      message: "Email and password are required.",
    });
  }

  // email と password のバリデーション
  validateEmail(param.email);
  validatePassword(param.password);

  const user = db.prepare(queries.Users.findByEmail).get(param.email);

  if (!user) {
    // ユーザーが存在しない場合はエラーを返す
    throw new HTTPException(400, { message: "Invalid email or password." });
  }

  const isPasswordValid = await bcrypt.compare(param.password, user.password);

  if (!isPasswordValid) {
    throw new HTTPException(400, { message: "Invalid email or password." });
  }

  const encoder = new TextEncoder();
  const secretKey = encoder.encode(JWT_SECRET);

  const jwt = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey);

  setCookie(c, COOKIE_NAME, jwt, {
    httpOnly: true,
    secure: true, // HTTPSでのみ送信
    sameSite: "Strict", // CSRF対策
    maxAge: 2 * 60 * 60, // 2時間
  });

  return c.json({ message: "Successfully signed in." });
});

app.get("/api/signout", (c) => {
  deleteCookie(c, COOKIE_NAME);
  return c.json({ message: "Successfully signed out." });
});

app.get("/api/records", async (c) => {
  const param = await c.req.json();

  if (!param.start || !param.end) {
    throw new HTTPException(400, { message: "Parameters \"start\" and \"end\" are required." });
  }

  // 型バリデーション
  if (typeof param.start !== "string" || typeof param.end !== "string") {
    throw new HTTPException(400, { message: "Parameters \"start\" and \"end\" must be string." });
  }

  const token = getCookie(c, COOKIE_NAME);

  if (!token) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const userId = await getUserIdFromJwt(token, JWT_SECRET);
  if (typeof userId !== "number") {
    throw new HTTPException(401, { message: "User ID is not an integer" });
  }

  // UTCに変換してからデータベースから取得
  const utcStart = new Date(param.start).toISOString();
  const utcEnd = new Date(param.end).toISOString();

  const records = db.prepare(queries.DrinkingRecords.findByUserIdAndDateRange).all(userId, utcStart, utcEnd);

  return c.json(records);
});

// 飲酒量記録のエンドポイント
app.post("/api/records", async (c) => {
  const param = await c.req.json();

  // パラメータが存在するか確認
  if (!param.date || !param.amount || !param.condition) {
    throw new HTTPException(400, { message: "date, amount, and condition are required." });
  }

  // 型バリデーション
  if (typeof param.date !== "string") {
    throw new HTTPException(400, { message: "date must be a string." });
  }

  if (typeof param.amount !== "number") {
    throw new HTTPException(400, { message: "amount must be a number." });
  }

  if (typeof param.condition !== "number") {
    throw new HTTPException(400, { message: "condition must be a number." });
  }

  // JWTからユーザーIDを取得
  const token = getCookie(c, COOKIE_NAME);
  if (!token) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const userId = await getUserIdFromJwt(token, JWT_SECRET);

  // JSTで日付のバリデーション
  const selectedDate = new Date(param.date);

  const minDateJst = new Date("2000-01-01T00:00:00Z");

  const nowDateJst = new Date();
  nowDateJst.setHours(nowDateJst.getHours() + 9); // JSTとして解釈するために時差を足す

  if (selectedDate < minDateJst || selectedDate > nowDateJst) {
    throw new HTTPException(400, { message: "date must be between 2000-01-01 (JST) and today." });
  }

  if (param.amount < 0) {
    throw new HTTPException(400, { message: "amount must be greater than or equal to 0." });
  }

  // 体調のバリデーション（1から5の範囲か確認）
  if (param.condition < 1 || param.condition > 5) {
    throw new HTTPException(400, { message: "condition must be between 1 and 5." });
  }

  // DBにはUNIX時間で保存するため、UTCで現在時刻を取得
  const nowDateUtcStr = new Date().toISOString();
  const selectedDateStr = selectedDate.toISOString();

  db.prepare(queries.DrinkingRecords.create).run(
    userId,
    param.amount,
    param.condition,
    selectedDateStr,
    nowDateUtcStr,
  );

  return c.json({ message: "Record successfully created." });
});

app.put("/api/records/:id", async (c) => {
  const param = await c.req.json();
  const id = c.req.param("id");

  if (!param.amount && !param.condition) {
    throw new HTTPException(400, { message: "amount or condition is required." });
  }

  if (param.amount && typeof param.amount !== "number") {
    throw new HTTPException(400, { message: "amount must be a number." });
  }

  if (param.condition && typeof param.condition !== "number") {
    throw new HTTPException(400, { message: "condition must be a number." });
  }

  if (param.date && typeof param.date !== "string") {
    throw new HTTPException(400, { message: "date must be a string." });
  }

  // JSTで日付のバリデーション
  const selectedDate = new Date(param.date);

  const minDateJst = new Date("2000-01-01T00:00:00Z");

  const nowDateJst = new Date();
  nowDateJst.setHours(nowDateJst.getHours() + 9); // JSTとして解釈するために時差を足す

  if (selectedDate < minDateJst || selectedDate > nowDateJst) {
    throw new HTTPException(400, { message: "date must be between 2000-01-01 (JST) and today." });
  }

  // 体調のバリデーション（1から5の範囲か確認）
  if (param.condition < 1 || param.condition > 5) {
    throw new HTTPException(400, { message: "condition must be between 1 and 5." });
  }

  if (param.amount < 0) {
    throw new HTTPException(400, { message: "amount must be greater than or equal to 0." });
  }

  const token = getCookie(c, COOKIE_NAME);
  if (!token) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const userId = await getUserIdFromJwt(token, JWT_SECRET);

  const record = db.prepare(queries.DrinkingRecords.findById).get(id);

  if (!record) {
    throw new HTTPException(404, { message: "Record not found." });
  }

  // drinking_records.user_id と JWTのユーザーIDが一致するか確認
  if (record.user_id !== userId) {
    throw new HTTPException(403, { message: "Forbidden" });
  }

  const nowDateUtcStr = new Date().toISOString();

  db.prepare(queries.DrinkingRecords.update)
    .run(
      param.amount || record.alcohol_amount,
      param.condition || record.condition,
      param.date || record.date,
      nowDateUtcStr,
      id
    );

  return c.json({ message: "Record successfully updated." });
});

app.delete("/api/records/:id", async (c) => {
  const id = c.req.param("id");

  const token = getCookie(c, COOKIE_NAME);
  if (!token) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const userId = await getUserIdFromJwt(token, JWT_SECRET);

  const record = db.prepare(queries.DrinkingRecords.findById).get(id);

  if (!record) {
    throw new HTTPException(404, { message: "Record not found." });
  }

  if (record.user_id !== userId) {
    throw new HTTPException(403, { message: "Forbidden" });
  }

  db.prepare(queries.DrinkingRecords.delete).run(id);

  return c.json({ message: "Record successfully deleted." });
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }
  // Internal Server Errorの詳細を出力
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});

migrate(db);

serve({
  fetch: app.fetch,
  port: 8000,
});
