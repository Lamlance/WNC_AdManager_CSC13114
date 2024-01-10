import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import {
  createPlaceChangeRequest,
  createPlaceInfo,
  getAllPlace,
  getAllPlaceChangeRequest,
  updatePlaceChangeRequest,
  updatePlaceInfo,
} from "../../db/service/place-info";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { PlaceApi, PlaceChangeApi } from "@admanager/shared";
import z from "zod";
import { WardArraySchema } from "../../utils/WardArray";
const PlaceRouter = Router();

PlaceRouter.get("/", async function (req, res) {
  const data = await CallAndCatchAsync(getAllPlace, undefined);
  if (data.success == false) return res.status(500).json({ error: data.error });
  return res.status(200).json(data);
});

PlaceRouter.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    PlaceApi.CreatePlaceBodySchema,
    async function (req, res) {
      const data = await CallAndCatchAsync(createPlaceInfo, res.locals.body);
      if (data.success == false)
        return res.status(500).json({ error: data.error });
      return res.status(200).json({ id_dia_diem: data.data });
    }
  )
);

PlaceRouter.put(
  "/",
  ValidatorMwBuilder(
    undefined,
    PlaceApi.UpdatePlaceBodySchema,
    async function (req, res) {
      const data = await CallAndCatchAsync(updatePlaceInfo, res.locals.body);
      if (data.success == false)
        return res.status(500).json({ error: data.error });
      return res.status(200).json({ id_dia_diem: data.data });
    }
  )
);

PlaceRouter.get(
  "/chinh-sua",
  ValidatorMwBuilder(
    z.object({
      phuong_id: WardArraySchema.nullish(),
    }),
    undefined,
    async function (req, res) {
      const data = await CallAndCatchAsync(getAllPlaceChangeRequest, {
        phuong_id: res.locals.query.phuong_id || undefined,
      });
      if (data.success == false)
        return res.status(500).json({ error: data.error });
      return res.status(200).json(data.data);
    }
  )
);
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

PlaceRouter.put(
  "/chinh-sua",
  ValidatorMwBuilder(
    undefined,
    PlaceChangeApi.PlaceChangeRequestResponseSchema,
    async (req, res) => {
      const data = await CallAndCatchAsync(
        updatePlaceChangeRequest,
        res.locals.body
      );
      if (data.success == false) return res.status(500).json(data);
      return res.status(200).json(data);
    }
  )
);

export default PlaceRouter;
