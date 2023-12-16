import { Router } from "express";
import { pg_client } from "../db/db";
import { sql } from "drizzle-orm";

const DiaDiemRouter = Router();

function GetNear() {
  pg_client.execute(sql`select * from `);
}

DiaDiemRouter.get("/near", function (req, res) {});
