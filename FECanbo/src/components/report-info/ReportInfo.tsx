import { Col, Row } from "antd";
import ReportInfoTable from "./ReportInfoTable";
import ReportInfoDetail from "./ReportInfoDetail";
import { useGetAllReportInfoQuery } from "../../slices/api/apiSlice";
import { fromReportResponse2ReportRecord } from "../../types/mapper";
import { useState } from "react";
import { ReportApi } from "@admanager/shared";

const ReportInfo = () => {
  const { data, error, isLoading } = useGetAllReportInfoQuery();
  const [selectedRow, setSelectedRow] =
    useState<ReportApi.ReportResponse | null>(null);

  return (
    <>
      {error && <div>There was an error</div>}
      {isLoading && <div>Loading page</div>}
      <Row
        gutter={20}
        style={{
          minHeight: "100vh",
        }}
      >
        <Col span={17}>
          <ReportInfoTable data={data || []} onRowSelect={setSelectedRow} />
        </Col>
        <Col span={7}>
          {selectedRow && <ReportInfoDetail {...selectedRow} />}
        </Col>
      </Row>
    </>
  );
};

export default ReportInfo;
