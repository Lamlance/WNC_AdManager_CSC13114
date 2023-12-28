import React, { useEffect, useState } from "react";
import { AdsGeoJson } from "@admanager/shared";
import { Button, Table, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetAllAdsMethodQuery } from "../slices/api/apiSlice";
type AdsMethod = AdsGeoJson.AdMethodProperty;
type SizeType = Parameters<typeof Form>[0]["size"];
export type AdChangeFormValue = Omit<AdsMethod, "id_ht_qc">;
function AdsMethodPage() {
  const columns: ColumnsType<AdsMethod> = [
    {
      title: "#",
      dataIndex: "id_ht_qc",
      key: "id_ht_qc",
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

  const handleAddAd = () => {
    setSelectedAds(null);
    setIsopen(true);
  };
  const handleDeleteAd = () => {};
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
    console.log("gggg", selectedAds);
    form.setFieldsValue({
      hinh_thuc_qc: selectedAds?.hinh_thuc_qc,
    });
  }, [selectedAds]);

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default",
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  return (
    <>
      {error && <div>There was an error</div>}
      {isLoading && <div>Loading page</div>}
      <Button onClick={handleAddAd} type="primary" className="mb-3">
        Thêm hình thức quảng cáo
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            setSelectedAds(record);
          },
        })}
      />
      ;
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
          onFinish={(v) => console.log(v)}
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
