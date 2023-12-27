import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import {
  createPlaceChangeRequest,
  getAllPlaceChangeRequest,
} from "../../db/service/place-info";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { PlaceChangeApi } from "@admanager/shared";

const PlaceRouter = Router();
PlaceRouter.get("/chinh-sua", async function (req, res) {
  const data = await CallAndCatchAsync(getAllPlaceChangeRequest, undefined);
  if (data.success == false) return res.status(500).json({ error: data.error });
  return res.status(200).json(data.data);
});
PlaceRouter.post(
  "/chinh-sua",
  ValidatorMwBuilder(
    undefined,
    PlaceChangeApi.PlaceChangeRequestCreateSchema,
    async function (req, res) {
      const data = await CallAndCatchAsync(
        createPlaceChangeRequest,
        res.locals.body
      );
      if (data.success == false)
        return res.status(500).json({ error: data.error });

      return res.status(200).json({ insertedId: data.data });
    }
  )
);
export default PlaceRouter;
