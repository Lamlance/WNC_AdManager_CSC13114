import { FC, useEffect, useState } from "react";
import { Select, DatePicker, InputNumber, Form, Input, Button } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const { Option } = Select;
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AdChangeApi, AdsGeoJson } from "@admanager/shared";
import AdsMapModal from "../AdsMap/AdsMapModal";
import { MapSearchProps } from "../AdsMap/MapSearch";
import { nullable } from "zod";
import {
  useCreateAdInfoDataMutation,
  useUpdateAdInfodataMutation,
} from "../../slices/api/apiSlice";
const AdTableType = [
  "Trụ bảng hiflex",
  "Trụ màn hình điện tử LED",
  "Trụ hộp đèn",
  "Bảng hiflex ốp tường",
  "Màn hình điện tử ốp tường",
  "Trụ treo băng rôn dọc",
  "Trụ treo băng rôn ngang",
  "Trụ/Cụm pano",
  "Cổng chào",
  "Trung tâm thương mại",
];
const LocateType = [
  "Đất công/Công viên/Hành lang an toàn giao thông",
  "Đất tư nhân/Nhà ở riêng lẻ",
  "Trung tâm thương mại",
  "Chợ",
  "Cây xăng",
  "Nhà chờ xe buýt",
];
const AdType = ["Cổ động chính trị", "Quảng cáo thương mại", "Xã hội hoá"];

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
type SizeType = Parameters<typeof Form>[0]["size"];

export type AdChangeFormValue = Omit<AdChangeApi.AdChangeData, "id_quang_cao">;

type EditAdFormProps1 = {
  type: "AdInfo";
  ad: (AdsGeoJson.PlaceProperty & AdsGeoJson.AdsProperty) | null;
  isModalOpen: boolean;
  onClose: () => void;
  onFormSubmit?: (data: AdChangeFormValue) => void;
};

type EditAdFormProps2 = {
  type: "AdChange";
  ad: AdChangeApi.AdChangeData | null;
  isModalOpen: boolean;
  onClose: () => void;
  onFormSubmit?: (data: AdChangeFormValue) => void;
};

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const today = dayjs().format("YYYY-MM-DD");

const EditAdForm: FC<EditAdFormProps1 | EditAdFormProps2> = (props) => {
  const { type, ad, isModalOpen, onClose } = props;
  const [form] = Form.useForm<AdChangeFormValue>();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [mapModalOpen, setOpenMapModal] = useState<boolean>(false);

  const handleCancel = () => setPreviewOpen(false);
  const [updateAdInfoData] = useUpdateAdInfodataMutation();
  const [createAdInfoData] = useCreateAdInfoDataMutation();

  useEffect(() => {
    const files: UploadFile[] = [];
    if (ad?.hinh_1) {
      files.push({ uid: "1", name: "Image 1", status: "done", url: ad.hinh_1 });
      setFileList(
        files.filter((file) => {
          return file.uid === "1";
        }),
      );
    }
    if (ad?.hinh_2) {
      files.push({ uid: "2", name: "Image 2", status: "done", url: ad.hinh_2 });
      setFileList2(
        files.filter((file) => {
          return file.uid === "2";
        }),
      );
    }

    form.setFieldsValue({
      so_luong: ad?.so_luong,
      chieu_dai_m: ad?.chieu_dai_m,
      chieu_rong_m: ad?.chieu_rong_m,
      bang_qc: ad?.bang_qc,
      loai_vitri: ad?.loai_vitri,
      hinh_thuc: ad?.hinh_thuc,
      ten_dia_diem: ad?.ten_dia_diem,
      dia_chi: ad?.dia_chi,
      hinh_1: ad?.hinh_1,
      hinh_2: ad?.hinh_2,
      ngay_het_han: dayjs(`${ad?.ngay_het_han || today}`, dateFormat) as any,
      ngay_hieu_luc: dayjs(`${ad?.ngay_hieu_luc || today}`, dateFormat) as any,
    });
  }, [ad]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    );
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
    file,
  }) => {
    if (file && file.type && file.type.startsWith("image/")) {
      const preview = await getBase64(file.originFileObj as RcFile);
      setFileList([{ ...file, status: "done", url: preview }]);
      setPreviewTitle(
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
      );
    } else {
      setFileList(newFileList);
    }
  };
  const handleChange2: UploadProps["onChange"] = async ({
    fileList: newFileList,
    file,
  }) => {
    if (file && file.type && file.type.startsWith("image/")) {
      const preview = await getBase64(file.originFileObj as RcFile);
      setFileList2([{ ...file, status: "done", url: preview }]);
    } else {
      setFileList2(newFileList);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleOk = () => {
    onClose();
  };

  const handleCancelModal = () => {
    onClose();
  };
  const [isOpen, setIsopen] = useState(false);
  useEffect(() => {
    setIsopen(isModalOpen);
  }, [isModalOpen]);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default",
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const onMapSelect: MapSearchProps["onPlaceSelect"] = function (data) {
    form.setFieldsValue({
      dia_chi: data.formatted_address,
    });
  };

  const onFinish = (values: AdsGeoJson.AdsProperty) => {
    if (ad?.id_quang_cao) {
      const data: AdsGeoJson.AdsProperty = {
        id_quang_cao: ad!.id_quang_cao as string,
        bang_qc: values.bang_qc,
        dia_chi: values.dia_chi,
        hinh_thuc: values.hinh_thuc,
        loai_vitri: values.loai_vitri,
        quy_hoach: values.quy_hoach,
        so_luong: values.so_luong,
        ten_dia_diem: values.ten_dia_diem,
        chieu_dai_m: values.chieu_dai_m,
        chieu_rong_m: values.chieu_rong_m,
        hinh_1: values.hinh_1,
        hinh_2: values.hinh_2,
        ngay_het_han: values.ngay_het_han,
        ngay_hieu_luc: values.ngay_hieu_luc,
      };
      updateAdInfoData(data).then((v) => console.log(v));
      window.location.reload();
    } else {
      const data: AdsGeoJson.AdsCreateProPerty = {
        bang_qc: values.bang_qc,
        dia_chi: values.dia_chi,
        hinh_thuc: values.hinh_thuc,
        loai_vitri: values.loai_vitri,
        quy_hoach: false,
        so_luong: values.so_luong,
        chieu_dai_m: values.chieu_dai_m,
        chieu_rong_m: values.chieu_rong_m,
        hinh_1: values.hinh_1,
        hinh_2: values.hinh_2,
        ngay_het_han: values.ngay_het_han,
        ngay_hieu_luc: values.ngay_hieu_luc,
      };

      createAdInfoData(data).then((v) => console.log(v));
      window.location.reload();
    }
  };

  return (
    <>
      {!ad || type === "AdChange" ? null : (
        <AdsMapModal
          open={mapModalOpen}
          onClose={() => setOpenMapModal(false)}
          initPos={{ lng: ad.lng, lat: ad.lat }}
          onPlaceSelect={onMapSelect}
        />
      )}

      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
        footer={null}
        className=" -my-12 mx-auto w-8/12 rounded-lg "
      >
        <h1 className=" mb-10 mt-5 text-center text-2xl font-semibold">
          {ad ? "THÔNG TIN BẢNG QUẢNG CÁO" : "THÊM BẢNG QUẢNG CÁO MỚI"}
        </h1>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          labelAlign="left"
        >
          <div className="grid grid-cols-2 gap-5  ">
            <Form.Item<AdChangeFormValue>
              label=" Loại quảng cáo"
              name={"bang_qc"}
            >
              <Select value={ad?.bang_qc}>
                {AdTableType.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdChangeFormValue> name={"hinh_thuc"} label=" Hình thức">
              <Select defaultValue={ad?.hinh_thuc}>
                {AdType.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              name={"loai_vitri"}
              label="Loại vị trí"
            >
              <Select defaultValue={ad?.loai_vitri}>
                {LocateType.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              label="Vị trí"
              name={"ten_dia_diem"}
              initialValue={ad?.ten_dia_diem}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item<AdChangeFormValue> label="Kích thước">
              <div className=" flex flex-row">
                <Form.Item<AdChangeFormValue>
                  name={"chieu_dai_m"}
                  initialValue={ad?.chieu_dai_m || 0}
                >
                  <InputNumber className="h-8 w-12 " min={1} max={10} />
                </Form.Item>
                <span className="mx-2">x</span>
                <Form.Item<AdChangeFormValue>
                  name={"chieu_rong_m"}
                  initialValue={ad?.chieu_rong_m || 0}
                >
                  <InputNumber className="h-8 w-12" min={1} max={10} />
                </Form.Item>
                <span className="mx-2">(mxm)</span>
              </div>
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              name={"so_luong"}
              label="Số lượng"
              initialValue={ad?.so_luong || 0}
            >
              <InputNumber className="h-8 w-12 " min={1} />
            </Form.Item>

            <Form.Item<AdChangeFormValue>
              name={"ngay_hieu_luc"}
              label="Ngày hiệu lực"
              initialValue={dayjs(`${ad?.ngay_hieu_luc || today}`, dateFormat)}
            >
              <DatePicker format={dateFormat} />
            </Form.Item>

            <Form.Item<AdChangeFormValue>
              name={"ngay_het_han"}
              label="Ngày hết hạn"
            >
              <DatePicker
                value={dayjs(`${ad?.ngay_het_han || today}`, dateFormat)}
              />
            </Form.Item>

            <Form.Item<AdChangeFormValue>
              name="hinh_1"
              label="Hình ảnh 1"
              initialValue={ad?.hinh_1}
            >
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 2 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              name={"hinh_2"}
              label="Hình ảnh 2"
              initialValue={ad?.hinh_2}
            >
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList2}
                onPreview={handlePreview}
                onChange={handleChange2}
              >
                {fileList2.length >= 2 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </div>
          <div className=" flex flex-row">
            <Form.Item<AdChangeFormValue>
              label="Địa chỉ"
              className=" flex-1"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              initialValue={ad?.dia_chi}
              name={"dia_chi"}
            >
              <Input />
            </Form.Item>
            <Button onClick={() => setOpenMapModal(true)}>🗺️</Button>
          </div>

          <Form.Item className="mt-5 flex items-center justify-center">
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditAdForm;
