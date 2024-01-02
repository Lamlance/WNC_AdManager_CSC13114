import { Router } from "express";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import z from "zod";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { GetAllWard, GetAllWardFromDistrict } from "../../db/service/ward";
const WardRouter = Router();

const GetAllWardQuerySchema = z.object({
  id_quan: z
    .preprocess((v) => {
      if (typeof v === "string") return v.split(",");
      return v;
    }, z.array(z.coerce.number()))
    .nullish(),
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


WardRouter.get("/thuoc-quan/:id", async (req, res, next) => {
  const districtId: number | undefined = parseInt(req.params.id) || 0;

  const result = await CallAndCatchAsync(GetAllWardFromDistrict, districtId);
  if (!result.success) {
    return res.status(500).json({ msg: result.error.message });
  }
  return res.status(200).json(result.data);
});

export default WardRouter;
