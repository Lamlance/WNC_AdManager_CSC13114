import { FC, useEffect, useRef, useState } from "react";
import {
  Select,
  DatePicker,
  InputNumber,
  Form,
  Input,
  Button,
  InputRef,
} from "antd";
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
  const [mapModalOpen, setOpenMapModal] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    const files: UploadFile[] = [];
    if (ad?.hinh_1) {
      files.push({ uid: "1", name: "Image 1", status: "done", url: ad.hinh_1 });
    }
    if (ad?.hinh_2) {
      files.push({ uid: "2", name: "Image 2", status: "done", url: ad.hinh_2 });
    }
    setFileList(files);
    if (ad && type === "AdInfo") setAddress(ad.dia_chi);
  }, [ad]);

  useEffect(() => {
    const files: UploadFile[] = [];
    if (ad?.hinh_1) {
      files.push({ uid: "1", name: "Image 1", status: "done", url: ad.hinh_1 });
    }
    if (ad?.hinh_2) {
      files.push({ uid: "2", name: "Image 2", status: "done", url: ad.hinh_2 });
    }
    setFileList(files);
    if (ad && type === "AdInfo") setAddress(ad.dia_chi);
  }, [ad]);

  useEffect(() => {
    if (ad?.img) {
      setFileList([
        {
          uid: "1",
          name: "Image 1",
          status: "done",
          url: ad.img,
        },
      ]);
    } else {
      setFileList([]);
    }
    if (ad?.img2) {
      setFileList2([
        {
          uid: "2",
          name: "Image 2",
          status: "done",
          url: ad?.img2,
        },
      ]);
    } else {
      setFileList2([]);
    }
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
    } else {
      setFileList(newFileList);
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
    setAddress(data.formatted_address);
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
          onFinish={(v) => console.log(v)}
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
              name={"id_loai_bang_qc"}
            >
              <Select value={ad?.bang_qc}>
                {AdTableType.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              name={"id_hinh_thuc"}
              label=" Hình thức"
            >
              <Select value={ad?.hinh_thuc}>
                {AdType.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              name={"id_loai_vitri"}
              label="Loại vị trí"
            >
              <Select value={ad?.loai_vitri}>
                {LocateType.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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

            <Form.Item<AdChangeFormValue>
              name={"ngay_het_han"}
              label="Ngày hết hạn"
              initialValue={dayjs(`${ad?.ngay_het_han || today}`, dateFormat)}
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              name={"so_luong"}
              label="Số lượng"
              initialValue={ad?.so_luong || 0}
            >
              <InputNumber className="h-8 w-12 " min={1} />
            </Form.Item>
            <Form.Item label="Số lượng">
              <InputNumber className="h-8 w-12 " min={1} max={10} />
              <span className="mx-2">trụ/bảng</span>
            </Form.Item>
          </div>
          <Form.Item
            label="Địa chỉ"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
          >
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>
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
