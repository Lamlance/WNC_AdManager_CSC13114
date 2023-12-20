import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./dizzle/migrations",
  driver: "pg",
  dbCredentials: {
    host: "127.0.0.1",
    port: 5432,
    //port: 6543,
    user: "postgres",
    password: "12345",
    database: "AdsManager",
  },
} satisfies Config;
