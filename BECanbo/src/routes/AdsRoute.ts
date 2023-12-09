import { Router } from "express";
import { CallAndCatchAsync } from "../utils/CallCatch.js";
import { Repo_DiaDiem } from "@admanager/backend";

const Router_DiaDiem = Router();

Router_DiaDiem.get("/", async function (req, res) {
  const data = await CallAndCatchAsync(Repo_DiaDiem.GetManyDiaDiem, undefined);
  if (data.success) return res.status(200).json({ data: data });
  else return res.status(500).json({ error: data.error });
});

Router_DiaDiem.post("/", async function (req, res) {});

export default Router_DiaDiem;
