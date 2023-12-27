import { Client as MinioClient, UploadedObjectInfo } from "minio";
export const minio_client = new MinioClient({
  endPoint: "localhost",
  port: 8900,
  useSSL: false,
  accessKey: "RsectoLaDYzfvhrHVUTT",
  secretKey: "r391TfyYwtmvKnp6dttW9SN6BkiNtEgEsNZ0NCBy",
});

type BucketName = "adsrequest";

type Minio_UploadImgArgs = {
  bkName: BucketName;
  filename: string;
  filePath: string;
  delAfterLoad?: boolean;
};
type Minio_GetImgLinkArgs = Omit<
  Minio_UploadImgArgs,
  "filePath" | "delAfterLoad"
>;

export function Minio_UploadImg({
  bkName,
  filename,
  filePath,
  delAfterLoad,
}: Minio_UploadImgArgs): Promise<UploadedObjectInfo> {
  const mimeType = filename.includes("jpg")
    ? { "Content-Type": "image/jpeg" }
    : filename.includes("png")
      ? { "Content-Type": "image/png" }
      : {};
  return new Promise((res, rej) => {
    minio_client.fPutObject(
      bkName,
      filename,
      filePath,
      mimeType,
      function (err, etag) {
        if (err) return rej(err);
        return res(etag);
      }
    );
  });
}

export async function Minio_GetImgLink({
  bkName,
  filename,
}: Minio_GetImgLinkArgs) {
  //86400 ~ 1day
  const url = await minio_client.presignedUrl("GET", bkName, filename);
  return url;
}
