import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { Minio_GetImgLink } from "../../db/minio";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { ImageApi } from "@admanager/shared";

const ImageRouter = Router();

ImageRouter.get(
  "/",
  ValidatorMwBuilder(
    ImageApi.GetImageQuerySchema,
    undefined,
    async function (req, res) {
      const data = await CallAndCatchAsync(Minio_GetImgLink, {
        bkname: res.locals.query.bkname,
        filename: res.locals.query.filename,
      });
      if (data.success == false)
        return res.status(500).json({ error: data.error });

      return res.status(200).json({ url: data.data });
    }
  )
);

export default ImageRouter;
