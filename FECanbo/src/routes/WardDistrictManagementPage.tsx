import { Button, Table, Tabs } from "antd";
import React, { useState } from "react";

const { TabPane } = Tabs;

const WardDistrictManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("district");

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

  const districtData = [
    { id: 1, ten_quan: "District 1" },
    { id: 2, ten_quan: "District 2" },
  ];

  const wardData = [
    { id: 1, ten_phuong: "Ward A", id_quan: 1 },
    { id: 2, ten_phuong: "Ward B", id_quan: 1 },
  ];

  const renderTable = () => {
    if (activeTab === "district") {
      return <Table columns={columnsDistrict} dataSource={districtData} />;
    } else if (activeTab === "ward") {
      return <Table columns={columnsWard} dataSource={wardData} />;
    }
    return null;
  };

  return (
    <>
      <div className="mb-3 flex justify-end">
        <Button onClick={() => {}} type="primary">
          Add
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
    </>
  );
};

export default WardDistrictManagementPage;
