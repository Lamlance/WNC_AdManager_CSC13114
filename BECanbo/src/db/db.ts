import { AdsSchema } from "@admanager/backend";
import { drizzle } from "drizzle-orm/node-postgres";
import pg_pkg from "pg";

const { Client } = pg_pkg;
const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "12345",
  database: "AdsManager",
});
await client.connect();
const pg_client = drizzle(client, { schema: AdsSchema });
export { pg_client };
