import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Row,
  InputNumber,
  Col,
  message,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  useGetAllAdsMethodQuery,
  useGetAllBoardTypeQuery,
  useGetAllLandTypeQuery,
  useSubmitAdRequestMutation,
} from "../../slices/api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { AdsGeoJson, AdsReqApi } from "@admanager/shared";
import AdsMapModal from "../AdsMap/AdsMapModal";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;

interface AdsRequestFormProps {
  onCancel: () => void;
  isVisible: boolean;
  Place?: AdsGeoJson.AdsGeoJsonProperty;
}

type AdReqFormValue = Omit<
  AdsReqApi.AdRequestCreate & {
    ngay_bat_dau: dayjs.Dayjs;
    ngay_ket_thuc: dayjs.Dayjs;
  },
  "ngay_hieu_luc" | "ngay_het_han" | "hinh_anh"
>;

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

const AdsRequestForm: React.FC<AdsRequestFormProps> = ({
  isVisible,
  onCancel,
  Place,
}) => {
  const [submitAdRequest, { isLoading }] = useSubmitAdRequestMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: AdsType } = useGetAllAdsMethodQuery();
  const { data: BoardType } = useGetAllBoardTypeQuery();
  const { data: LandType } = useGetAllLandTypeQuery();
  const [formHook] = useForm();
  const [isMapOpen, setMapOpen] = useState<boolean>(false);
  const [selectedLoc, setSelectedLoc] = useState<{
    lng: number;
    lat: number;
    formatted_address: string;
  } | null>(null);

  const setupPreviewImg = (file?: UploadFile) => {
    if (!file) {
      setPreviewImage(null);
      setPreviewTitle(null);
      return;
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    );
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      return GetImageBase64(file.originFileObj, (data) => {
        if (data.success == false) return console.warn(data.error);
        file.preview = data.url;
        file.url = data.url;
        setupPreviewImg(file);
      });
    }
    setupPreviewImg(file);
  };

  const handleChangeUpload: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const onBeforeFileUpload: UploadProps["beforeUpload"] = (file) => {
    const res = checkValidFile(file);
    if (res.valid) return true;
    console.warn(res.msg);
    return false;
  };

  const commonLabelCol = { span: 8 };
  const commonWrapperCol = { span: 12 };

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const onFinish = async (values: AdReqFormValue) => {
    console.log("A");
    const submitData: AdsReqApi.AdRequestCreate = {
      ...values,
      dia_chi_qc: Place?.place.dia_chi || selectedLoc?.formatted_address || "",
      ngay_hieu_luc: values.ngay_bat_dau.toDate(),
      ngay_het_han: values.ngay_ket_thuc.toDate(),
      id_diem_dat: Place?.place.id_dia_diem,
      id_dia_diem: Place?.place.id_dia_diem,
    };
    const data = AdsReqApi.AdRequestCreateSchema.safeParse(submitData);
    if (data.success == false) return console.log(data.error);

    const formData = new FormData();
    Object.keys(data.data).forEach((k) => {
      const value = data.data[k as keyof AdsReqApi.AdRequestCreate];
      if (value) formData.append(k, value.toString());
    });

    for (let i = 0; i < fileList.length; i++) {
      const obj = fileList[i].originFileObj;
      if (obj) formData.append("hinh_anh", obj);
    }
    submitAdRequest(formData).then((v) => console.log(v));
    handleOk();
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function onPlaceSelect(args: {
    lng: number;
    lat: number;
    formatted_address: string;
  }) {
    setSelectedLoc(args);
    formHook.setFieldValue("dia_chi_qc", args.formatted_address);
    console.log("Place selected", args);
  }

  useEffect(() => {
    if (Place) formHook.setFieldValue("dia_chi_qc", Place.place.dia_chi);
  }, [Place]);

  return (
    <>
      <Modal
        open={!!previewImage}
        title={previewTitle}
        footer={null}
        onCancel={() => setupPreviewImg()}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage || ""} />
      </Modal>
      <AdsMapModal
        open={isMapOpen}
        onClose={() => setMapOpen(false)}
        initPos={{ lng: 106.69385883068848, lat: 10.78873001700875 }}
        onPlaceSelect={onPlaceSelect}
      />
      <Modal
        title="TẠO YÊU CẦU CẤP PHÉP"
        open={isVisible}
        width={1200}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={formHook}
          onFinish={onFinish}
          layout="horizontal"
          labelAlign="left"
          labelCol={{ span: 6 }}
        >
          <div className=" grid grid-cols-2 gap-x-4">
            <Form.Item
              label="Hình ảnh pano"
              labelCol={commonLabelCol}
              wrapperCol={commonWrapperCol}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                beforeUpload={() => false}
                onChange={handleChangeUpload}
              >
                {fileList.length >= 2 ? null : uploadButton}
              </Upload>
            </Form.Item>

            <div className=" flex flex-row">
              <Form.Item<AdReqFormValue>
                name="dia_chi_qc"
                label="Chọn điểm đặt"
                className=" flex-grow"
                rules={[{ required: true, message: "Xin hãy chọn điểm đặt" }]}
              >
                <Input
                  value={
                    selectedLoc ? selectedLoc.formatted_address : undefined
                  }
                />
              </Form.Item>
              <Button onClick={() => setMapOpen(true)}>🗺️</Button>
            </div>

            <Form.Item<AdReqFormValue>
              label=" Loại quảng cáo"
              name={"id_loai_bang_qc"}
              rules={[{ required: true, message: "Xin chọn loại bảng QC" }]}
            >
              <Select>
                {(BoardType?.data || []).map((v) => (
                  <Select.Option
                    key={v.bang_qc.id_loai_bang_qc}
                    value={v.bang_qc.id_loai_bang_qc}
                  >
                    {v.bang_qc.loai_bang_qc}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdReqFormValue>
              name={"id_hinh_thuc"}
              label=" Hình thức"
              rules={[{ required: true, message: "Xin chọn hình thức QC" }]}
            >
              <Select>
                {(AdsType || []).map((v) => (
                  <Select.Option key={v.id_htqc} value={v.id_htqc}>
                    {v.hinh_thuc_qc}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdReqFormValue>
              name={"id_loai_vitri"}
              label="Loại vị trí"
              rules={[{ required: true, message: "Xin chọn loại vị trí" }]}
            >
              <Select>
                {(LandType?.data || []).map((v) => (
                  <Select.Option
                    key={v.vi_tri.id_loai_vt}
                    value={v.vi_tri.id_loai_vt}
                  >
                    {v.vi_tri.loai_vitri}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdReqFormValue> label="Kích thước">
              <div className=" flex flex-row">
                <Form.Item<AdReqFormValue>
                  name={"chieu_dai_m"}
                  rules={[{ required: true, message: "Nhập chiều dài bảng" }]}
                >
                  <InputNumber className="h-8 w-12 " min={1} max={10} />
                </Form.Item>
                <span className="mx-2">x</span>
                <Form.Item<AdReqFormValue>
                  name={"chieu_rong_m"}
                  rules={[{ required: true, message: "Nhập chiều rộng bảng" }]}
                >
                  <InputNumber className="h-8 w-12" min={1} max={10} />
                </Form.Item>
                <span className="mx-2">(mxm)</span>
              </div>
            </Form.Item>
            <Form.Item<AdReqFormValue>
              name={"so_luong"}
              label="Số lượng"
              rules={[{ required: true, message: "Nhập số lượng" }]}
            >
              <InputNumber className="" min={1} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item<AdReqFormValue>
              name="noi_dung_qc"
              label="Nội dung pano"
              className=" col-span-2"
              labelCol={{ span: 3 }}
            >
              <Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item<AdReqFormValue>
              name="ten_cty"
              label="Tên công ty"
              rules={[{ required: true, message: "Xin hãy nhập tên công ty!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<AdReqFormValue>
              name="email_cty"
              label="Email"
              rules={[
                { required: true, message: "Xin hãy nhập email công ty" },
                {
                  type: "email",
                  message: "Xin hãy nhập email hợp lệ",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<AdReqFormValue>
              name="dia_chi_cty"
              label="Địa chỉ"
              rules={[{ required: true, message: "Xin hãy nhập địa chỉ!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<AdReqFormValue>
              name="dien_thoai_cty"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Xin hãy nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<AdReqFormValue>
              name="ngay_bat_dau"
              label="Ngày bắt đầu hợp đồng"
              rules={[
                {
                  required: true,
                  message: "Xin hãy chọn ngày bắt đầu hợp đồng!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item<AdReqFormValue>
              name="ngay_ket_thuc"
              label="Ngày kết thúc hợp đồng"
              rules={[
                {
                  required: true,
                  message: "Xin hãy chọn ngày kết thúc hợp đồng!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </div>

          <Form.Item className="flex items-center justify-center">
            <Button type="primary" htmlType="submit">
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdsRequestForm;
