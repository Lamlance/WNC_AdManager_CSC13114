import { Button, Table, Tabs, Spin, Alert, notification } from "antd";
import React, { useEffect, useState } from "react";
import DistrictModal from "../components/ward-district/DistrictModal";
import WardModal from "../components/ward-district/WardModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useCreatePublicDistrict,
  useCreatePublicWard,
  useLazyGetAllPublicDistrict,
  useLazyGetAllPublicWard,
} from "../slices/api/apiSlice";

const { TabPane } = Tabs;

interface District {
  id_quan: number;
  ten_quan: string;
}

interface Ward {
  id_phuong: number;
  ten_phuong: string;
  id_quan: number;
}

function WardDistrictManagementPage() {
  const [activeTab, setActiveTab] = useState("district");
  const [districtModalVisible, setDistrictModalVisible] = useState(false);
  const [wardModalVisible, setWardModalVisible] = useState(false);

  const [getAllWard, { data: wardData }] = useLazyGetAllPublicWard();
  const [getAllDist, { data: distData }] = useLazyGetAllPublicDistrict();

  const [modalState, setModalSate] = useState<"none" | "add" | "edit">("none");

  const [createDist] = useCreatePublicDistrict();
  const [createWard] = useCreatePublicWard();

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const columnsDistrict = [
    {
      title: "ID",
      dataIndex: ["quan", "id_quan"],
      key: "id_quan",
    },
    {
      title: "District Name",
      dataIndex: ["quan", "ten_quan"],
      key: "ten_quan",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: { quan: District }) => (
        <Button
          type="primary"
          onClick={() => handleDeleteDistrict(record.quan)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const columnsWard = [
    {
      title: "ID",
      dataIndex: ["phuong", "id_phuong"],
      key: "id_phuong",
    },
    {
      title: "Ward Name",
      dataIndex: ["phuong", "ten_phuong"],
      key: "ten_phuong",
    },
    {
      title: "District ID",
      dataIndex: ["phuong", "id_quan"],
      key: "id_quan",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: { phuong: Ward }) => (
        <Button type="primary" onClick={() => handleDeleteWard(record.phuong)}>
          Delete
        </Button>
      ),
    },
  ];

  const showDistrictModal = () => {
    setDistrictModalVisible(true);
  };

  const showWardModal = () => {
    setWardModalVisible(true);
  };

  const handleDistrictModalOk = (values: Omit<District, "id_quan">) => {
    if (modalState === "add") {
      createDist({
        ten_quan: values.ten_quan,
      });
      toast.success("District created successfully");
      notification.success({
        message: "Ward Created",
        description: `${values.ten_quan} has been created successfully.`,
      });
    }
  };

  const handleWardModalOk = (values: Omit<Ward, "id_phuong">) => {
    if (modalState === "add") {
      createWard({
        ten_phuong: values.ten_phuong,
        id_quan: values.id_quan,
      });
      toast.success("Ward created successfully");
      notification.success({
        message: "Ward Created",
        description: `${values.ten_phuong} has been created successfully.`,
      });
    }
  };

  const handleDistrictModalCancel = () => {
    setDistrictModalVisible(false);
    setModalSate("none");
  };

  const handleWardModalCancel = () => {
    setWardModalVisible(false);
    setModalSate("none");
  };

  const handleDeleteWard = (record: Ward) => {
    notification.success({
      message: "Ward Deleted",
      description: `${record.ten_phuong} has been deleted successfully.`,
    });
  };

  const handleDeleteDistrict = (record: District) => {
    notification.success({
      message: "District Deleted",
      description: `${record.ten_quan} has been deleted successfully.`,
    });
  };

  const renderTable = () => {
    if (activeTab === "district") {
      return (
        <>
          <Table columns={columnsDistrict} dataSource={distData || []} />
        </>
      );
    } else if (activeTab === "ward") {
      return (
        <>
          <Table columns={columnsWard} dataSource={wardData || []} />
        </>
      );
    }
    return null;
  };

  const getAddButtonText = () => {
    return activeTab === "district" ? "Add District" : "Add Ward";
  };

  useEffect(() => {
    if (activeTab === "district") {
      getAllDist();
    } else if (activeTab === "ward") {
      getAllWard();
    }
  }, [activeTab]);

  return (
    <>
      <div className="flex items-center justify-center text-4xl font-bold">
        <h1>Quản lý danh sách các Phường và Quận</h1>
      </div>
      <div className="mb-3 flex justify-start">
        <Button
          onClick={() => {
            activeTab === "district" ? showDistrictModal() : showWardModal();
            setModalSate("add");
          }}
          type="primary"
        >
          {getAddButtonText()}
        </Button>
      </div>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={handleTabChange}
        className="mb-4"
      >
        <TabPane tab="District" key="district">
          {renderTable()}
        </TabPane>
        <TabPane tab="Ward" key="ward">
          {renderTable()}
        </TabPane>
      </Tabs>
      <ToastContainer />
      <DistrictModal
        visible={districtModalVisible}
        onCancel={handleDistrictModalCancel}
        onOk={handleDistrictModalOk}
      />
      <WardModal
        visible={wardModalVisible}
        onCancel={handleWardModalCancel}
        onOk={handleWardModalOk}
        districtData={distData || []}
      />
    </>
  );
}

export default WardDistrictManagementPage;
