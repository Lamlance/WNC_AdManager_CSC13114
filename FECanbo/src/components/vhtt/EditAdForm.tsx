import { FC, useEffect, useState } from "react";
import { Select, DatePicker, InputNumber, Form, Input, Button } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const { Option } = Select;
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AdChangeApi, AdsGeoJson } from "@admanager/shared";
import AdsMapModal from "../AdsMap/AdsMapModal";
import { MapSearchProps } from "../AdsMap/MapSearch";
import {
  useGetAllAdsMethodQuery,
  useGetAllBoardTypeQuery,
  useGetAllLandTypeQuery,
} from "../../slices/api/apiSlice";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
type SizeType = Parameters<typeof Form>[0]["size"];

export type AdChangeFormValue = Omit<
  AdChangeApi.AdChangeData,
  "id_quang_cao" | "ngay_hieu_luc" | "ngay_het_han"
> & {
  ngay_hieu_luc: Dayjs | undefined;
  ngay_het_han: Dayjs | undefined;
};

type EditAdFormProps1 = {
  type: "AdInfo";
  ad: AdsGeoJson.AdsProperty | null;
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
  const { ad, isModalOpen, onClose } = props;

  const { data: AdsType } = useGetAllAdsMethodQuery();
  const { data: BoardType } = useGetAllBoardTypeQuery();
  const { data: LandType } = useGetAllLandTypeQuery();

  const [form] = Form.useForm<AdChangeFormValue>();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    console.log(ad);
    form.setFieldsValue({
      ...(ad as AdChangeFormValue),
      ngay_hieu_luc: ad?.ngay_hieu_luc
        ? dayjs(new Date(ad.ngay_hieu_luc))
        : undefined,
      ngay_het_han: ad?.ngay_het_han
        ? dayjs(new Date(ad.ngay_het_han))
        : undefined,
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
    setFileList([]);
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

  const onMapSelect: MapSearchProps["onPlaceSelect"] = function (data) {};

  return (
    <>
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
          onFinish={(v) => {
            props.onFormSubmit?.(v);
            handleOk();
          }}
          labelCol={{ span: 6 }}
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
              <Select>
                {(BoardType?.data || []).map((v) => (
                  <Option
                    key={v.bang_qc.id_loai_bang_qc}
                    value={v.bang_qc.id_loai_bang_qc}
                  >
                    {v.bang_qc.loai_bang_qc}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              name={"id_hinh_thuc"}
              label=" Hình thức"
            >
              <Select>
                {(AdsType || []).map((v) => (
                  <Option key={v.id_htqc} value={v.id_htqc}>
                    {v.hinh_thuc_qc}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item<AdChangeFormValue>
              name={"id_loai_vitri"}
              label="Loại vị trí"
            >
              <Select>
                {(LandType?.data || []).map((v) => (
                  <Option key={v.vi_tri.id_loai_vt} value={v.vi_tri.id_loai_vt}>
                    {v.vi_tri.loai_vitri}
                  </Option>
                ))}
              </Select>
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
              <InputNumber className="" min={1} />
            </Form.Item>
            <div></div>
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
              initialValue={dayjs(`${ad?.ngay_het_han || today}`, dateFormat)}
            >
              <DatePicker format={dateFormat} />
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <Upload
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
