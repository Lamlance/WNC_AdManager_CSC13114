import { Button, Table, Tabs } from "antd";
import React, { useState } from "react";
import DistrictModal from "../components/ward-district/DistrictModal";
import WardModal from "../components/ward-district/WardModal";

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

  const [districtData, setDistrictData] = useState<District[]>([
    { id: 1, ten_quan: "District 1" },
    { id: 2, ten_quan: "District 2" },
  ]);
  const [wardData, setWardData] = useState<Ward[]>([
    { id: 1, ten_phuong: "Ward A", id_quan: 1 },
    { id: 2, ten_phuong: "Ward B", id_quan: 1 },
  ]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const columnsDistrict = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "District Name",
      dataIndex: "ten_quan",
      key: "ten_quan",
    },
  ];

  const columnsWard = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
  ];

  const showDistrictModal = () => {
    setDistrictModalVisible(true);
  };

  const showWardModal = () => {
    setWardModalVisible(true);
  };

  const handleDistrictModalOk = (values: District) => {
    setDistrictData([
      ...districtData,
      { ...values, id: districtData.length + 1 },
    ]);
    setDistrictModalVisible(false);
  };

  const handleWardModalOk = (values: Ward) => {
    setWardData([...wardData, { ...values, id: wardData.length + 1 }]);
    setWardModalVisible(false);
  };

  const handleDistrictModalCancel = () => {
    setDistrictModalVisible(false);
  };

  const handleWardModalCancel = () => {
    setWardModalVisible(false);
  };

  const renderTable = () => {
    if (activeTab === "district") {
      return <Table columns={columnsDistrict} dataSource={districtData} />;
    } else if (activeTab === "ward") {
      return <Table columns={columnsWard} dataSource={wardData} />;
    }
    return null;
  };

  const getAddButtonText = () => {
    return activeTab === "district" ? "Add District" : "Add Ward";
  };

  return (
    <>
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
