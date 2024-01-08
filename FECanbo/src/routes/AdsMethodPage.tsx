import React, { useEffect, useState } from "react";
import { AdsGeoJson } from "@admanager/shared";
import { Button, Table, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDeleteAdMethodMutation,
  useGetAllAdsMethodQuery,
  useSubmitAdMethodMutation,
  useSubmitUpdateAdMethodMutation,
} from "../slices/api/apiSlice";
type AdsMethod = AdsGeoJson.AdMethodProperty;

type SizeType = Parameters<typeof Form>[0]["size"];
type AdMethodFormValue = AdsGeoJson.AdMethodCreateProperty;
type AdMethodUpdateValue = AdsGeoJson.AdMethodUpdateProperty;
export type AdChangeFormValue = Omit<AdsMethod, "id_htqc">;
function AdsMethodPage() {
  const columns: ColumnsType<AdsMethod> = [
    {
      align: "center",
      title: "STT",
      dataIndex: "id_htqc",
      key: "id_htqc",
    },
    {
      title: "Hình thức quảng cáo",
      dataIndex: "hinh_thuc_qc",
      key: "hinh_thuc_qc",
    },

    {
      title: "",
      key: "operation",
      fixed: "right",

      render: () => (
        <a className="text-blue-500 underline" onClick={() => openModal()}>
          Xem chi tiết
        </a>
      ),
    },
    {
      title: "",
      key: "operation",
      fixed: "right",

      render: () => (
        <DeleteOutlined
          onClick={handleDeleteAd}
          style={{ color: "red", fontSize: "24px" }}
        />
      ),
    },
  ];
  const [selectedAds, setSelectedAds] = useState<AdsMethod | null>(null);
  const [form] = Form.useForm<AdChangeFormValue>();
  const [isOpen, setIsopen] = useState(false);
  const { data, error, isLoading } = useGetAllAdsMethodQuery();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [submitAdMethod] = useSubmitAdMethodMutation();
  const [submitUpdateAdMethod] = useSubmitUpdateAdMethodMutation();
  const [deleteAdMethod] = useDeleteAdMethodMutation();
  const handleAddAd = () => {
    setSelectedAds(null);
    setIsopen(true);
  };
  const handleDeleteAd = () => {
    setIsDelete(true);
  };
  const openModal = () => {
    setIsopen(true);
  };
  const handleOk = () => {
    setIsopen(false);
  };

  const handleCancelModal = () => {
    setIsopen(false);
  };
  useEffect(() => {
    form.setFieldsValue({
      hinh_thuc_qc: selectedAds?.hinh_thuc_qc,
    });
    if (form.getFieldValue("hinh_thuc_qc")) {
      setIsUpdate(true);
    }
    if (isDelete) {
      const realData: AdsGeoJson.AdMethodDeleteProperty = {
        id_htqc: selectedAds!.id_htqc,
      };
      console.log("id_htqc", selectedAds);
      const deleteData = AdsGeoJson.AdmethodDeleteSchema.safeParse(realData);

      if (deleteData.success == false) return console.log(deleteData.error);
      deleteAdMethod(deleteData.data).then((v) => console.log(v));
      window.location.reload();
    }
  }, [selectedAds, form, isDelete]);

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default",
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const onFinish = (values: AdMethodFormValue) => {
    const data = AdsGeoJson.AdMethodCreateSchema.safeParse(values);
    console.log(data);
    if (data.success == false) return console.log(data.error);
    submitAdMethod(data.data).then((v) => console.log(v));
    handleOk();
    window.location.reload();
  };
  const onFinish2 = (values: AdMethodUpdateValue) => {
    const realData: AdsMethod = {
      id_htqc: selectedAds!.id_htqc,
      hinh_thuc_qc: values.hinh_thuc_qc,
    };
    const data = AdsGeoJson.AdMethodSchema.safeParse(realData);

    if (data.success == false) return console.log(data.error);
    submitUpdateAdMethod(data.data).then((v) => console.log(v));
    handleOk();
    window.location.reload();
  };
  return (
    <>
      {error && <div>There was an error</div>}
      {isLoading && <div>Loading page</div>}
      <Button onClick={handleAddAd} type="primary" className="mb-3">
        Thêm hình thức quảng cáo
      </Button>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            setSelectedAds(record);
          },
        })}
      />
      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancelModal}
        footer={null}
        className=" -my-12 mx-auto w-8/12 rounded-lg "
      >
        <h1 className=" mb-10 mt-5 text-center text-2xl font-semibold">
          {selectedAds
            ? "THÔNG TIN HÌNH THỨC QUẢNG CÁO"
            : "THÊM HÌNH THỨC QUẢNG CÁO MỚI"}
        </h1>
        <Form
          form={form}
          onFinish={isUpdate ? onFinish2 : onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          labelAlign="left"
        >
          <Form.Item<AdChangeFormValue>
            label="Hình thức quảng cáo"
            name={"hinh_thuc_qc"}
            initialValue={selectedAds?.hinh_thuc_qc}
          >
            <Input />
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
}

export default AdsMethodPage;
