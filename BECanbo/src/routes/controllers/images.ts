import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { Minio_GetImgLink } from "../../db/minio";

const ImageRouter = Router();

ImageRouter.get("/:img_name", async function (req, res) {
  const data = await CallAndCatchAsync(Minio_GetImgLink, {
    bkName: "adsrequest",
    filename: req.params.img_name,
  });
  if (data.success == false) return res.status(500).json({ error: data.error });

  return res.status(200).json({ url: data.data });
});

export default ImageRouter;
