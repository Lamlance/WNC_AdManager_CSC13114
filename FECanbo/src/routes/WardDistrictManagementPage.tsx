import { Button, Table, Tabs, Spin, Alert, notification } from "antd";
import React, { useEffect, useState } from "react";
import DistrictModal from "../components/ward-district/DistrictModal";
import WardModal from "../components/ward-district/WardModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { TabPane } = Tabs;

interface District {
  id: number;
  ten_quan: string;
}

interface Ward {
  id: number;
  ten_phuong: string;
  id_quan: number;
}

function WardDistrictManagementPage() {
  const [activeTab, setActiveTab] = useState("district");
  const [districtModalVisible, setDistrictModalVisible] = useState(false);
  const [wardModalVisible, setWardModalVisible] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [wardLoading, setWardLoading] = useState(false);

  const [districtError, setDistrictError] = useState<string | null>(null);
  const [wardError, setWardError] = useState<string | null>(null);

  const [districtData, setDistrictData] = useState<District[]>([]);
  const [wardData, setWardData] = useState<Ward[]>([]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const columnsDistrict = [
    {
      title: "ID",
      dataIndex: "id_quan",
      key: "id_quan",
    },
    {
      title: "District Name",
      dataIndex: "ten_quan",
      key: "ten_quan",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: District) => (
        <Button type="primary" onClick={() => handleDeleteDistrict(record)}>
          Delete
        </Button>
      ),
    },
  ];

  const columnsWard = [
    {
      title: "ID",
      dataIndex: "id_phuong",
      key: "id_phuong",
    },
    {
      title: "Ward Name",
      dataIndex: "ten_phuong",
      key: "ten_phuong",
    },
    {
      title: "District ID",
      dataIndex: "id_quan",
      key: "id_quan",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Ward) => (
        <Button type="primary" onClick={() => handleDeleteWard(record)}>
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

  const handleDistrictModalOk = (values: District) => {
    toast.success("District created successfully");
    notification.success({
      message: "Ward Created",
      description: `${values.ten_quan} has been created successfully.`,
    });
    // fetch("http://localhost:4030/api/public/quan", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     toast.success("District created successfully");

    //     setDistrictData([...districtData, data.quan]);
    //   })
    //   .catch((error) => {
    //     console.error("Error creating district:", error);
    //     setDistrictError("Error creating district");
    //   })
    //   .finally(() => setDistrictModalVisible(false));
  };

  const handleWardModalOk = (values: Ward) => {
    toast.success("Ward created successfully");
    notification.success({
      message: "Ward Created",
      description: `${values.ten_phuong} has been created successfully.`,
    });
    // fetch("http://localhost:4030/api/public/phuong", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     toast.success("Ward created successfully");

    //     setWardData([...wardData, data.phuong]);
    //   })
    //   .catch((error) => {
    //     console.error("Error creating ward:", error);
    //     setWardError("Error creating ward");
    //   })
    //   .finally(() => setWardModalVisible(false));
  };

  const handleDistrictModalCancel = () => {
    setDistrictModalVisible(false);
  };

  const handleWardModalCancel = () => {
    setWardModalVisible(false);
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
          {districtLoading && <Spin />}
          {districtError && <Alert message={districtError} type="error" />}
          {!districtLoading && !districtError && (
            <Table columns={columnsDistrict} dataSource={districtData} />
          )}
        </>
      );
    } else if (activeTab === "ward") {
      return (
        <>
          {wardLoading && <Spin />}
          {wardError && <Alert message={wardError} type="error" />}
          {!wardLoading && !wardError && (
            <Table columns={columnsWard} dataSource={wardData} />
          )}
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
      setDistrictLoading(true);
      setDistrictError(null);

      fetch("http://localhost:4030/api/public/quan")
        .then((response) => response.json())
        .then((data) => {
          const districtData = data.map(
            (item: { quan: District }) => item.quan,
          );
          setDistrictData(districtData);
        })
        .catch((error) => {
          console.error("Error fetching district data:", error);
          setDistrictError("Error fetching district data");
        })
        .finally(() => setDistrictLoading(false));
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "ward") {
      setWardLoading(true);
      setWardError(null);

      fetch("http://localhost:4030/api/public/phuong")
        .then((response) => response.json())
        .then((data) => {
          const wardData = data.map(
            (item: { phuong: Ward; quan: District }) => ({
              ...item.phuong,
              quan: item.quan,
            }),
          );
          setWardData(wardData);
        })
        .catch((error) => {
          console.error("Error fetching ward data:", error);
          setWardError("Error fetching ward data");
        })
        .finally(() => setWardLoading(false));
    }
  }, [activeTab]);

  return (
    <>
      <div className="flex items-center justify-center text-4xl font-bold">
        <h1>Quản lý danh sách các Phường và Quận</h1>
      </div>
      <div className="mb-3 flex justify-start">
        <Button
          onClick={activeTab === "district" ? showDistrictModal : showWardModal}
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
        districtData={districtData}
      />
    </>
  );
}

export default WardDistrictManagementPage;
