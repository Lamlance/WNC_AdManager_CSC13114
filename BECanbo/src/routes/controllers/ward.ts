import { Router } from "express";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import z from "zod";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import {
  CreateWard,
  DeleteWard,
  GetAllWard,
  GetWard,
} from "../../db/service/ward";
const WardRouter = Router();

const GetAllWardQuerySchema = z.object({
  id_quan: z
    .preprocess((v) => {
      if (typeof v === "string") return v.split(",");
      return v;
    }, z.array(z.coerce.number()))
    .nullish(),
});

const CreateWardBodySchema = z.object({
  ten_phuong: z.string(),
  id_quan: z.number(),
});

const DeleteWardRequest = z.object({
  id: z.string(),
});

const GetWardRequest = z.object({
  id: z.string(),
});

WardRouter.get(
  "/",
  ValidatorMwBuilder(
    GetAllWardQuerySchema,
    undefined,
    async function (req, res) {
      const data = await CallAndCatchAsync(GetAllWard, {
        id_quan: res.locals.query.id_quan || undefined,
      });
      if (data.success == false)
        return res.status(500).json({ error: data.error });

      return res.status(200).json(data.data);
    }
  )
);

WardRouter.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    CreateWardBodySchema,
    async function (req, res) {
      const { ten_phuong, id_quan } = req.body;
      const data = await CallAndCatchAsync(CreateWard, {
        ten_phuong,
        id_quan,
      });

      if (data.success === false) {
        return res.status(500).json({ error: data.error });
      }

      return res.status(201).json(data.data);
    }
  )
);

WardRouter.delete(
  "/:id",
  ValidatorMwBuilder(undefined, DeleteWardRequest, async function (req, res) {
    const { id } = req.params;

    const result = await CallAndCatchAsync(DeleteWard, { id });

    if (!result.success) {
      return res.status(500).json({ error: result.error.message });
    }

    return res.status(200).json(result.data);
  })
);

WardRouter.get(
  "/:id",
  ValidatorMwBuilder(undefined, GetWardRequest, async function (req, res) {
    const { id } = req.params;
    const result = await CallAndCatchAsync(GetWard, { id });

    if (!result.success) {
      return res.status(500).json({ error: result.error.message });
    }

    return res.status(200).json(result.data);
  })
);

export default WardRouter;
