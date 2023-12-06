import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./dizzle/migrations",
  driver: "pg",
  dbCredentials: {
    host: "127.0.0.1",
    port: 6432,
    user: "postgres",
    password: "postgresql",
    database: "AdsManager",
  },
} satisfies Config;
