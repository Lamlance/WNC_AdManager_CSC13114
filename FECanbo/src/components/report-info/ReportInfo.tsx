import { Col, Row } from "antd";
import ReportInfoTable from "./ReportInfoTable";
import { ReportInfoRecord } from "../../types";
import { useState } from "react";
import ReportInfoDetail from "./ReportInfoDetail";
import { useGetAllReportInfoQuery } from "../../slices/api/apiSlice";

const data: ReportInfoRecord[] = [];

const ReportInfo = () => {
  const { data, error, isLoading } = useGetAllReportInfoQuery();
  const [selectedReportInfo, setSelectedReportInfo] =
    useState<ReportInfoRecord | null>(null);

  return (
    <Row
      gutter={20}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col span={17}>
        <ReportInfoTable
          data={data}
          onRowClick={(record) => {
            setSelectedReportInfo(record);
          }}
        />
      </Col>
      <Col span={6}>
        {selectedReportInfo && <ReportInfoDetail {...selectedReportInfo} />}
      </Col>
    </Row>
  );
};

export default ReportInfo;
