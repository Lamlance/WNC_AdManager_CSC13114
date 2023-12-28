import { Client as MinioClient, UploadedObjectInfo } from "minio";
export const minio_client = new MinioClient({
  endPoint: "localhost",
  port: 8900,
  useSSL: false,
  accessKey: "RsectoLaDYzfvhrHVUTT",
  secretKey: "r391TfyYwtmvKnp6dttW9SN6BkiNtEgEsNZ0NCBy",
});

type BucketName = "adsrequest" | "adsreports";

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

type Minio_UploadMulterImgArggs = {
  files: Express.Multer.File[];
  bkName: BucketName;
};

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

export function Minio_UploadMulterImgs(args: Minio_UploadMulterImgArggs) {
  const promises: Promise<UploadedObjectInfo>[] = [];
  for (let i = 0; i < args.files.length; i++) {
    const f = args.files[i];
    promises.push(
      Minio_UploadImg({
        bkName: args.bkName,
        filename: f.filename,
        filePath: f.path,
        delAfterLoad: false,
      })
    );
  }
  return promises;
}

export async function Minio_GetImgLink({
  bkName,
  filename,
}: Minio_GetImgLinkArgs) {
  //86400 ~ 1day
  const url = await minio_client.presignedUrl("GET", bkName, filename);
  return url;
}
