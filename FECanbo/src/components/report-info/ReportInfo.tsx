import { Col, Row } from "antd";
import ReportInfoTable from "./ReportInfoTable";
import { ReportInfoRecord } from "../../types/view-model";
import { useState } from "react";
import ReportInfoDetail from "./ReportInfoDetail";
import { useGetAllReportInfoQuery } from "../../slices/api/apiSlice";
import { fromReportResponse2ReportRecord } from "../../types/mapper";

const ReportInfo = () => {
  const { data, error, isLoading } = useGetAllReportInfoQuery();

  return (
    <>
      {error && (
        <div>
          <p> There was an error </p>
        </div>
      )}
      {isLoading && (
        <div>
          <p> Loading page </p>
        </div>
      )}
      {data && (
        <Row
          gutter={20}
          style={{
            minHeight: "100vh",
          }}
        >
          <Col span={17}>
            <ReportInfoTable
              data={data.map(reportInfo => fromReportResponse2ReportRecord(reportInfo))}
            />
          </Col>
          <Col span={6}>
            {<ReportInfoDetail {...fromReportResponse2ReportRecord(data[0])} />}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ReportInfo;
