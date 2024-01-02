import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { createPlaceChangeRequest, getAllPlaceChangeRequest, getAllPlace, createPlace,updatePlace, deletePlace } from "../../db/service/place-info";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { PlaceChangeApi, PlaceApi } from "@admanager/shared";

const PlaceRouter = Router();

// request edit place
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

// place infor 
PlaceRouter.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(getAllPlace, undefined);
  if (!result.success) {
    return res.status(500).json({ msg: result.error.message });
  }
  return res.status(200).json(result.data);
});

PlaceRouter.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    PlaceApi.PlaceSchema,
    async function (req, res) {
      const result = await CallAndCatchAsync(createPlace, res.locals.body);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

PlaceRouter.put(
  "/",
  ValidatorMwBuilder(
    undefined,
    PlaceApi.PlaceSchema,
    async function (req, res) {
      const data: PlaceApi.PlaceProperty = res.locals.body;
      const result = await CallAndCatchAsync(updatePlace, data);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

PlaceRouter.delete(
  "/",
  ValidatorMwBuilder(
    undefined,
    PlaceApi.PlaceSchema,
    async function (req, res) {
      const { id } = req.params;
      const data: PlaceApi.PlaceProperty = res.locals.body;
      const result = await CallAndCatchAsync(deletePlace, data);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);


export default PlaceRouter;
