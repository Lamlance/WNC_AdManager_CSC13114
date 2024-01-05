import { Router } from "express";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import z from "zod";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { CreateDistrict, GetAllDistrict } from "../../db/service/district";
const DistrictRouter = Router();

const GetAllDistrictQuerySchema = z.object({});

const CreateDistrictBodySchema = z.object({
  ten_quan: z.string(),
});

DistrictRouter.get(
  "/",
  ValidatorMwBuilder(
    GetAllDistrictQuerySchema,
    undefined,
    async function (req, res) {
      const data = await CallAndCatchAsync(GetAllDistrict, {});

      if (data.success === false) {
        return res.status(500).json({ error: data.error });
      }

      return res.status(200).json(data.data);
    }
  )
);

DistrictRouter.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    CreateDistrictBodySchema,
    async function (req, res) {
      const { ten_quan } = req.body;
      const data = await CallAndCatchAsync(CreateDistrict, {
        ten_quan,
      });

      if (data.success === false) {
        return res.status(500).json({ error: data.error });
      }

      return res.status(201).json(data.data);
    }
  )
);

export default DistrictRouter;
