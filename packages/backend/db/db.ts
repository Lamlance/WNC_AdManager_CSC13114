import { drizzle } from "drizzle-orm/node-postgres";
import pg_pkg from "pg";
import * as AdsSchema from "./schema.js";

const { Client } = pg_pkg;
const client = new Client({
  host: "127.0.0.1",
  port: 6432,
  user: "postgres",
  password: "postgresql",
  database: "AdsManager",
});
await client.connect();
const pg_client = drizzle(client, { schema: AdsSchema });
export { pg_client };
