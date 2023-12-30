import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";

type GetImgBase64CallBack =
  | { success: true; url: string }
  | { success: false; error: any };

const GetImageBase64 = (
  file: RcFile,
  callBack: (data: GetImgBase64CallBack) => void,
) => {
  return {
    success: true,
    url: URL.createObjectURL(file),
  };
};

const checkValidFile = (
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

function PictureWallUpload() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChangeUpload: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const onBeforeFileUpload: UploadProps["beforeUpload"] = (file) => {
    const res = checkValidFile(file);
    if (res.valid) return true;
    console.warn(res.msg);
    return false;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      listType="picture-card"
      fileList={fileList}
      beforeUpload={onBeforeFileUpload}
      onChange={handleChangeUpload}
    >
      {fileList.length >= 2 ? null : uploadButton}
    </Upload>
  );
}

export default PictureWallUpload;
