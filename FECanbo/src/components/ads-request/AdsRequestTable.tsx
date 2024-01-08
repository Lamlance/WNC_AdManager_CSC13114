// AdTable.tsx
import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { AdsReqApi } from "@admanager/shared";

const columns = [
  {
    title: "Nội dung pano",
    dataIndex: ["yeu_cau", "noi_dung_qc"],
    align: "center",
    key: "noi_dung_qc",
  },
  {
    title: "Công ty đặt",
    align: "center",
    dataIndex: ["yeu_cau", "ten_cty"],
    key: "ten_cty",
  },
  {
    title: "Thời gian đặt",
    align: "center",
    key: "effectedDate",
    render: (v: AdsReqApi.ManyAdsRequestResponse) =>
      `${(v.yeu_cau.ngay_hieu_luc as unknown as string).split("T")[0]} - ${
        (v.yeu_cau.ngay_het_han as unknown as string).split("T")[0]
      }`,
  },
];

interface AdsRequestTableProps {
  data: AdsReqApi.ManyAdsRequestResponse[];
  onRowClick: (record: AdsReqApi.ManyAdsRequestResponse) => void;
}

const AdsRequestTable: React.FC<AdsRequestTableProps> = ({
  data,
  onRowClick,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [sortedInfo, setSortedInfo] = useState<any>({});

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: React.Key[],
    confirm: () => void,
    dataIndex: string,
  ) => {
    confirm();
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  return (
    <Table
      columns={[
        {
          ...columns[0],
          ...getColumnSearchProps("noi_dung_qc"),
        },
        {
          ...columns[1],
          ...getColumnSearchProps("ten_cty"),
        },
        {
          ...columns[2],
          sorter: true,
          sortOrder:
            sortedInfo.columnKey === "effectedDate" && sortedInfo.order,
        },
      ]}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
      onChange={handleChange}
      pagination={{ pageSize: 5 }}
    />
  );
};
export default AdsRequestTable;
