import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();



serve({
  fetch: app.fetch,
  port: 8000,
});
