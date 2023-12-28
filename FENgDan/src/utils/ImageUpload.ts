import { RcFile } from "antd/es/upload/interface";

type GetImgBase64CallBack =
  | { success: true; url: string }
  | { success: false; error: any };

export const GetImageBase64 = (
  file: RcFile,
  callBack: (data: GetImgBase64CallBack) => void,
) => {
  return {
    success: true,
    url: URL.createObjectURL(file),
  };
};

export const checkValidFile = (
  file: RcFile,
): { valid: true } | { valid: false; msg: string } => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    return { valid: false, msg: "Must be jpeg/png file" };
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return { valid: false, msg: "Image must smaller than 2MB!" };
  }
  return { valid: isJpgOrPng && isLt2M };
};
